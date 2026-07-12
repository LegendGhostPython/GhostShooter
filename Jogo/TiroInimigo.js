class TiroInimigo {
    constructor(ctx, tiro, p) {
        this.ctx = ctx;
        this.largura = tiro.largura
        this.altura = tiro.altura
        this.cor = tiro.cor
        this.vel = tiro.vel
        this.posX = p.posX + (this.largura*3)
        this.posY = p.posY + (this.altura*8)
        this.dY = tiro.dY
        this.draw()
    }
    update() {
    
    this.posY += 10 + Math.random() * (this.vel-3)
   // this.posX += this.vel
    }
    draw() {
    
        this.ctx.fillStyle = this.cor;
        this.ctx.fillRect(this.posX, this.posY, this.largura, this.altura)
    }
}