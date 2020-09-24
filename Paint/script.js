const canvas = document.getElementById("canvas");

const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");
const clearButton = document.getElementById("clear");
const colorButton = document.getElementById("color");


const ctx = canvas.getContext("2d");

// shape size
let size = 10;
// in the beginning the mouse isnt pressed
let pressed = false;
let color = 'black';
let x = undefined;
let y = undefined;

// helper functions to identify when the mouse is pressed
canvas.addEventListener("mousedown", (e) => {
    pressed = true;
    x = e.offsetX;
    y = e.offsetY;
})


canvas.addEventListener("mouseup", () => {
    pressed = false;
    x = undefined;
    y = undefined
})

// when moving the mouse, if pressed, it draws a circle
canvas.addEventListener("mousemove", (e) => {
    if (pressed){
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        //drawCircle(x2, y2);     
        drawLine(x ,y, x2, y2);
        x = x2;
        y = y2;
    }    
});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.stroke();
}

colorButton.addEventListener('change', (e) => {
    color = e.target.value;
})

increaseButton.addEventListener('click', () => {
    size += 5;
    
    if(size > 50){
        size = 50;
    }
});

decreaseButton.addEventListener('click', () => {
    size -= 5;
    
    if(size < 5){
        size = 5;
    }
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});