import dt from './db.json' with { type: 'json' };

const buttons = document.querySelectorAll('.btn');
const animatedDiv = document.getElementById('card');
const text = document.getElementById('CardText');
const smashCounter = document.getElementById('smashCounter');
const passCounter = document.getElementById('passCounter');

let selectedAnime = 'bleach';
let characters = [];
let index = 0;
let smashes = [];
let passes = [];

dt.data.forEach(element => {
    if(element.anime == selectedAnime)
        characters = element.characters;
});

export function reset(){
    selectedAnime = 'bleach';
    characters = [];
    index = 0;
    smashes = [];
    passes = [];

    dt.data.forEach(element => {
        if(element.anime == selectedAnime)
            characters = element.characters;
    });

    loadImage();

    smashCounter.innerText = smashes.length;
    passCounter.innerText = passes.length;
}

export function loadImage(){
    if(index >= characters.length){
        index = 0;
        animatedDiv.style = "background-image: url("+characters[index].path+");";
        finish();
    }
    else
        animatedDiv.style = "background-image: url("+characters[index].path+");";
}

export function updateCounter(choice, action){
    switch(action){
        case 'smash':
            smashes.push(choice);
            smashCounter.innerText = smashes.length;
            break;
        case 'pass':
            passes.push(choice);
            passCounter.innerText = passes.length;
            break;
    }
}

export function finish(){
    alert('FINISH');
}

export function pass(){

    updateCounter(characters[index], 'pass');
       
    setTimeout(() => {
        text.innerHTML = 'PASS';
    }, 300); 

    setTimeout(() => {
        text.innerHTML = '';
        index += 1;
        loadImage();
    }, 1000); 

    buttons.forEach(button => {
        button.disabled = true;
    });

    animatedDiv.classList.add('pass');

    setTimeout(() => {
        animatedDiv.classList.remove('pass');
        buttons.forEach(button => {
            button.disabled = false;
        });
    }, 1500); // Tempo para a animação completar ida e volta
}

export function smash(){

    updateCounter(characters[index], 'smash');

    setTimeout(() => {
        text.innerHTML = 'SMASH';
    }, 300); 

    setTimeout(() => {
        text.innerHTML = '';
        index += 1;
        loadImage();
    }, 1000); 

    buttons.forEach(button => {
        button.disabled = true;
    });

    animatedDiv.classList.add('smash');

    setTimeout(() => {
        animatedDiv.classList.remove('smash');
        buttons.forEach(button => {
            button.disabled = false;
        });
    }, 1500); // Tempo para a animação completar ida e volta
}

loadImage();
window._buttonFunctions = {smash, pass, reset}

// Get the modal
var modal = document.getElementById("modalInfo");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
    setTimeout(function() {
    modal.style.opacity = 1;
    document.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10); // Small delay to ensure the display change is processed
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.opacity = 0;
    document.querySelector('.modal-content').style.transform = 'translateY(-100%)';
    setTimeout(function() {
      modal.style.display = "none";
    }, 500); // Match the duration of the transition
}

