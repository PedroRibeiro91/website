// generated password
const generatedPw = document.getElementById("generated-pwd");

// checkbox for the password requirements
const upperCase = document.getElementById("upper");
const lowerCase = document.getElementById("lower");
const number = document.getElementById("number");
const symbol = document.getElementById("symbol");

const pwLength = document.getElementById("pwdlength");

// buttons
const copyButton = document.getElementById("copy");
const generateButton = document.getElementById("generate");

// password elements
const lettersUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lettersLowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#£$§%&?{[]}=<>/+";


// the next 4 functions get a random element from the previous 4 variables
function getUpper() {
    return lettersUppercase[Math.floor(Math.random()*lettersUppercase.length)];
}

function getLower() {
    return lettersLowercase[Math.floor(Math.random()*lettersLowercase.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random()*numbers.length)];
}

function getSymbols() {
    return symbols[Math.floor(Math.random()*symbols.length)];
}

// combining the password

function generatePassword(){
    const len = pwLength.value;
    let password = '';
    for(let i=0; i < len; i++){
        const c = checkRequirements()
        password += c;
    }
    generatedPw.innerText = password;
    console.log(password);
}

function checkRequirements(){
    const xs = [];

    if(upperCase.checked) {
        xs.push(getUpper());
    }

    if(lowerCase.checked) {
        xs.push(getLower());
    }

    if(number.checked) {
        xs.push(getNumber());
    }
    
    if(symbol.checked) {
        xs.push(getSymbols());
    }

    if(xs.length === 0){
        return '';
    }

    return xs[Math.floor(Math.random()*xs.length)];
}

generateButton.addEventListener('click',
generatePassword);

copyButton.addEventListener('click', () => {
    const textarea = document.createElement("textarea");
    const password = generatedPw.innerText;

    if (!password){return;}
    
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove()
    alert("Password successfully copied!")
});




