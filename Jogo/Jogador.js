class Player {
    constructor(ctx, teclado,p) {
        this.ctx = ctx;
        this.teclado = teclado
        this.largura = p.largura
        this.altura = p.altura
        this.posX = (p.posX/2) - (p.largura/2)
        this.posY = p.posY||(this.ctx.canvas.height - this.altura - 20);
        this.vel = p.vel
    /*  this.nave= new Image()
      this.nave.src = "Nave.png"*/
    }
    update() {
        if (this.teclado.dD) {
            if ( this.posX < this.ctx.canvas.width - this.largura) {
                    this.posX += this.vel;
                    this.teclado.dD = false;
                }

            }
        if (this.teclado.dE) {
            if ( this.posX > 0) {
            
                    this.posX -= this.vel;
                    
                    this.teclado.dE = false
                }


            }
        if (this.teclado.dC) {
            if (this.posY > 0) {
                    this.posY -= this.vel;
                
                   this.teclado.dC = false;
            
            }
        }
        if (this.teclado.dB) {
            if (this.posY < this.ctx.canvas.height - this.altura) {
                    this.posY += this.vel
                    this.teclado.dB = false
                }
            }
}

        
    
    draw() {
      /*  if (this.nave.complete) { // Garante que a imagem está carregada
            this.ctx.drawImage(this.nave, this.posX, this.posY, this.largura, this.altura);
        }else {
          */  // Placeholder caso a imagem demore a carregar
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.posX, this.posY, this.largura, this.altura);    }
//}
}