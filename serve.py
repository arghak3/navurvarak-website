#!/usr/bin/env python3
"""
A local server for checking the site the way GitHub Pages
serves it: /blog resolves to blog/index.html and /blog/slug to
blog/slug.html, so the extensionless links in the built pages
work here exactly as they will in production.

    python3 serve.py            then open http://localhost:8124

Nothing in the deployed site depends on this file. It exists so
that a link can be clicked before it is pushed.
"""
import http.server, os, socketserver

ROOT = os.path.dirname(os.path.abspath(__file__))

# 8124 by default, but PORT wins if something hands us one — which is
# what the preview runner does when 8124 is already taken.
PORT = int(os.environ.get("PORT") or 8124)


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def translate_path(self, path):
        full = super().translate_path(path)
        if os.path.isdir(full):
            index = os.path.join(full, "index.html")
            if os.path.exists(index):
                return index
        if not os.path.exists(full) and not full.endswith(".html"):
            if os.path.exists(full + ".html"):
                return full + ".html"
        return full

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    socketserver.ThreadingTCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer(("", PORT), Handler) as srv:
        print("NavUrvarak on http://localhost:%d" % PORT)
        srv.serve_forever()
