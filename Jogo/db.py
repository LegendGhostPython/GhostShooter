import json
import sqlite3
from http.server import BaseHTTPRequestHandler, HTTPServer


# Função para garantir que a tabela existe no SQLite
def inicializar_banco():
    conexao = sqlite3.connect("scores.db")
    cursor = conexao.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS pontos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            score INTEGER NOT NULL
        )
    """
    )
    conexao.commit()
    conexao.close()


class RequisicaoHandler(BaseHTTPRequestHandler):

    def _definir_cabecalhos(self, status=200):
        self.send_response(status)
        self.send_header("Content-type", "application/json")
        # Permite requisições de origens diferentes (CORS)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

    def do_OPTIONS(self):
        self._definir_cabecalhos()
        self.end_headers()

    # Trata as requisições GET (Buscar ranking)
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

            self._definir_cabecalhos(200)
            self.end_headers()
            self.wfile.write(json.dumps(resposta).encode("utf-8"))
        else:
            # Rota não encontrada
            self._definir_cabecalhos(404)
            self.end_headers()
            self.wfile.write(
                json.dumps({"erro": "Rota nao encontrada"}).encode("utf-8")
            )

    # Trata as requisições POST (Salvar nova pontuação)
    def do_POST(self):
        if self.path == "/pontos":
            length = int(self.headers["Content-Length"])
            corpo = self.rfile.read(length)
            dados = json.loads(corpo.decode("utf-8"))

            conexao = sqlite3.connect("scores.db")
            cursor = conexao.cursor()
            cursor.execute(
                "INSERT INTO pontos (nome, score) VALUES (?, ?)",
                (dados["nome"], int(dados["score"])),
            )
            conexao.commit()
            conexao.close()

            self._definir_cabecalhos(201)  # 201 Created
            self.end_headers()
            self.wfile.write(json.dumps({"status": "sucesso"}).encode("utf-8"))
        else:
            # Rota não encontrada
            self._definir_cabecalhos(404)
            self.end_headers()
            self.wfile.write(
                json.dumps({"erro": "Rota nao encontrada"}).encode("utf-8")
            )


if __name__ == "__main__":
    # Garante a estrutura da tabela antes de subir o servidor
    inicializar_banco()

    IP = "127.0.0.1"  # Use "0.0.0.0" se quiser acessar o servidor de outros aparelhos na mesma rede Wi-Fi
    PORTA = 8000

    print(f"Servidor rodando em http://{IP}:{PORTA} ...")
    servidor = HTTPServer((IP, PORTA), RequisicaoHandler)

    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor finalizado com sucesso.")
        servidor.server_close()
