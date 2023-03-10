const canvas = document.getElementById('canvas');
const comprimento = canvas.width;
const altura = canvas.height; 
const ctx = canvas.getContext("2d");

class Cobrinha { 
    constructor(x, y, com, alt){
        this.x = x;
        this.y = y;
        this.com = com;
        this.alt = alt;
        this.velx = 0;
        this.vely = 0;
    }

    novaPosicao(){
        this.x += this.velx;
        this.y += this.vely;
    }
}

// É o que faz a cobrinha aparecer
let minhaCobrinha = new Cobrinha(10, 10, 5, 3); 
ctx.fillStyle = "#FF0000"; 
ctx.fillRect(minhaCobrinha.x, minhaCobrinha.y, minhaCobrinha.com, minhaCobrinha.alt);

//Controle da cobrinha
document.addEventListener('keydown', (event) => {
    if (event.key === "ArrowDown") {
        minhaCobrinha.velx = 0;
        minhaCobrinha.vely = 5;
    }
    else if (event.key === "ArrowUp"){
        minhaCobrinha.velx = 0;
        minhaCobrinha.vely = -5;
    }
    else if (event.key === "ArrowRight"){
        minhaCobrinha.velx = 5;
        minhaCobrinha.vely = 0;
    }
    else if (event.key === "ArrowLeft"){
        minhaCobrinha.velx = -5;
        minhaCobrinha.vely = 0;
    }
})

//função para atualizar as imagens que aparecem na tela
function jogo(){
    ctx.clearRect(0, 0, comprimento, altura);
    minhaCobrinha.novaPosicao();
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(minhaCobrinha.x, minhaCobrinha.y, minhaCobrinha.com, minhaCobrinha.alt); 
    colisao();
}
setInterval(jogo, 50);

//função para colisão
const mens = document.getElementById('mensagens');
function colisao(){
    if (minhaCobrinha.x < 0 || minhaCobrinha.y < 0 || minhaCobrinha.x + minhaCobrinha.com > comprimento || minhaCobrinha.y + minhaCobrinha.alt > altura) {
        mens.innerHTML = 'Você perdeu, seu otario';
        const caixa = document.getElementById('caixa_de_mensagem');
        caixa.style.display = 'block';
    }
}
