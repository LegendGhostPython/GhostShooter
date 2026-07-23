import json
import sqlite3
from http.server import BaseHTTPRequestHandler, HTTPServer


class RequisicaoHandler(BaseHTTPRequestHandler):

    def _definir_cabecalhos(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        # Libera o acesso do JavaScript (CORS)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header(
            "Access-Control-Allow-Methods", "GET, POST, OPTIONS"
        )

    def do_OPTIONS(self):
        self._definir_cabecalhos()
        self.end_headers()

    # Trata as requisições GET (Buscar dados)
    def do_GET(self):
        if self.path == "/ranking":
            conexao = sqlite3.connect("scores.db")
            cursor = conexao.cursor()
            cursor.execute(
                "SELECT nome, score FROM pontos ORDER BY score DESC LIMIT 10"
            )
            dados = cursor.fetchall()
            conexao.close()

            resposta = [{"nome": r[0], "score": r[1]} for r in dados]

            self._definir_cabecalhos()
            self.end_headers()
            self.wfile.write(json.dumps(resposta).encode("utf-8"))

    # Trata as requisições POST (Enviar dados)
    def do_POST(self):
        if self.path == "/pontos":
            length = int(self.headers["Content-Length"])
            corpo = self.rfile.read(length)
            dados = json.loads(corpo.decode("utf-8"))

            conexao = sqlite3.connect("scores.db")
            cursor = conexao.cursor()
            cursor.execute(
                "INSERT INTO pontos (nome, score) VALUES (?, ?)",
                (dados["nome"], dados["score"]),
            )
            conexao.commit()
            conexao.close()

            self._definir_cabecalhos()
            self.end_headers()
            self.wfile.write(
                json.dumps({"status": "sucesso"}).encode("utf-8")
            )


print("Servidor rodando na porta 8000...")
servidor = HTTPServer(("127.0.0.1", 8000), RequisicaoHandler)
servidor.serve_forever()
