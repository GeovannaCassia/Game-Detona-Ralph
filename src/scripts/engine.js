const state ={
    view:{
        squeres: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    value:{
        TimerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },

    action:{
        countDowntimerId: setInterval(countDown,1000),
    }
}

function randomSquare(){
    state.view.squeres.forEach((square) => {
        // Limpeza de todos os squares
        square.classList.remove("enemy");

    });

    //sorteia um numero aleatorio
    let randomNumber = Math.floor(Math.random() * 9);

    //acessa o square referente ao numero sorteado
    let randomSquare = state.view.squeres[randomNumber];

    randomSquare.classList.add("enemy");
    state.value.hitPosition = randomSquare.id;
}

function moveEnemy(){
    //Adiciona a class "enemy" no intervalo de tempo definido na variavel gameVelocity
    state.value.timerId = setInterval(randomSquare, state.value.gameVelocity);
}

function addListenerHitBox(){
    //Verifica se a square clicada possui um enemy para acresentar ou não na sua posição
    state.view.squeres.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.value.hitPosition){
                state.value.result+=1;
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                playSound();
            }

        });
    });
}


function countDown(){
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;
    if(state.value.currentTime <= 0){
        clearInterval(state.action.countDowntimerId);
        clearInterval(state.value.TimerId);
        alert("Game Over! O seu resultado foi: " + state.value.result);
    }
}

function playSound(){
    let audio = new Audio("./src/sounds/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}
function init(){
    moveEnemy();
    addListenerHitBox();
}

init();