class TiroInimigo {
    constructor(ctx, tiro, p) {
        this.ctx = ctx;
        this.largura = tiro.largura
        this.altura = tiro.altura
        this.cor = tiro.cor
        this.vel = tiro.vel||7
        this.posX = p.posX+(p.largura/2) - (this.largura/2)
        this.posY = p.posY
        this.dY = tiro.dY
        this.draw()
    }
    update() {
    
    this.posY += (Math.random()*5.0)+this.vel * this.dY;
            
            
    }
    draw() {
    
        this.ctx.fillStyle = this.cor;
        this.ctx.fillRect(this.posX, this.posY, this.largura, this.altura)
    }
}