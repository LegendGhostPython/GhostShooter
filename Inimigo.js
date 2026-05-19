class Enemy{
    constructor(ctx,p){
        this.ctx = ctx
        this.largura = p.largura
        this.altura = p.altura
        this.cor = p.cor 
        this.vel = 1
        this.posX = p.posX||0
        this.posY = p.posY||0
        this.dX = 0
    }
    update(){
        this.posX += this.dX* this.vel
        if(this.posX >= 0 && this.posX < this.ctx.canvas.width - this.largura){
            this.dX++
        }
       if(this.posX <= this.ctx.canvas.width - this.largura && this.posX >0){
            this.dX--
            
        }
    }
    draw(){
        this.ctx.fillStyle=this.cor
        this.ctx.fillRect(this.posX,this.posY,this.largura,this.altura)
    }
}