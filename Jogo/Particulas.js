class Particles{
    constructor(ctx,efeito){
        this.ctx = ctx
        this.TelaH = ctx.canvas.height
        this.TelaW = ctx.canvas.width
        this.efeito = efeito;
        this.posX = efeito.posX || Math.floor(Math.random()* this.TelaW)
        this.posY = efeito.posY||1
        this.altura = Math.random()*5
        this.largura = this.altura
        this.vel = efeito.vel || Math.random()*10
        this.color = efeito.color
    }
    update(){
        
        
        if(this.largura < 5 && this.altura < 5){
            this.posY += Math.random() * 3
        }
        else{
            this.posY += this.vel
        }
        if (this.posY > this.TelaH) {
            this.posY = -this.altura; // Volta um pouco acima do topo
            this.posX = Math.floor(Math.random() * this.TelaW); // Nova coluna de queda
        }
    }
    draw(){
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.posX,this.posY,this.largura,this.altura)
    }
}