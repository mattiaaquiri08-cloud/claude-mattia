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

import openpyxl

QUI = pathlib.Path(__file__).resolve().parent
REPO = QUI.parent
PRINCIPALE = "claude/intelligent-albattani-bti0iy"
GIORNI = 14


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
    return {
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
    return {
        "giorni": [{"giorno": g, "n": per_giorno.get(g, 0)} for g in giorni],
        "attivita": attivita[:14],
    }


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
        **lavoro(manuali["nomi_rami"]),
    }
    modello = (QUI / "modello.html").read_text()
    blob = json.dumps(dati, ensure_ascii=False).replace("</", "<\\/")
    (QUI / "casa.html").write_text(modello.replace("/*DATI*/null", blob))
    print(f"casa.html generata: {len(dati['attivita'])} attività, {dati['lead']['totale']} lead, {len(progetti)} siti")


if __name__ == "__main__":
    main()
