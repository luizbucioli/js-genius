var order = [];
var clickedOrder = [];
var score = 0;
//0 - green
//1 - red
//2 - yellow
//3 - blue

function handleMouseEnter(){
    this.classList.add('level_btn--hovered');
    document.body.id = `${this.id}-hovered`;
}

function handleMouseLeave(){
    this.classList.remove('level_btn--hovered');
    document.body.id = '';
}

function addEventListersToBtn(){
    const buttonsElements = document.getElementsByClassName('level__btn');
    
    for(let i = 0; i < buttonsElements.length; i++){
        const button = buttonsElements[i];
        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);
    }
}

document.addEventListener('DOMContentLoaded', addEventListersToBtn, false);


var blue = document.querySelector('.blue');
var red = document.querySelector('.red');
var green = document.querySelector('.green');
var yellow = document.querySelector('.yellow');

//cria ordem aleatorio de cores
function shuffleOrder() {
    var colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(var i in order){
        var elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//Acede a próxima cor
function lightColor(element, number) {
    number = number * 500;
    setTimeout(() => {
            element.classList.add('selected');
        }, number - 250
    )

    setTimeout(() => {
        element.classList.remove('selected')
    }, number)
}

//checa se os botões clicados são os mesmos da ordem geradano jogo
function checkOrder() {
    for(var i in clickedOrder){
        if(clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length){
        alert(`Pontuação: ${score}\nVocê acertou!! Iniciando próximo nível! `)
        nextLevel();
    }
}

//Função para o clique do usuario
function click(color){
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    setTimeout(() => {
        createColorElement(color).classList.remove('selected')
        checkOrder();
    }, 250)
}

//função que retorna a cor
function createColorElement(color){
    if(color == 0){
        return green;
    } else if(color == 1){
        return red;
    } else if(color == 2){
        return yellow;
    }else if(color == 3){
        return blue;
    }
}

//função para proxima nível do jogo
function nextLevel(){
    score++;
    shuffleOrder();
}

//função para game over
function gameOver(){
    alert(`Pontuação ${score}!\nVocê perdeu o jogo!\nClique em OK Para iniciar um jogo novo`)
    order = []
    clickedOrder = []

    playGame()
}

//função do incio do jogo
function playGame(){
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!')
    score = 0;

    nextLevel();
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();