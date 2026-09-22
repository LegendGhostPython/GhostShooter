/*Inicializa Variáveis*/
var c = document.getElementById("jogo");
var ctx = c.getContext("2d");

// --- MÁQUINA DE ESTADOS E TEMPO ---
var estadoJogo = 'MENU'; // 'MENU', 'JOGANDO', 'GAMEOVER'
var tempoSegundos = 0;
var bossAtivo = false;
var boss = null;

var count = 0;
var DeltaTime = 1;
var Pontos = 0;
c.width = window.innerWidth;
c.height = window.innerHeight;

const teclado = {
    dE: false,
    dD: false,
    dC: false,
    dB: false
};

const tiro = {
    vel: 1,
    posX: 0,
    posY: 0,
    quantidade: 30,
    altura: 10,
    largura: 5,
    cor: "green",
    dY: -1
};

const dadosP = {
    teclado: teclado,
    posX: c.width / 2 - 50,
    posY: c.height - 150,
    vel: 15,
    largura: 100,
    altura: 100,
    dY: -1,
    vida: 120,
    posXb: -20,
    posYb: -10,
    ataque: 1
};

const dadosI = {
    posX: 0,
    posY: 0,
    vel: 1,
    largura: 50,
    altura: 50,
    cor: "red",
    tirosPorVez: 2,
    vida: 100,
    maxVida: 100,
    ataque: 1,
};

// Dados base para o Chefão
const dadosBoss = {
    posX: c.width / 2 - 75,
    posY: 50,
    vel: 2,
    largura: 150,
    altura: 150,
    cor: "purple",
    vida: 1000,
    maxVida: 1000,
    ataque: 3,
    isBoss: true
};

const tiroI = {
    vel: 5,
    posX: 0,
    posY: 0,
    quantidade: 30,
    altura: 10,
    largura: 5,
    cor: "red",
    dY: 1
};

var meustiros = [];
var tiroinimigo = [];
var stars = [];
var fire = [];
var inimigoSpawn = [];

// Instanciação inicial do Player e da Barra do Player
var p = new Player(ctx, teclado, dadosP);
var vidaB = new Life(ctx, dadosP, 0, 0, "pink", "white");

const efeito = {
    stars: {
        color: "white",
        posX: 0,
        posY: 0,
        largura: 10,
        altura: 10,
        vel: 1,
        dY: 1,
        dX: 1,
        quantidade: 30
    },
    fire: {
        color: "orange",
        posX: p.posX,
        posY: p.posY,
        quantidade: 3,
        largura: Math.random() * 10,
        altura: Math.random() * 10,
        vel: 1,
        dX: 1,
        dY: 1
    }
};

// --- REINICIAR O JOGO ---
function reiniciarJogo() {
    Pontos = 0;
    DeltaTime = 1;
    tempoSegundos = 0;
    bossAtivo = false;
    boss = null;
    
    dadosP.vida = 120;
    dadosP.posX = c.width / 2 - 50;
    dadosP.posY = c.height - 150;
    dadosP.ataque = 1;
    
    vidaB.vida = 120;
    dadosI.ataque = 1;
    
    meustiros = [];
    tiroinimigo = [];
    inimigoSpawn = [];
}

// --- DESENHO DAS TELAS ---
function desenharMenu() {
    c.style.background = "black";
    ctx.textAlign = "center";
    
    ctx.fillStyle = "cyan";
    ctx.font = "bold 40px Arial";
    ctx.fillText("SPACE SHOOTER 2.0", c.width / 2, c.height / 3);

    ctx.fillStyle = "white";
    ctx.font = "22px Arial";
    ctx.fillText("Toque ou clique na tela para jogar", c.width / 2, c.height / 2);
}

function desenharGameOver() {
    c.style.background = "#100000";
    ctx.textAlign = "center";

    ctx.fillStyle = "red";
    ctx.font = "bold 50px Arial";
    ctx.fillText("GAME OVER", c.width / 2, c.height / 3);

    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText("Pontuação Final: " + Pontos, c.width / 2, c.height / 2);

    ctx.fillStyle = "yellow";
    ctx.font = "20px Arial";
    ctx.fillText("Toque para jogar novamente", c.width / 2, c.height / 2 + 60);
}

function desenhar() {
    c.style.background = "black";
    stars.forEach(S => S.draw());
    fire.forEach(F => F.draw());
    meustiros.forEach(t => t.draw());
    tiroinimigo.forEach(ti => ti.draw());
    inimigoSpawn.forEach(is => is.draw());
    p.draw();
    vidaB.draw();

    // --- BARRAS DE VIDA INDIVIDUAIS NOS INIMIGOS E CHEFÃO ---
    inimigoSpawn.forEach(is => {
        if (is.vida < is.maxVida) {
            let barW = is.largura;
            let barH = 6;
            let barX = is.posX;
            let barY = is.posY - 12;

            // Fundo Vermelho
            ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
            ctx.fillRect(barX, barY, barW, barH);

            // Preenchimento Verde
            ctx.fillStyle = "rgba(0, 255, 0, 0.9)";
            let pctVida = Math.max(0, is.vida / is.maxVida);
            ctx.fillRect(barX, barY, barW * pctVida, barH);

            // Borda Branca
            ctx.strokeStyle = "white";
            ctx.lineWidth = 1;
            ctx.strokeRect(barX, barY, barW, barH);
        }
    });

    // UI de Pontos e Timer
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.font = "22px Arial";
    ctx.fillText("Pontos: " + Pontos, 150, 40);
    ctx.fillText("Tempo: " + tempoSegundos + "s", 150, 70);
}

function Atualiza() {
    p.update();
    vidaB.posX = -20;
    vidaB.posY = 0;

    // Incrementa contagem de tempo (60 frames ≈ 1 segundo)
    if (DeltaTime % 60 === 0) {
        tempoSegundos++;
        
        // SURGIMENTO DO CHEFÃO A CADA 120 SEGUNDOS (2 MINUTOS)
        if (tempoSegundos % 120 === 0 && !bossAtivo) {
            bossAtivo = true;
            inimigoSpawn = []; // Limpa inimigos comuns
            boss = new Enemy(ctx, dadosBoss);
            boss.vida = dadosBoss.vida;
            boss.maxVida = dadosBoss.maxVida;
            boss.velX = 4;
            boss.dirX = 1;
            boss.isBoss = true;
            inimigoSpawn.push(boss);
        }
    }

    // Movimentação especial do Chefão no topo
    if (bossAtivo && boss) {
        boss.posY = 50; // Mantém travado no topo
        boss.posX += boss.velX * boss.dirX;
        
        // Rebate nas paredes laterais
        if (boss.posX <= 0) {
            boss.posX = 0;
            boss.dirX = 1;
        } else if (boss.posX + boss.largura >= c.width) {
            boss.posX = c.width - boss.largura;
            boss.dirX = -1;
        }
    } else {
        inimigoSpawn.forEach(is => is.update());
    }

    meustiros.forEach(t => t.update());

    meustiros = meustiros.filter(t =>
        t.posY >= 0 && t.posY <= c.height &&
        t.posX >= 0 && t.posX <= c.width
    );

    inimigoSpawn = inimigoSpawn.filter(is => is.posX >= 0 && is.posX <= c.width && is.posY >= 0 && is.posY <= c.height);

    // Spawn de Inimigos Comuns
    if (!bossAtivo && DeltaTime % 60 === 0) {
        const inimigoSp = new Enemy(ctx, dadosI);
        inimigoSp.posX = Math.random() * (c.width - dadosI.largura);
        inimigoSp.vida = dadosI.vida;
        inimigoSp.maxVida = dadosI.maxVida;
        dadosI.ataque += 0.01;
        inimigoSpawn.push(inimigoSp);
    }

    tiroinimigo = tiroinimigo.filter(ti => ti.posY >= 0 && ti.posY <= c.height && ti.posX >= 0 && ti.posX <= c.width);
    DeltaTime++;

    // INIMIGOS / CHEFÃO ATIRAM
    if (DeltaTime % 50 === 0 && inimigoSpawn.length > 0) {
        let inimigoAtirador = inimigoSpawn[Math.floor(Math.random() * inimigoSpawn.length)];
        
        // Se for o Chefão, atira simultaneamente pelas DUAS PONTAS
        if (inimigoAtirador.isBoss) {
            let tiroPontaEsquerda = {
                posX: inimigoAtirador.posX + 15,
                posY: inimigoAtirador.posY + inimigoAtirador.altura,
                largura: 0,
                altura: 0
            };
            let tiroPontaDireita = {
                posX: inimigoAtirador.posX + inimigoAtirador.largura - 15,
                posY: inimigoAtirador.posY + inimigoAtirador.altura,
                largura: 0,
                altura: 0
            };

            tiroinimigo.push(new TiroInimigo(ctx, tiroI, tiroPontaEsquerda));
            tiroinimigo.push(new TiroInimigo(ctx, tiroI, tiroPontaDireita));
        } else {
            // Inimigo comum dispara tiro único centralizado
            const tiinimigo = new TiroInimigo(ctx, tiroI, inimigoAtirador);
            tiroinimigo.push(tiinimigo);
        }
    }
    
    tiroinimigo.forEach(ti => ti.update());

    // --- ESTRELAS DE FUNDO ---
    stars = stars.filter(s => s.posY <= c.height);
    if (DeltaTime % 40 === 0 && stars.length < efeito.stars.quantidade) {
        let tam = Math.random() * 10 + 1;
        efeito.stars.altura = tam;
        efeito.stars.largura = tam;
        efeito.stars.posX = Math.random() * c.width;
        efeito.stars.posY = 0;
        efeito.stars.dX = 0;
        efeito.stars.dY = 1;
        efeito.stars.vel = tam * 0.8;
        stars.push(new Particles(ctx, efeito.stars));
    }
    stars.forEach(s => s.update());

    // --- FOGO DE PROPULSÃO ---
    fire = fire.filter(f => f.largura > 0 && f.posY <= c.height);
    if (fire.length < efeito.fire.quantidade) {
        let tam = Math.random() * 8 + 4;
        efeito.fire.largura = tam;
        efeito.fire.altura = tam;
        efeito.fire.posX = (p.posX + p.largura / 2) - (tam / 2);
        efeito.fire.posY = p.posY + p.altura;
        efeito.fire.dX = (Math.random() - 0.5) * 1.5;
        efeito.fire.dY = 1;
        efeito.fire.vel = Math.random() * 2 + 2;
        fire.push(new Particles(ctx, efeito.fire));
    }
    fire.forEach(f => f.update());

    // Colisão dos tiros do Player contra Inimigos ou Chefão
    for (let i = meustiros.length - 1; i >= 0; i--) {
        let t = meustiros[i];

        for (let j = inimigoSpawn.length - 1; j >= 0; j--) {
            let is = inimigoSpawn[j];
            const colSpawn = (t.posX < is.posX + is.largura &&
                              t.posX + t.largura > is.posX &&
                              t.posY < is.posY + is.altura &&
                              t.posY + t.altura > is.posY);
            if (colSpawn) {
                meustiros.splice(i, 1);
                
                let danoCausado = bossAtivo && is.isBoss ? (dadosP.ataque * 20) : (dadosP.ataque * 35);
                is.vida -= danoCausado;

                if (is.vida <= 0) {
                    if (is.isBoss) {
                        bossAtivo = false;
                        boss = null;
                        Pontos += 50;
                    } else {
                        Pontos += 1;
                    }
                    inimigoSpawn.splice(j, 1);
                    dadosP.ataque += 0.01;
                }
                break;
            }
        }
    }

    // Colisão dos tiros Inimigos contra o Player
    for (let i = tiroinimigo.length - 1; i >= 0; i--) {
        let ti = tiroinimigo[i];
        const col2 = (ti.posX < p.posX + p.largura && 
                      ti.posX + ti.largura > p.posX && 
                      ti.posY < p.posY + p.altura && 
                      ti.posY + ti.altura > p.posY);
        if (col2) {
            tiroinimigo.splice(i, 1);
            dadosI.ataque -= 0.01;
            dadosI.vel += 0.02;
            efeito.stars.vel += 0.02;
            tiro.vel += 0.02;
            
            vidaB.vida -= (bossAtivo ? dadosBoss.ataque : dadosI.ataque);
            
            if (vidaB.vida <= 20) {
                estadoJogo = 'GAMEOVER';
            }
        }
    }
}

// Interação para iniciar/reiniciar jogo
function acaoCliqueOuToque() {
    if (estadoJogo === 'MENU' || estadoJogo === 'GAMEOVER') {
        reiniciarJogo();
        estadoJogo = 'JOGANDO';
    }
}

c.addEventListener("click", acaoCliqueOuToque);

// Touch controls
c.addEventListener("touchmove", e => {
    e.preventDefault();
    if (estadoJogo !== 'JOGANDO') return;

    const touch = e.touches[0];
    p.posX = touch.clientX - (p.largura / 2);
    p.posY = touch.clientY - (p.altura / 2);
    
    let tirosPorVez = 2;
    count++;

    if (count % 50 === 0) {
        tirosPorVez = 1;
    } else {
        tirosPorVez = 0;
    }

    for (let i = 0; i < tirosPorVez; i++) {
        let novoTiro = new Tiro(ctx, tiro, p);
        if (meustiros.length < tiro.quantidade) {
            meustiros.push(novoTiro);
        }
    }
});

// --- MAIN GAME LOOP ---
function Game() {
    ctx.clearRect(0, 0, c.width, c.height);

    if (estadoJogo === 'MENU') {
        desenharMenu();
    } else if (estadoJogo === 'JOGANDO') {
        Atualiza();
        desenhar();
    } else if (estadoJogo === 'GAMEOVER') {
        desenharGameOver();
    }

    window.requestAnimationFrame(Game);
}

/*Inicializa Game*/
window.requestAnimationFrame(Game);
