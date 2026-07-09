class Enemy {
    constructor(ctx, p) {
        this.ctx = ctx
        this.largura = p.largura
        this.altura = p.altura
        this.cor = p.cor
        this.vel = 1
        this.posX = p.posX || 0
        this.posY = p.posY || 0
        this.dX = 1
        this.img = new Image()
        this.img.src = "nave1.png"
        this.ImgAltura = 378/5
        this.ImgLargura = 245/6
        this.frameX = 0
        this.frameY = 0
        this.maxFrameX = 6
        this.maxFrameY = 5
        this.speedFrame = 0
        //console.log(this.img.src,this.ImgAltura,this.ImgLargura)
    }
    update() {
        this.speedFrame++
     /*  if(this.speedFrame % 50== 0){
            
            this.frameX ++
            console.log(this.frameX)
            if( this.frameX >= this.maxFrameX){
                this.frameX = 0
                this.frameY++
                console.log(this.frameY)
                if(this.frameY > this.maxFrameY){
                    this.frameX = 0 
                    this.frameY = 0
                }
            }
        }
        */
          
        this.posX += this.dX* this.vel
          //console.log(this.frame + this.ImgLargura)
        if (this.posX >= 0 && this.posX < this.ctx.canvas.width - this.largura) {
            this.dX++
        }
        if (this.posX <= this.ctx.canvas.width - this.largura && this.posX > 0) {
            this.dX--

        }
        
    }
    
    draw() {
    if(this.img.complete){
        
    this.ctx.drawImage(this.img,
    this.frameX * this.ImgLargura,
    this.frameY * this.ImgAltura,
    this.ImgLargura,
    this.ImgAltura,
    this.posX,
    this.posY,
    50,
    100)
    }
        
      /*  else{
        this.ctx.fillStyle = this.cor
        this.ctx.fillRect(this.posX, this.posY, this.largura, this.altura)}*/
    }
}