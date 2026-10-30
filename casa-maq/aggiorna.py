"""Aggiorna i dati della Casa MAQ e genera casa-maq/casa.html.

Legge: i lead da lead/attivita-senza-sito-roma.xlsx, il lavoro fatto dai commit
di tutti i rami (git fetch prima), lo stato dei siti e i promemoria da
casa-maq/dati-manuali.json. Scrive casa-maq/casa.html partendo da modello.html.

Uso: python3 casa-maq/aggiorna.py
"""
import collections
import datetime as dt
import json
import pathlib
import re
import subprocess

import base64

import openpyxl

QUI = pathlib.Path(__file__).resolve().parent
REPO = QUI.parent
PRINCIPALE = "claude/intelligent-albattani-bti0iy"
GIORNI = 30


def git(*args):
    return subprocess.run(["git", *args], cwd=REPO, capture_output=True, text=True).stdout


def lead():
    wb = openpyxl.load_workbook(REPO / "lead/attivita-senza-sito-roma.xlsx", read_only=True, data_only=True)
    righe = [r for r in wb["Lead strutturati"].iter_rows(min_row=2, values_only=True) if r[0]]
    gruppi = collections.Counter()
    for r in righe:
        s = (r[10] or "").strip()
        if s.startswith("Da chiamare"):
            gruppi["da_chiamare"] += 1
        elif s.startswith("Da contattare"):
            gruppi["da_contattare"] += 1
        elif s.startswith("Interessato") or s.startswith("Sì"):
            gruppi["positivi"] += 1
        elif s.startswith("Ha già"):
            gruppi["hanno_sito"] += 1
        else:
            gruppi["contattati"] += 1
    settori = collections.Counter((r[1] or "Altro").strip() for r in righe)
    elenco = []
    for r in righe:
        s = (r[10] or "").strip()
        gruppo = ("da_chiamare" if s.startswith("Da chiamare") else "da_contattare" if s.startswith("Da contattare")
                  else "positivi" if s.startswith(("Interessato", "Sì")) else "hanno_sito" if s.startswith("Ha già") else "contattati")
        nota = (r[11] or "").strip()
        elenco.append({"nome": r[0], "settore": (r[1] or "Altro").strip(), "indirizzo": r[3] or "",
                       "recensioni": r[4], "voto": r[5], "stato": s, "gruppo": gruppo,
                       "nota": nota[:180] + ("…" if len(nota) > 180 else "")})
    return {
        "elenco": elenco,
        "totale": len(righe),
        "gruppi": dict(gruppi),
        "settori": [{"nome": n, "n": c} for n, c in settori.most_common(6)],
    }


def lavoro(nomi_rami):
    """Commit degli ultimi GIORNI giorni, ognuno attribuito al ramo del progetto."""
    da = (dt.date.today() - dt.timedelta(days=GIORNI - 1)).isoformat()
    visti, voci = set(), []
    for ramo, nome in nomi_rami.items():
        args = ["log", f"origin/{ramo}", f"--since={da}", "--format=%h%x09%aI%x09%s"]
        if ramo != PRINCIPALE:
            args.append(f"^origin/{PRINCIPALE}")
        for riga in git(*args).splitlines():
            h, quando, testo = riga.split("\t", 2)
            if h in visti:
                continue
            visti.add(h)
            voci.append({"h": h, "quando": quando, "progetto": nome, "testo": testo})
    voci.sort(key=lambda v: v["quando"], reverse=True)
    per_giorno = collections.Counter(v["quando"][:10] for v in voci if not v["testo"].startswith("Memoria"))
    oggi = dt.date.today()
    giorni = [(oggi - dt.timedelta(days=i)).isoformat() for i in range(GIORNI - 1, -1, -1)]
    attivita, per_progetto = [], collections.Counter()
    for v in voci:
        if v["testo"].startswith("Memoria") or per_progetto[v["progetto"]] >= 5:
            continue
        per_progetto[v["progetto"]] += 1
        testo = re.sub(r"^[^:]{1,24}:\s*", "", v["testo"])
        attivita.append({**v, "testo": testo[:1].upper() + testo[1:]})
    commit = []
    for v in voci:
        if v["testo"].startswith("Memoria"):
            continue
        testo = re.sub(r"^[^:]{1,24}:\s*", "", v["testo"])
        commit.append({"quando": v["quando"], "progetto": v["progetto"], "testo": testo[:1].upper() + testo[1:]})
    return {
        "giorni": [{"giorno": g, "n": per_giorno.get(g, 0)} for g in giorni],
        "attivita": attivita[:14],
        "commit": commit,
    }


def chiamate():
    """Lead nascosti da chiamare, mescolati per settore: i primi `al_giorno` sono quelli di oggi."""
    c = json.loads((QUI / "chiamate.json").read_text())
    # Ogni lead ha un numero fisso: l'utente lo usa al posto del nome ("il 7 non risponde").
    prossimo = max([l.get("n", 0) for l in c["lead"]] + [0]) + 1
    for l in c["lead"]:
        if not l.get("n"):
            l["n"] = prossimo
            prossimo += 1
    (QUI / "chiamate.json").write_text(json.dumps(c, ensure_ascii=False, indent=1) + "\n")
    gruppi = collections.defaultdict(list)
    for l in c["lead"]:
        gruppi[l["settore"]].append(l)
    mescolati = []
    while any(gruppi.values()):
        for k in list(gruppi):
            if gruppi[k]:
                mescolati.append(gruppi[k].pop(0))
    da_chiamare = [l for l in mescolati if l["stato"] == "Da chiamare"]
    return {"al_giorno": c["al_giorno"], "oggi": da_chiamare[: c["al_giorno"]],
            "in_coda": len(da_chiamare), "fatte": len(c["lead"]) - len(da_chiamare)}


def ultimo_aggiornamento(ramo):
    return git("log", "-1", "--format=%aI", f"origin/{ramo}").strip()


def main():
    git("fetch", "-q", "origin")
    manuali = json.loads((QUI / "dati-manuali.json").read_text())
    progetti = [{**p, "aggiornato": ultimo_aggiornamento(p["ramo"])} for p in manuali["progetti"]]
    progetti.sort(key=lambda p: p["aggiornato"], reverse=True)
    dati = {
        "generato": dt.datetime.now().astimezone().isoformat(timespec="minutes"),
        "progetti": progetti,
        "promemoria": manuali["promemoria"],
        "lead": lead(),
        "chiamate": chiamate(),
        "script": (REPO / "lead/script-chiamata.md").read_text().split("\n", 2)[-1].strip(),
        **lavoro(manuali["nomi_rami"]),
    }
    modello = (QUI / "modello.html").read_text()
    blob = json.dumps(dati, ensure_ascii=False).replace("</", "<\\/")
    foto = base64.b64encode((QUI / "sfondo.jpg").read_bytes()).decode()
    pagina = modello.replace("/*DATI*/null", blob).replace("__FOTO__", "data:image/jpeg;base64," + foto)
    (QUI / "casa.html").write_text(pagina)
    print(f"casa.html generata: {len(dati['attivita'])} attività, {dati['lead']['totale']} lead, {len(progetti)} siti")


if __name__ == "__main__":
    main()
