import sys,re,json,subprocess,urllib.parse,html
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'
def get(u):
    return subprocess.run(["curl","-s","-A",UA,"-H","Accept-Language: it-IT,it;q=0.9","--max-time","20",u],capture_output=True).stdout.decode("utf-8","ignore")
def check(q):
    p=get("https://www.google.com/maps/search/?api=1&hl=it&query="+urllib.parse.quote_plus(q))
    m=re.search(r'/search\?tbm=map[^"]*',p)
    if not m: return {"q":q,"err":"no data"}
    d=get("https://www.google.com"+html.unescape(m.group(0)))
    # se ci sono più risultati, considera solo il primo blocco
    rev=re.search(r'"(\d+) recension[ei]"',d); rating=re.search(r'"(\d+) recension[ei]",null,"[^"]*"\],null,null,null,([\d.]+),',d)
    name=re.search(r'\[null,null,[-\d.]+,[-\d.]+\],"0x[0-9a-f]+:0x[0-9a-f]+","([^"]+)"',d)
    webs=[u for u in re.findall(r'"(https?://[^"\\]+)"',d) if not re.search(r'google|gstatic|ggpht|googleusercontent|schema\.org|facebook\.com|instagram\.com',u)]
    soc=sorted(set(re.findall(r'https?://(?:www\.)?(?:facebook|instagram)\.com/[^"\\]+',d)))[:2]
    st=re.search(r'"((?:Aperto|Chiuso|Apre|Chiude)[^"]{0,50})"',d)
    phones=sorted(set(re.findall(r'"(\+39 [0-9 ]{8,13})"',d)))
    addr=re.search(r'\["([^"]+)","(\d{5}[^"]*)"',d)
    cat=re.search(r'"0x[0-9a-f]+:0x[0-9a-f]+","[^"]+",null,\[("[^\]]*")\]',d)
    cats=re.findall(r'"([^"]+)"',cat.group(1))[:3] if cat else []
    return {"q":q,"categorie":cats,"tel_google":phones,"indirizzo_google":(addr.group(1)+", "+addr.group(2)) if addr else None,"nome_google":name.group(1) if name else None,"recensioni":int(rev.group(1)) if rev else 0,
            "voto":rating.group(2) if rating else None,"chiuso":"Riapri l'attivit" in d,
            "stato_orari":st.group(1) if st else None,"siti":sorted(set(webs))[:3],"social":soc}
if __name__=="__main__":
    import concurrent.futures as cf,time
    qs=[l.rstrip("\n").split("\t") for l in open(sys.argv[1]) if l.strip()]
    def job(x):
        time.sleep(0.5); r=check(x[-1]); r["settore"]=x[0] if len(x)>1 else None; return r
    with cf.ThreadPoolExecutor(5) as ex, open(sys.argv[2],"a") as out:
        for r in ex.map(job,qs): out.write(json.dumps(r,ensure_ascii=False)+"\n"); out.flush()
