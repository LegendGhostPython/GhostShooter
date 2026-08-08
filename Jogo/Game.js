/*Inicializa Variáveis*/
var c = document.getElementById("jogo");
var ctx = c.getContext("2d");
/* botões obsoletos
var direita = document.getElementById("direita")
var esquerda = document.getElementById("esquerda")
var cima = document.getElementById("cima")
var baixo = document.getElementById("baixo")
var x = document.getElementById("x");
*/
var count = 0
var jaAtirou = false
var key = ''
var FrameRand = Math.floor(10+ Math.random() * 1000) / 2
var DeltaTime = 1
var space = new Image()
space.src="Espaço.png"
c.width = window.innerWidth
c.height = window.innerHeight
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
    largura: 100,
    altura: 100,
    dY: -1,
    vida:100,
    posXb:-20,
    posYb:-10

}

const dadosI = {
    posX: 0,
    posY: 0,
    vel: Math.random() * 0.1+ 1.5,
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

const Desenhos ={
    coracao:{}
}

var meustiros = []
var tiroinimigo = []
var stars = []
var fire =[]
var drawD =[]
//cria Objetos/Pré carregamento
var p = new Player(ctx, teclado, dadosP);
var inimigo = new Enemy(ctx, dadosI)
var vidaB = new Life(ctx, dadosP,0,0,"pink","white")
var vidaBi = new Life(ctx,dadosI,0,0,"blue","green")
//var stars = new Particles(ctx,efeito.stars)
//desenhar
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
    },
    fire:{
        color:"orange",
        posX:p.posX,
        posY:p.posY,
        quantidade:3,
        largura:Math.random()*10,
        altura:Math.random()*10,
        vel:1,
        dX:1,
        dY:1
    }
}
function desenhar() {

    if(space.complete){
        ctx.drawImage(space,0,0,c.width,c.height)
    }
    stars.forEach(S => S.draw())
    fire.forEach(F => F.draw())
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
    /* Enviar pontos método post
    -----fetch('http://127.0.0.1:8000/pontos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: 'Jogador1', score: 1500 })
})
.then(res => res.json())
.then(data => console.log(data));
-----*/

/* Buscar pontos
-----fetch('http://127.0.0.1:8000/ranking')
    .then(res => res.json())
    .then(ranking => {
        console.log("Top 10:", ranking);
        // renderizar na tela do jogo
    });
    -------*/
    
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
    if(DeltaTime % 60 === 0){
       const tiinimigo = new TiroInimigo(ctx,tiroI,inimigo)
        tiroinimigo.push(tiinimigo)
        
    }
    tiroinimigo.forEach(ti => ti.update())
   // if(DeltaTime % 100 == 0){
         // --- ESTRELAS DE FUNDO ---
    stars = stars.filter(s => s.posY <= c.height);
    if (DeltaTime % 10 === 0 && stars.length < efeito.stars.quantidade) {
        //ajustar tamanho aleatoriamente
        let tam  = Math.random()* 10 + 1
        
        efeito.stars.altura = tam
        efeito.stars.largura = tam
        // Estrelas surgem aleatoriamente no topo do Canvas
        efeito.stars.posX = Math.random() * c.width;
        efeito.stars.posY = 0;
        efeito.stars.dX = 0
        efeito.stars.dY = 1
        //vel altera com o tamanho 
        efeito.stars.vel = tam * 0.8
        stars.push(new Particles(ctx, efeito.stars));
    }
    stars.forEach(s => s.update());

    // --- FOGO DE PROPULSÃO ---
    // Mantém apenas partículas que ainda têm largura (não sumiram por completo)
    fire = fire.filter(f => f.largura > 0 && f.posY <= c.height);

    if (fire.length < efeito.fire.quantidade) {
        let tam = Math.random() * 8 + 4; // Tamanho entre 4px e 12px
        
        efeito.fire.largura = tam;
        efeito.fire.altura = tam;

        // Centraliza exatamente embaixo do Player
        efeito.fire.posX = (p.posX + p.largura / 2) - (tam / 2);
        efeito.fire.posY = p.posY + p.altura;

        // Leve variação para espalhar
        efeito.fire.dX = (Math.random() - 0.5) * 1.5;
        efeito.fire.dY = 1;
        efeito.fire.vel = Math.random() * 2 + 2;

        fire.push(new Particles(ctx, efeito.fire));
    }
    fire.forEach(f => f.update());

for (let i = meustiros.length - 1; i >= 0; i--) {
    let t = meustiros[i];
    const col1 = (t.posX < inimigo.posX + inimigo.largura &&
                  t.posX + t.largura > inimigo.posX &&
                  t.posY < inimigo.posY + inimigo.altura &&
                  t.posY + t.altura > inimigo.posY);
    if (col1) {
        meustiros.splice(i, 1);
        vidaBi.vida--;
        if (vidaBi.vida <= 36) vidaBi.vida = 36;
    }
}


// Usar o mesmo for invertido que você aplicou no 'meustiros'
for (let i = tiroinimigo.length - 1; i >= 0; i--) {
    let ti = tiroinimigo[i];
    const col2 = (ti.posX < p.posX + p.largura && 
                  ti.posX + ti.largura > p.posX && 
                  ti.posY < p.posY + p.altura && 
                  ti.posY + ti.altura > p.posY);
    if (col2) {
        tiroinimigo.splice(i, 1);
        vidaB.vida--;
        if (vidaB.vida <= 36) vidaB.vida = 36;
    }
}


}/* Botões Obsoletos
//controla personagem com botoes
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
*/

// touches moves
c.addEventListener("touchmove",e =>{
    e.preventDefault()
    const touch = e.touches[0]
    console.log(touch.clientX,touch.clientY)
        // Definimos quantos tiros queremos disparar por clique (ex: 3)
    p.posX = touch.clientX - (p.largura/2)
    p.posY = touch.clientY - (p.altura/2)
    let tirosPorVez = 1;
    count++
    if(count % 50=== 0){
        tirosPorVez = 1
    }
    else(
        tirosPorVez = 0
        )
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
