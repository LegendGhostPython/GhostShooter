class Particles{
    constructor(ctx,efeito){
        this.ctx = ctx
        this.TelaH = ctx.canvas.height
        this.TelaW = ctx.canvas.width
        this.efeito = efeito;
        this.posX = efeito.posX || Math.floor(Math.random()* this.TelaW)
        this.posY = efeito.posY
        this.dY = efeito.dY
        this.dX = efeito.dX
        this.altura = efeito.altura
        this.largura = efeito.largura
        this.vel = efeito.vel
        this.color = efeito.color
    }
    update(){
        
        this.posY += this.dY * this.vel + this.altura
        
        this.posX = Math.random()*this.TelaW
        
    }
    draw(){
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.posX,this.posY,this.largura,this.altura)
    }
}