class Particles {
    constructor(ctx, config) {
        this.ctx = ctx;
        this.posX = config.posX;
        this.posY = config.posY;
        this.largura = config.largura;
        this.altura = config.altura;
        this.color = config.color || "orange";
        this.vel = config.vel || 2;
        this.dX = config.dX || 0;
        this.dY = config.dY || 1;
    }

    update() {
        // Movimento para baixo + variação para os lados
        this.posY += this.vel * this.dY;
        this.posX += this.dX;

        // Efeito de desvanecimento: o fogo vai encolhendo até sumir
        if (this.color === "orange" || this.color === "red") {
            this.largura -= 0.3;
            this.altura -= 0.3;

            // Se encolher demais, zera para o filter remover do array
            if (this.largura < 0) this.largura = 0;
            if (this.altura < 0) this.altura = 0;
        }
    }

    draw() {
        if (this.largura > 0 && this.altura > 0) {
            this.ctx.save();
            this.ctx.fillStyle = this.color;
            // Desenha em formato circular/suave para parecer chama
            this.ctx.beginPath();
            this.ctx.arc(
                this.posX + this.largura / 2,
                this.posY + this.altura / 2,
                this.largura / 2,
                0,
                Math.PI * 2
            );
            this.ctx.fill();
            this.ctx.restore();
        }
    }
}
