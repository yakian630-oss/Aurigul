"""Tiny static file server with caching disabled (for local dev).
Multi-threaded so parallel browser requests never block each other.
Run:  py serve.py           # serves this folder on http://localhost:5500
"""
import http.server

PORT = 5500


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def end_headers(self):
        # Never let the browser cache anything — always serve the latest files.
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, *args):
        pass  # quiet


httpd = http.server.ThreadingHTTPServer(("", PORT), NoCacheHandler)
print(f"AURIGUL dev server (no-cache, threaded) running at http://localhost:{PORT}")
httpd.serve_forever()
