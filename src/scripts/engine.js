//Objeto para guardar todas as variaveis
const state = {
    view:{
        squares:document.querySelectorAll(".square"),
        enemy:document.querySelector(".enemy"),
        time: document.querySelector("#time"),
        score:document.querySelector("#score"),
        lives: document.querySelector("#live")
    },
    value:{
        gameVelocity: 1000,
        hitPosition: 1,
        result: 0,
        currentTime: 60,
        live: 3

    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}


// Função para aumentar a dificuldade (velocidade do random) a cada 7 segundos
function aumentarDificuldade(){
    if(state.value.gameVelocity > 300){
        state.value.gameVelocity -= 150;

        clearInterval(state.actions.timerId)

        state.actions.timerId = setInterval(randomSquare, state.value.gameVelocity)
    }
}

// Função para controlar o timer do jogo, além de chamar a função aumentarDificuldade
function countDown(){
    state.value.currentTime--;
    state.view.time.textContent = state.value.currentTime;

    if (state.value.currentTime % 7 === 0){
        aumentarDificuldade();
    }

    if(state.value.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        
        playSound("gameover.wav")
        alert("Game Over! O seu resultado foi: " + state.value.result)
        setTimeout(location.reload(), 3000)

    }
}


// Função para gerar número aleátorio referente a cada quadrado do jogo e atribuindo a imagem
function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy")
    state.value.hitPosition = randomSquare.id
    console.log(state.value.hitPosition)


}

// Função onde é instânciado o audio geral
function playSound(nameAudio){
    let audio = new Audio(`./src/audios/${nameAudio}`)
    audio.volume = 0.2
    audio.play();
}

// Função onde é gerado o click na imagem, e as verificações de cliques certas e erradas
function addListenerHitbox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.value.hitPosition){
                state.value.result++
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                playSound("hit.m4a")
            }else{
                state.value.live--
                state.view.lives.textContent = ` x${state.value.live}`
                state.value.hitPosition = null
                playSound("clickerror.wav")
                if(state.value.live == 0){
                    state.value.currentTime = 0
                    playSound("gameover.wav")
                }
            }
        })
    } )
}

// Função de iniciação do jogo, onde chamamos a função principal addListenerHitbox
function initialize(){

    addListenerHitbox()
}

initialize();