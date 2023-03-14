const canvas = document.getElementById('canvas');
const comprimento = canvas.width;
const altura = canvas.height; 
const ctx = canvas.getContext("2d");
//dimensão da cobrinha
const aumenta_tamanho = 5;
const comp_cobra = 5;
const alt_cobra = 3;
//velocidade é baseado pelo mov, o SemMov existe pois só é possivel movimentar no eixo x ou y
const mov = 5;
const SemMov = 0;
//frames
const intervalID = setInterval(jogo, 50);

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

class comida{
    constructor(x, y, TamC, TamA){
        this.x = x;
        this.y = y;
        this.TamC = TamC;
        this.TamA = TamA;
    }
}

// É o que faz a cobrinha aparecer
let minhaCobrinha = new Cobrinha(10, 10, comp_cobra, alt_cobra); 
ctx.fillStyle = "#FF0000"; 
ctx.fillRect(minhaCobrinha.x, minhaCobrinha.y, minhaCobrinha.com, minhaCobrinha.alt);
//faz a comida aparecer
let Comida = new comida(100, 100, 3, 3);
ctx.fillStyle = "#0000FF";
ctx.fillRect(Comida.x, Comida.y, Comida.TamC, Comida.TamA);


//Controle da cobrinha
document.addEventListener('keydown', (event) => {
    if (event.key === "ArrowDown" && minhaCobrinha.vely !== -mov) {
        minhaCobrinha.velx = SemMov;
        minhaCobrinha.vely = mov; 
        minhaCobrinha.com = alt_cobra;
        minhaCobrinha.alt = comp_cobra;
    }
    else if (event.key === "ArrowUp" && minhaCobrinha.vely !== mov){
        minhaCobrinha.velx = SemMov;
        minhaCobrinha.vely = -mov;
        minhaCobrinha.com = alt_cobra;
        minhaCobrinha.alt = comp_cobra;
    }
    else if (event.key === "ArrowRight" && minhaCobrinha.velx !== -mov){
        minhaCobrinha.velx = mov;
        minhaCobrinha.vely = SemMov;
        minhaCobrinha.com = comp_cobra;
        minhaCobrinha.alt = alt_cobra;
    }
    else if (event.key === "ArrowLeft" && minhaCobrinha.velx !== mov){
        minhaCobrinha.velx = -mov;
        minhaCobrinha.vely = SemMov;
        minhaCobrinha.com = comp_cobra;
        minhaCobrinha.alt = alt_cobra;
    }
})

//função para atualizar as imagens que aparecem na tela
function jogo(){
    //ficar repetindo cobrinha
    ctx.clearRect(0, 0, comprimento, altura);
    minhaCobrinha.novaPosicao();
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(minhaCobrinha.x, minhaCobrinha.y, minhaCobrinha.com, minhaCobrinha.alt); 
    //ficar repetindo comida
    let Comida = new comida(100, 100, 3, 3);
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(Comida.x, Comida.y, Comida.TamC, Comida.TamA);
    colisao();
    aumentar_cobrinha();
}


//função para colisão
const mens = document.getElementById('mensagens');
function colisao(){
    if (minhaCobrinha.x < 0 || minhaCobrinha.y < 0 || minhaCobrinha.x + minhaCobrinha.com > comprimento || minhaCobrinha.y + minhaCobrinha.alt > altura) {
        mens.innerHTML = 'Você perdeu, seu otario';
        const caixa = document.getElementById('caixa_de_mensagem');
        caixa.style.display = 'block';
        clearInterval(intervalID);
    }
}

function aumentar_cobrinha(){
    if (Comida.x === minhaCobrinha.x && Comida.y === minhaCobrinha.y) {
        if (minhaCobrinha.alt > minhaCobrinha.com) {
            minhaCobrinha.alt += aumenta_tamanho;
        }
        else{
            minhaCobrinha.com += aumenta_tamanho;
        }
    }
}
