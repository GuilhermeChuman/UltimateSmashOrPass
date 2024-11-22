import dt from './db.json' with { type: 'json' };

const buttons = document.querySelectorAll('.btn');
const animatedDiv = document.getElementById('card');
const text = document.getElementById('CardText');
const smashCounter = document.getElementById('smashCounter');
const passCounter = document.getElementById('passCounter');

var selectedAnimes = [];
var animes = [];
var characters = [];
var index = 0;
var smashes = [];
var passes = [];

dt.data.forEach(element => {
    animes.push(element)
});

var animeOptions = document.getElementById('animeOptions');

start();

export function reset(){
    
    smashCounter.innerText = smashes.length;
    passCounter.innerText = passes.length;
    
    start();  
}

export function loadImages(){
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
        loadImages();
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
        loadImages();
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

window._buttonFunctions = {smash, pass, reset}
window._modalFunctions = {openModal, closeModal,configureSmashOrPass}

export function start(){
    characters = [];
    index = 0;
    smashes = [];
    passes = [];

    let animeCheckers = '';

    animes.forEach(element => {
        animeCheckers = animeCheckers+'<input type="checkbox" id="'+element.anime+'" name="animeOpt" value="'+element.anime+'" /><label for="'+element.anime+'"> <p>'+element.anime+'</p></label>';
    }); 

    animeOptions.innerHTML = animeCheckers;
    
    openModal('modalStart', 'modal-start-content');
}

export function openModal(modalId, modalContent){
    let modal = document.getElementById(modalId);
    modal.style.display = "block";
    setTimeout(function() {
        modal.style.opacity = 1;
        document.getElementById(modalContent).style.transform = 'translateY(0)';
    }, 10);
}

export function closeModal(modalId, modalContent){
    let modal = document.getElementById(modalId);
    modal.style.opacity = 0;
    document.getElementById(modalContent).style.transform = 'translateY(-100%)';
    setTimeout(function() {
      modal.style.display = "none";
    }, 500)
}

export function configureSmashOrPass(){
    let options = document.getElementsByName('animeOpt');

    options.forEach(element => {
        if(element.checked)
            selectedAnimes.push(element.value)
    });

    selectedAnimes.forEach(element => {
        animes.forEach(a => {
            if(a.anime == element)
                a.characters.forEach(char => {
                    characters.push(char);
                });
        });  
    });
        
    loadImages();
    closeModal('modalStart', 'modal-start-content');
}

