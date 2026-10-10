#!/usr/bin/env python3
"""
Rebuild index.html from the numbered blocks in src/.

    python3 build.py            rebuild index.html
    python3 build.py --check    rebuild in memory and report any drift

Every block in src/ is a plain slice of the page. Joining them in the
order given by src/manifest.json reproduces index.html exactly — so the
split files, not index.html, are the place to make edits.
"""
import json, os, sys, difflib

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")


def read(*parts):
    with open(os.path.join(SRC, *parts), encoding="utf-8") as fh:
        return fh.read()


def assemble():
    manifest = json.loads(read("manifest.json"))
    css = "".join(read("styles", f) for f in manifest["styles"])
    html = "".join(read("sections", f) for f in manifest["sections"])
    js = "".join(read("scripts", f) for f in manifest["scripts"])
    return read("_head.html") + css + read("_between.html") + html \
        + "<script>" + js + read("_tail.html")


def main():
    built = assemble()
    target = os.path.join(ROOT, "index.html")
    current = open(target, encoding="utf-8").read() if os.path.exists(target) else ""

    if "--check" in sys.argv:
        if built == current:
            print("index.html matches src/ exactly.")
            return 0
        diff = list(difflib.unified_diff(
            current.splitlines(), built.splitlines(),
            "index.html", "src/", lineterm="", n=1))
        print("DRIFT — %d differing lines:" % (len(diff) - 4))
        print("\n".join(diff[:40]))
        return 1

    with open(target, "w", encoding="utf-8") as fh:
        fh.write(built)
    print("index.html rebuilt from src/  (%d KB)" % (len(built) // 1024))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
