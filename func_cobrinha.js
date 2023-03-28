const canvas = document.getElementById('canvas');
proporcao = 0.8;
const comprimento = canvas.width;
const altura = canvas.height; 
const limiteX = comprimento * proporcao;
const limiteY = altura * proporcao;
const ctx = canvas.getContext("2d");
//dimensão da cobrinha
const aumenta_tamanho = 5;
let comp_cobra = 5;
let alt_cobra = 3;
let pos_iniX = 10;
let pos_iniY = 10;
//velocidade é baseado pelo dx, o dy existe pois só é possivel movimentar no eixo x ou y
let dx = 0;
let dy = 0;
const mov = 5;
let cabeca = {};
//frames
const intervalID = setInterval(jogo, 50);
let estado = false;

let cobrinha = [
    {x:pos_iniX, y:pos_iniY},
    {x:pos_iniX - comp_cobra, y:pos_iniY},
    {x:pos_iniX - (2 * comp_cobra), y:pos_iniY},
    {x:pos_iniX - (3 * comp_cobra), y:pos_iniY},
    {x:pos_iniX - (4 * comp_cobra), y:pos_iniY}, 
    {x:pos_iniX - (5 * comp_cobra), y:pos_iniY},
    {x:pos_iniX - (6 * comp_cobra), y:pos_iniY},
    {x:pos_iniX - (7 * comp_cobra), y:pos_iniY},
    {x:pos_iniX - (8 * comp_cobra), y:pos_iniY}  
]

function movimentacao(){
    if(estado === true){
        cabeca = {x: cobrinha[0].x + dx, y: cobrinha[0].y + dy};
        cobrinha.unshift(cabeca);
        cobrinha.pop();
    }
}


class comida{
    constructor(x, y, TamC, TamA){
        this.x = x;
        this.y = y;
        this.TamC = TamC;
        this.TamA = TamA;
    }
}

function desenharcobrinha(){
    for (let i = 0; i < cobrinha.length; i++) {
        const corpo = cobrinha[i];
        ctx.fillStyle = 'red';
        if (dx === 0) {
            ctx.fillRect(corpo.x, corpo.y, alt_cobra + (mov - alt_cobra), comp_cobra);
        } else {
            ctx.fillRect(corpo.x, corpo.y, comp_cobra, alt_cobra + (mov - alt_cobra));
        }

    }
}

//Controle da cobrinha
document.addEventListener('keydown', (event) => {
    if (event.key === "ArrowDown" && dy !== -mov) {
        dx = 0;
        dy = mov; 
        estado = true;
    }
    else if (event.key === "ArrowUp" && dy !== mov){
        dx = 0;
        dy = -mov; 
        estado = true;
    }
    else if (event.key === "ArrowRight" && dx !== -mov){
        dx = mov;
        dy = 0;
        estado = true;
    }
    else if (event.key === "ArrowLeft" && dx !== mov){
        dx = -mov;
        dy = 0;
        estado = true;
    }
})

//função para colisão
const mens = document.getElementById('mensagens');
function colisao(){
    if (cobrinha[0].x < 0 || cobrinha[0].y < 0 || cobrinha[0].x> comprimento || cobrinha[0].y> altura) {
        mens.innerHTML = 'Você perdeu, seu otario';
        const caixa = document.getElementById('caixa_de_mensagem');
        caixa.style.display = 'block';
        clearInterval(intervalID);
    }
    for (let i = 1; i < cobrinha.length; i++) {
        if(cobrinha[i].x === cobrinha[0].x && cobrinha[i].y === cobrinha[0].y ){
            mens.innerHTML = 'Você perdeu, seu otario';
            const caixa = document.getElementById('caixa_de_mensagem');
            caixa.style.display = 'block';
            clearInterval(intervalID);
        } 
    }
}

function jogo() {
    ctx.clearRect(0, 0, comprimento, altura);
    colisao();
    movimentacao();
    desenharcobrinha();
    
}
