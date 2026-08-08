class Enemy {
    constructor(ctx, p) {
        this.ctx = ctx
        this.largura = p.largura || 100
        this.altura = p.altura || 100
        this.cor = p.cor
        this.vel = p.vel
        this.posX = p.posX || 0 
        this.posY = p.posY || 0 
        this.dX = 1
        this.dY = 1
        this.img = new Image()
        this.img.src = "naveI1.png"
        this.ImgAltura = this.altura
        this.ImgLargura = this.largura
      //  this.frameX = 0
      //this.frameY = 0
        //this.maxFrameX = 6
        //this.maxFrameY = 5
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
        if (this.posX + this.largura >= this.ctx.canvas.width) {
            this.dX = -1
        }
        else if (this.posX <= 0) {
            this.dX = 1

        }
        this.posY += this.dY * this.vel
    }
    
    draw() {
    if(this.img.complete){
        
    this.ctx.drawImage(this.img,
   // this.frameX * this.ImgLargura,
   //this.frameY * this.ImgAltura,
   // this.ImgLargura,
    //this.ImgAltura,
    this.posX,
    this.posY,
    this.ImgLargura,
    this.ImgAltura)
    } else{
        this.ctx.fillStyle = this.cor
        this.ctx.fillRect(this.posX, this.posY, this.largura, this.altura)}
    }
}