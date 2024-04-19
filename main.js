//Choosing level :

const buttonlvl1 = document.querySelector('#babyMode');
const buttonlvl2 = document.querySelector('#normalMode');
const buttonlvl3 = document.querySelector('#hardMode');

const selection = document.querySelector('.selection');
const gameInt = document.querySelector('.gameInt');

const loading = document.querySelector('.dice-cont');
const standby = document.querySelector('.standby');
const result = document.querySelector('.result');

const submit = document.querySelector('#submit');
const anwser = document.querySelector('#answer');

const lifeBar = document.querySelector('#life');
const scoreLabel = document.querySelector('#score');

const resultText = document.querySelector('#result-text');
const resultEmoji = document.querySelector('#result-emoji');
const resultExpected = document.querySelector('#result-expected');
const resultGuess = document.querySelector('#result-guess');

let level;
let lives = 0;
let score = 0;
let guess = 0;

const checklife = () => {
    if (lives > 0) {

        lifeBar.innerHTML = "Lives : ";

        for (let i = 0; i < lives; i++) {
            lifeBar.innerHTML += "💖";
        }
        
    } else {
        console.log('Game Ended');
        resultText.innerHTML = "You have died";
        resultEmoji.innerHTML = "😭";
        resultExpected.innerHTML = `result expected is: Not to die`;
        resultGuess.innerHTML = `result gotten:  you died.`;

        standby.style.display = 'none';
        result.style.display = 'flex';
    }
};

const checkScore = () => {
    if(score === 15){
        console.log("you win")
        resultText.innerHTML = "You have won";
        resultEmoji.innerHTML = "😎";
        resultExpected.innerHTML = `result expected is: you to win`;
        resultGuess.innerHTML = `result gotten: you won UwU`;

        standby.style.display = 'none';
        result.style.display = 'flex';        
    } else {
        scoreLabel.innerHTML = `Score : ${score}`;
    }
}

const load = async () => {
    await new Promise(resolve => setInterval(resolve, 3000))
};

const newGuess = async () => {
    
    submit.setAttribute('disabled','');
    loading.style.display = 'flex';
    standby.style.display = 'none';
    result.style.display = 'none';
    
    guess = Math.floor((Math.random() * 10) + 1);
    console.log(guess);

    await load();

    loading.style.display = 'none';
    standby.style.display = 'flex';
    submit.removeAttribute('disabled','');
};

const checkGuess = async (pGuess) => {

    submit.setAttribute('disabled','');

    if(parseInt(pGuess) === guess){
        resultText.innerHTML = "You got it right";
        resultEmoji.innerHTML = "😍";
        resultExpected.innerHTML = `The result expected is: ${guess}`;
        resultGuess.innerHTML = `Your guess was : ${pGuess}`;

        standby.style.display = 'none';
        result.style.display = 'flex';

        anwser.value = "";

        score = score + 1;

        checkScore();

        await load();

        if(lives === 0 || score === 15){
            location.reload();
        } else {
            newGuess();
        }

    } else {

        resultText.innerHTML = "You got it wrong !";
        resultEmoji.innerHTML = "😔";
        resultExpected.innerHTML = `The result expected is: ${guess}`;
        resultGuess.innerHTML = `Your guess was : ${pGuess}`;

        standby.style.display = 'none';
        result.style.display = 'flex';

        anwser.value = "";

        lives = lives - 1;
        
        checklife();

        await load();

        if(lives === 0 || score === 15){
            location.reload();
        } else {
            newGuess();
        }
    }

};

const gameStart = async (lvl) => {

    level = lvl;

    console.log(level);

    if(level === 1){
        lives = 5;
    } else if (level === 2) {
        lives = 3;
    } else {
        lives = 1;
    }

    checklife();
    selection.classList.add('active');
    gameInt.classList.add('active');

    newGuess();
};

submit.addEventListener('click',()=>{
    
    if(anwser.value !== ""){
        let x = anwser.value;
        checkGuess(x);
    } else{
        alert('please enter a number')
    }
    
});


//level of the Game

buttonlvl1.addEventListener('click', () =>{
    gameStart(1)
});

buttonlvl2.addEventListener('click', () =>{
    gameStart(2)
});

buttonlvl3.addEventListener('click', () =>{
    gameStart(3)
});