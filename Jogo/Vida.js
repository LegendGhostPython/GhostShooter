class Life{
    constructor(ctx,dadosP,ajusteL,ajusteA,corVida,corBarra){
    this.dadosP = dadosP
    this.ctx = ctx
    this.posX = dadosP.posX
    this.posY = dadosP.posY
    this.vida = dadosP.vida
    this.corV = corVida
    this.corB = corBarra
    this.ajusteLargura = ajusteL
    this.ajusteAltura = ajusteA
    this.dX = -1;
}
    update(){
        if(this.dadosP){
            this.vida = this.dadosP.vida
            
        }
    }
    draw(){
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = this.corB
        this.ctx.moveTo(30+this.posX+this.ajusteLargura,30+this.posY+this.ajusteAltura)
        this.ctx.lineTo(40+this.posX+this.ajusteLargura,20 + this.posY+this.ajusteAltura)
        this.ctx.lineTo(140+this.posX+this.ajusteLargura,20+this.posY+this.ajusteAltura)
        this.ctx.lineTo(130+this.posX+this.ajusteLargura,30+this.posY+this.ajusteAltura)
        this.ctx.lineTo(30+this.posX+this.ajusteLargura,30+this.posY+this.ajusteAltura)
        this.ctx.closePath()
        this.ctx.stroke()
        
        this.ctx.beginPath()
        this.ctx.lineWidth = 2
        this.ctx.fillStyle = this.corV
        this.ctx.moveTo(30+this.posX+this.ajusteLargura,30+this.posY+this.ajusteAltura)
        this.ctx.lineTo(40+this.posX+this.ajusteLargura,20 + this.posY+this.ajusteAltura)
        this.ctx.lineTo(this.vida+this.posX+this.ajusteLargura,20+this.posY+this.ajusteAltura)
        this.ctx.lineTo(10+this.vida+this.posX+this.ajusteLargura,30+this.posY+this.ajusteAltura)
        this.ctx.closePath()
        this.ctx.fill()
        
        this.ctx.restore()
        
}
}