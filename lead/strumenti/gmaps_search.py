import sys,re,json,subprocess,urllib.parse,html,random,concurrent.futures as cf,time
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'
def get(u):
    return subprocess.run(["curl","-s","-A",UA,"-H","Accept-Language: it-IT,it;q=0.9","--max-time","25",u],capture_output=True).stdout.decode("utf-8","ignore")
def search(q):
    p=get("https://www.google.com/maps/search/?api=1&hl=it&query="+urllib.parse.quote_plus(q))
    m=re.search(r'/search\?tbm=map[^"]*',p)
    if not m: return []
    d=get("https://www.google.com"+html.unescape(m.group(0)))
    ids=[x.start() for x in re.finditer(r'"0x[0-9a-f]+:0x[0-9a-f]+","',d)]
    out=[]
    for i,s in enumerate(ids):
        lo=max(0,s-400); hi=(ids[i+1]-400) if i+1<len(ids) else s+18000
        seg=d[lo:hi]
        mm=re.match(r'"(0x[0-9a-f]+:0x[0-9a-f]+)","([^"]+)",null,\[([^\]]*)\]',d[s:s+600])
        if not mm: continue
        pid,name,cats=mm.group(1),mm.group(2),re.findall(r'"([^"]+)"',mm.group(3))[:3]
        rv=re.search(r'"(\d+) recension[ei]",null,"[^"]*"\],null,null,null,([\d.]+),',seg)
        rv2=re.search(r'"(\d+) recension[ei]"',seg)
        tel=sorted(set(re.findall(r'"(\+39 [0-9 ]{8,13})"',seg)))
        urls=re.findall(r'"(https?://[^"\\]{5,200})"',seg)
        siti=sorted({u for u in urls if not re.search(r'google|gstatic|ggpht|googleusercontent|schema\.org|facebook\.com|instagram\.com|tiktok\.com|w3\.org|youtube',u)})
        soc=sorted({u for u in urls if re.search(r'facebook\.com|instagram\.com|tiktok\.com',u)})
        st=re.search(r'"((?:Aperto|Chiuso|Apre|Chiude)[^"]{0,50})"',seg[400:])
        addr=re.search(r'"([^"]{3,60}, \d{5} [^"]{2,30})"',seg)
        out.append({"q":q,"pid":pid,"nome":name,"categorie":cats,"recensioni":int(rv.group(1)) if rv else (int(rv2.group(1)) if rv2 else 0),
                    "voto":rv.group(2) if rv else None,"tel":tel,"siti":siti[:5],"social":soc[:4],"stato":st.group(1) if st else None,
                    "chiuso":"Riapri l'attivit" in seg,"indirizzo":addr.group(1) if addr else None})
    return out
if __name__=="__main__":
    qs=[l.strip() for l in open(sys.argv[1]) if l.strip()]
    seen=set()
    with cf.ThreadPoolExecutor(5) as ex, open(sys.argv[2],"a") as f:
        for res in ex.map(lambda q:(time.sleep(0.3),search(q))[1],qs):
            for r in res:
                if r["pid"] in seen: continue
                seen.add(r["pid"]); f.write(json.dumps(r,ensure_ascii=False)+"\n")
