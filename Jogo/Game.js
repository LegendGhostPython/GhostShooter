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
var FrameRand = Math.floor(10+ Math.random() * 100) / 2
var DeltaTime = 1
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
    dY: -1

}

const dadosI = {
    posX: 0,
    posY: 0,
    vel: Math.random() * 10 + 2,
    // Velocidade entre 2 e 7
    largura: 50,
    altura: 50,
    cor: "red",
    tirosPorVez: 2

}
const tiroI = {
    vel: 20,
    posX: 0,
    posY: 0,
    quantidade: 30,
    altura: 10,
    largura: 5,
    cor: "red",
    dY: -1,

}
var meustiros = []
var tiroinimigo = []
//cria Objetos/Pré carregamento
var p = new Player(ctx, teclado, dadosP);
var inimigo = new Enemy(ctx, dadosI)
//desenhar
function desenhar() {
    meustiros.forEach(t => t.draw());
    tiroinimigo.forEach(ti => ti.draw());
    p.draw()
    inimigo.draw()
    ctx.save()
    ctx.fillStyle = "blue"; // Ou a cor que preferir
    ctx.font = "20px Arial";
    ctx.fillText("Tiros na tela: " + meustiros.length, 10, 30);
    ctx.fillText("Tiros na tela: " + tiroinimigo.length, 10, 50);
    ctx.restore()
}
function Atualiza() {
    let d = new Date()
    let s = d.getSeconds()
    p.update()
    inimigo.update()
    meustiros.forEach(t => t.update());


    // Mantém no array apenas os tiros que estão dentro da tela
    meustiros = meustiros.filter(t =>
        t.posY >= 0 &&
        t.posY <= c.height &&
        t.posX >= 0 &&
        t.posX <= c.width
    );
    tiroinimigo = tiroinimigo.filter(ti => ti.posY>= 0 && ti.posY <= c.height && ti.posX >= 0 && ti.posX <= c.width)
    DeltaTime++
    console.log(FrameRand)
   // FrameRand += Math.random()*10 
    if(DeltaTime % FrameRand == 0){
       const tiinimigo = new TiroInimigo(ctx,tiroI,inimigo)
        tiroinimigo.push(tiinimigo)
        tiroinimigo.forEach(ti => ti.update())
    }
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