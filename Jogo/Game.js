/*Inicializa Variáveis*/
var c = document.getElementById("jogo");
var ctx = c.getContext("2d");
var direita = document.getElementById("direita")
var esquerda = document.getElementById("esquerda")
var cima = document.getElementById("cima")
var baixo = document.getElementById("baixo")
var x = document.getElementById("x");
var jaAtirou = false
var key = ''
var FrameRand = Math.floor(10+ Math.random() * 1000) / 2
var DeltaTime = 1
var space = new Image()
space.src="Espaço.png"
const teclado = {
    dE: false,
    dD: false,
    dC: false,
    dB: false
}
const tiro = {
    vel: 1,
    posX: 0,
    posY: 0,
    quantidade: 30,
    altura: 10,
    largura: 5,
    cor: "green",
    dY: -1

}

const dadosP = {
    teclado: teclado,
    posX: 100,
    posY: 100,
    vel: 15,
    largura: 50,
    altura: 50,
    dY: -1,
    vida:100,
    posXb:-20,
    posYb:-10

}

const dadosI = {
    posX: 0,
    posY: 0,
    vel: Math.random() * 10 + 2,
    // Velocidade entre 2 e 7
    largura: 50,
    altura: 50,
    cor: "red",
    tirosPorVez: 2,
    vida:100,
    posXb:-20,
    posYb:-20

}
const tiroI = {
    vel: 30,
    posX: 0,
    posY: 0,
    quantidade: 30,
    altura: 10,
    largura: 5,
    cor: "red",
    dY: -1,

}
const efeito={
    stars:{
        color:"white",
        posX:0,
        posY:0,
        largura:10,
        altura:10,
        vel:1,
        dY:1,
        dX:1,
        quantidade:30
    }
}
const Desenhos ={
    coracao:{}
}

var meustiros = []
var tiroinimigo = []
var part = []
var drawD =[]
//cria Objetos/Pré carregamento
var p = new Player(ctx, teclado, dadosP);
var inimigo = new Enemy(ctx, dadosI)
var vidaB = new Life(ctx, dadosP,0,0,"pink","white")
var vidaBi = new Life(ctx,dadosI,0,0,"blue","green")
//var stars = new Particles(ctx,efeito.stars)
//desenhar
function desenhar() {

    if(space.complete){
        ctx.drawImage(space,0,0,400,200)
    }
    part.forEach(Stars => Stars.draw())
    meustiros.forEach(t => t.draw());
    tiroinimigo.forEach(ti => ti.draw());

        
    p.draw()
    inimigo.draw()
    vidaB.draw()
    vidaBi.draw()
    
    /*ctx.save()
    ctx.fillStyle = "blue"; // Ou a cor que preferir
    ctx.font = "20px Arial";
    ctx.fillText("Tiros na tela: " + meustiros.length, 10, 30);
    ctx.fillText("Tiros na tela: " + tiroinimigo.length, 10, 50);
    ctx.restore()*/
    
    
}
function Atualiza() {
    let d = new Date()
    let s = d.getSeconds()
    p.update()
    inimigo.update()
    vidaB.posX = -20
    vidaB.posY = 0
    vidaBi.posX = 250
    vidaBi.posY = 0
    meustiros.forEach(t => t.update());
    /*if(part.length >  efeito.stars.quantidade){
        part.splice(-1,1)
    }*/
    // Mantém no array apenas os tiros que estão dentro da tela
    meustiros = meustiros.filter(t =>
        t.posY >= 0 &&
        t.posY <= c.height &&
        t.posX >= 0 &&
        t.posX <= c.width
    );
    
    tiroinimigo = tiroinimigo.filter(ti => ti.posY>= 0 && ti.posY <= c.height && ti.posX >= 0 && ti.posX <= c.width)
    DeltaTime++
   // FrameRand += Math.random()*10 
    if(DeltaTime % FrameRand == 0){
       const tiinimigo = new TiroInimigo(ctx,tiroI,inimigo)
        tiroinimigo.push(tiinimigo)
        
    }
    tiroinimigo.forEach(ti => ti.update())
   // if(DeltaTime % 100 == 0){
       part = part.filter(parti => parti.posY >= 0 && parti.posY <= c.height)
       if(DeltaTime % efeito.stars.quantidade == 0){
      if(part.length < efeito.stars.quantidade){
       const Stars = new Particles(ctx,efeito.stars)
        part.push(Stars)
       }
       }
        part.forEach(p => p.update())
    
       
  //  }
meustiros.forEach((t, indexTiro) => {
    // Checa se o tiro 't' encostou no 'inimigo'
    const col1 = (t.posX < inimigo.posX + inimigo.largura &&
        t.posX + t.largura > inimigo.posX &&
        t.posY < inimigo.posY + inimigo.altura &&
        t.posY + t.altura > inimigo.posY) 
       if(col1) {
        console.log("Inimigo atingido!");
        
        // 1. Remove o tiro da tela para ele não dar dano múltiplo
        
        meustiros.splice(indexTiro, 1);
        vidaBi.vida--
        if(vidaBi.vida <= 20){
            vidaBi.vida = 20
        }
        // 2. Aqui você pode aplicar dano ao inimigo ou resetar a posição dele
        // Exemplo: inimigo.resetarposicao(); (se você criar esse método na classe dele)
       }
        
});
tiroinimigo.forEach((ti,indexTi) => {
    const col2 = (ti.posX < p.posX + p.largura && ti.posX + ti.largura > p.posX && ti.posY < p.posY + p.altura && ti.posY + ti.altura > p.posY)
    if(col2){
        console.log("player atingido")
        tiroinimigo.splice(indexTi,1)
        vidaB.vida--
        if(vidaB.vida <= 20){
            vidaB.vida = 20
        }
    }
})

}
//controla personagem
direita.addEventListener("click", ()=> {
    teclado.dD = true;

})
esquerda.addEventListener("click", ()=> {
    teclado.dE = true;

})
cima.addEventListener("click", ()=> {
    teclado.dC = true;

})
baixo.addEventListener("click", ()=> {
    teclado.dB = true;

})
document.onkeydown = function(evt) {
    console.log(processar(evt))
    if (processar(evt) == "KeyA") {
        teclado.dE = true;
    }
    if (processar(evt) == "KeyD") {
        teclado.dD = true
    }
    if (processar(evt) == "KeyW") {
        teclado.dC = true
    }
    if (processar(evt) == "KeyS") {
        teclado.dB = true
    }
    if (processar(evt) == "KeySpace" || processar(evt) == "KeyK") {}
}
function processar(key) {
    return key.code
}
//ações da nave
x.addEventListener("click", ()=> {
    // Definimos quantos tiros queremos disparar por clique (ex: 3)
    const tirosPorVez = 3;

    for (let i = 0; i < tirosPorVez; i++) {
        let novoTiro = new Tiro(ctx, tiro, p)
        // Só adiciona se o total disparado for menor que a quantidade total permitida
        if (meustiros.length < tiro.quantidade) {
            meustiros.push(novoTiro);

        }
    }

})

function Game() {
    //limpa canvas
    ctx.clearRect(0,
        0,
        c.width,
        c.height)

    //Atualiza posições e estados de Objetos
    Atualiza()
    //desenha Objetos
    desenhar()
    /*frames game*/
    window.requestAnimationFrame(Game)
}


/*inicializa Game*/
window.requestAnimationFrame(Game)