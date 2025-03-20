// const calculator = document.querySelector('.calc_container');
// calculator.style.height = window.innerHeight + 'px';

let OpButtonsDisabled = false;

const normal = document.getElementById('normal');
normal.checked = true;

const trailerBox = document.getElementById('trailer');
const leftoverBox = document.getElementById('leftover');
const nextBtn = document.getElementById('next');
const textboxes = document.querySelectorAll('.text_container h2');
const backspaceBtn = document.getElementById('backspace');
const digits = document.querySelectorAll('.digit');
const resultBlock = document.getElementById('result_text');
const calcBlock = document.querySelectorAll('.output_text');
const equals = document.getElementById('equals');
const result = resultBlock.querySelector('.result');
const clear = document.getElementById('clear');
const symbols = document.querySelectorAll('.symbol');

function disableOpButtons(disable) {
    OpButtonsDisabled = disable ? true : false;
    symbols.forEach(symbol => {
        if (symbol.id != 'equals') {
            symbol.disabled = disable;
        }
    })
}

disableOpButtons(true);

function moveToNextBox() {
    if (trailerBox.classList.contains('active')) {
        trailerBox.classList.remove('active');
        leftoverBox.classList.add('active');
        leftoverBox.focus();
    } else {
        leftoverBox.classList.remove('active');
        trailerBox.classList.add('active');
        trailerBox.focus();
    }
}

nextBtn.addEventListener('click', moveToNextBox);

function typeInput(value) {
    if (OpButtonsDisabled) {
        textboxes.forEach(textBox => {
            if (textBox.classList.contains('active')) {
                textBox.textContent += value;
            }
            if (textBox.textContent.length > 2) {
                textBox.textContent = textBox.textContent.slice(0, 2)
            }
        })
    } else {
        result.textContent += value;
    }
}

function removeLastDigit() {
    if (OpButtonsDisabled) {
        textboxes.forEach(textbox => {
            if (textbox.classList.contains('active')) {
                textbox.textContent = textbox.textContent.slice(0, -1);
            }
        })
    } else {
        result.textContent = result.textContent.slice(0, -1);
    }
}

backspaceBtn.addEventListener('click', removeLastDigit);

digits.forEach(digit => {
    digit.addEventListener('click', () => {
        typeInput(digit.textContent);
    })
})

function calculatePlants() {
    const selectedRadio = document.querySelector('.radioButtons input[type="radio"]:checked');
    const trailerCount = Number(trailerBox.textContent);
    const leftoverCount = Number(leftoverBox.textContent);
    let total;
    if (selectedRadio.id == 'normal') {
        total = 18 * (trailerCount * 27 + leftoverCount);
    } else if (selectedRadio.id == '4inRound'){
        total = 10 * (trailerCount * 32 + leftoverCount);
    } else if (selectedRadio.id == '4.5in'){
        total = 8 * (trailerCount * 30 + leftoverCount);
    } else {
        total = 8 * (trailerCount * 27 + leftoverCount);
    }
    return total;
}

function hideCalcUI(hide) {
    calcBlock.forEach(text =>{
        text.style.display = hide ? 'none' : 'block';
    })
    resultBlock.style.display = hide ? 'block' : 'none';
}

symbols.forEach(symbol =>{
    symbol.addEventListener('click', () =>{
        if (symbol.id != 'equals') {
            result.textContent += symbol.textContent;
        }
    })
})

function calculatePlantCount() {
    if (resultBlock.style.display == 'none') {
        hideCalcUI(true);
        disableOpButtons(false);
        const plantCount = calculatePlants();
        result.textContent = plantCount;
    } else {
        const newPlantCount = eval(result.textContent);
        result.textContent = newPlantCount;
    }
}

equals.addEventListener('click', calculatePlantCount);

function clearContent() {
    // Set Trailas textbox as active
    if (!trailerBox.classList.contains('active')) {
        trailerBox.classList.add('active');
        leftoverBox.classList.remove('active');
    }
    hideCalcUI(false);
    disableOpButtons(true);
    trailerBox.textContent = '';
    leftoverBox.textContent = '';
}

clear.addEventListener('click', clearContent);

// Key event listeners
document.addEventListener('keydown', (event) => {
    if (/^\d$/.test(event.key)) {
        if (OpButtonsDisabled) {
            if (trailerBox.classList.contains('active')) {
                if (trailerBox.textContent.length < 2) {
                    trailerBox.textContent += event.key;
                }
            } else {
                if (leftoverBox.textContent.length < 2) {
                    leftoverBox.textContent += event.key;
                }
            }
        } else {
            result.textContent += event.key;
        }
    }

    if(['+', '-', '*', '/'].includes(event.key)) {
        result.textContent += event.key;
    }
})

document.addEventListener('keydown', function(event) {
    if (event.key == "Enter") {
        calculatePlantCount();
    } else if (event.key == " ") {
        moveToNextBox();
    } else if (event.key == "Backspace") {
        removeLastDigit();
    } else if (event.key == "c") {
        clearContent();
    }
})

