let currentInput = "";
let previousInput = "";
let operator = null;
let isOn = true;
let memory = 0;       // M+, M-, MRC-д зориулсан санах ой
let grandTotalVal = 0; // GT-д зориулсан нийт дүн
let history = [];      // Replay функцэд зориулсан

const screen = document.getElementById("screen");

function updateScreen(value) {
    if (!isOn) {
        screen.innerText = "";
        return;
    }
    // Тоог хэтэрхий урт байлгахгүй байх (max 12 орон)
    let displayValue = value.toString();
    if (displayValue.length > 12) displayValue = displayValue.substring(0, 12);
    screen.innerText = displayValue || "0";
}

function append(number) {
    if (!isOn) return;
    if (currentInput === "0" && number !== ".") currentInput = "";
    currentInput += number;
    updateScreen(currentInput);
}

function turnOff() {
    isOn = false;
    currentInput = "";
    previousInput = "";
    operator = null;
    updateScreen();
}

function turnOn() {
    isOn = true;
    currentInput = "";
    previousInput = "";
    operator = null;
    updateScreen("0");
}

function backspace() {
    if (!isOn) return;
    currentInput = currentInput.slice(0, -1);
    updateScreen(currentInput);
}

function setOp(op) {
    if (!isOn || currentInput === "") return;
    if (previousInput !== "") calculate(); // Дараалсан үйлдлийг тооцох
    operator = op;
    previousInput = currentInput;
    currentInput = "";
}

function calculate() {
    if (!isOn || !operator || currentInput === "") return;
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (operator) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case '*': result = prev * curr; break;
        case '/': result = curr === 0 ? "Error" : prev / curr; break;
        default: return;
    }

    if (result !== "Error") {
        grandTotalVal += result; // Хариу болгоныг GT-д нэмнэ
        history.push(`${previousInput} ${operator} ${currentInput} = ${result}`);
    }

    currentInput = result.toString();
    operator = null;
    previousInput = "";
    updateScreen(currentInput);
}

// --- Нэмэлт функцүүд ---

function percent() {
    if (!isOn || currentInput === "") return;
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateScreen(currentInput);
}

function sqrt() {
    if (!isOn || currentInput === "") return;
    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    updateScreen(currentInput);
}

function toggleSign() {
    if (!isOn || currentInput === "") return;
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateScreen(currentInput);
}

// Memory Functions
function memoryPlus() {
    if (!isOn) return;
    memory += parseFloat(currentInput || "0");
    currentInput = ""; 
}

function memoryMinus() {
    if (!isOn) return;
    memory -= parseFloat(currentInput || "0");
    currentInput = "";
}

function memoryRecall() {
    if (!isOn) return;
    currentInput = memory.toString();
    updateScreen(currentInput);
}

// Grand Total
function grandTotal() {
    if (!isOn) return;
    currentInput = grandTotalVal.toString();
    updateScreen(currentInput);
}

// Mark Up (MU)
function markup() {
    if (!isOn || previousInput === "" || currentInput === "") return;
    // MU томъёо: A / (1 - B/100)
    let a = parseFloat(previousInput);
    let b = parseFloat(currentInput);
    currentInput = (a / (1 - b / 100)).toString();
    updateScreen(currentInput);
}

// Replay (Түүх харах - энгийн хэлбэрээр)
function replay() {
    if (history.length > 0) {
        alert("History:\n" + history.join("\n"));
    } else {
        alert("No history yet.");
    }
}