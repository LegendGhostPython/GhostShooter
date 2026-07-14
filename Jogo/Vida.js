class Life{
    constructor(ctx,dadosP){
    this.ctx = ctx
}
    update(){

    }
    draw(){
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "Blue"
        this.ctx.strokeRect(5,10,100,10)
        this.ctx.closePath()
        this.ctx.stroke()
        
        this.ctx.beginPath()
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = "rgba(0,0,0)"
        this.ctx.moveTo(93,20)
        this.ctx.lineTo(105,10)
        this.ctx.lineTo(105,20)
        this.ctx.closePath()
        this.ctx.stroke()
        
        this.ctx.beginPath()
        this.ctx.fillStyle="white"
        this.ctx.fillRect(5,10,30,10)
    
    
        this.ctx.beginPath()
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = "blue"
        this.ctx.moveTo(90,20)
        this.ctx.lineTo(105,10)
        this.ctx.stroke()
        
        this.ctx.restore()
        
}
}