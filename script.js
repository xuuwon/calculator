const buttons = document.querySelectorAll('.button');
const display = document.getElementById('display');
const CBtn = document.querySelector('.C');
const dotBtn = document.querySelector('.dot');
const operBtns = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.equals');
const reverseBtn = document.querySelector('.reverse');
const perBtn = document.querySelector('.per');
const calBtn = document.querySelector('.calculator-button');
const container = document.querySelector('.calculator-container');

const displayVariable = document.getElementById('displayVariable');

let firstOperand = null;
let operator = null;
let secondOperand = null;
let shouldClearDisplay = false; // 연산할 때 사용할 것 -> 연산자가 눌린 직후면 true, 아니면 false
let confirmReverse = false; // reverse 버튼이 눌렸는지

let result = 0;

// 버튼 클릭 시 display에 출력하기
const buttonEventListener = function (btn) {
    if (btn.classList.contains('number') || btn.classList.contains('dot')) { // 화면에 출력해야 하는 클래스들
        // document로 하면 맨 첫번째 .text만 선택함

        if (shouldClearDisplay) { // =이나 연산자 있음!
            displayVariable.textContent = ''; // 한 번만 초기화
            shouldClearDisplay = false; // 초기화 후 다시 false로 설정
        }

        displayVariable.textContent += btn.querySelector('.text').textContent;
    }

    console.log(btn.querySelector('.text').textContent);
}

// 계산 함수
const calculate = function () {
    secondOperand = parseFloat(displayVariable.textContent);

    if (operator === '+') {
        result = firstOperand + secondOperand;
    } else if (operator === '-') {
        result = firstOperand - secondOperand;
    } else if (operator === 'x') {
        result = firstOperand * secondOperand;
    } else if (operator === '/') {
        result = firstOperand / secondOperand;
    }

    displayVariable.textContent = result;

    firstOperand = result;
    
    secondOperand = null;
    operator = null; // 연산자 비우기

    shouldClearDisplay = true; // 연산자 선택됨!
    confirmReverse = false;
}

// Button 클릭 시 이벤트 리스너
// 1. C 버튼: 0으로 초기화, 콘솔 출력
// 2. dot 버튼: 이미 dot이 있는지 확인

// Button 클릭 시 이벤트 리스너

// 1. C 버튼
CBtn.addEventListener('click', function () {
    // C 버튼 클릭 시 0으로 초기화
    displayVariable.textContent = '0';
    firstOperand = null;
    secondOperand = null;
    operator = null;

    confirmReverse = false;
    shouldClearDisplay = false; // 연산자도 초기화
})

// 2. dot 버튼
dotBtn.addEventListener('click', function () {
    // dot 버튼 클릭 시
    // 1. 0인지 확인할 필요 X
    // 2. .이 이미 있는지 확인 필요
    // 3. 바로 앞에 연산자가 왔었는지 확인 필요
    if (!(displayVariable.textContent.indexOf('.') !== -1) && operator === null) { // 없다면
        buttonEventListener(dotBtn);
    }
})

// 3. equals 버튼
equalsBtn.addEventListener('click', function () {
    calculate();
});


// 4. operator 버튼
operBtns.forEach(function (button) {
    button.addEventListener('click', function () {
        if (firstOperand === null) { // 맨 처음
            // 첫 번째 피연산자를 설정
            firstOperand = parseFloat(displayVariable.textContent);
        } else if (operator !== null) {
            // 이미 연산자가 있을 경우 계산을 수행
            // 연산자가 없으면 계산 X 
            calculate();
        }
        
        operator = button.querySelector('.text').textContent; // 새로운 연산자 설정
        
        shouldClearDisplay = true; // 다음 입력 시 화면을 지우기 위한 플래그
        
        const arr = {
            'first operand': firstOperand,
            operator: operator
        }

        console.log(arr);
    });
});

// 5. ± 버튼
reverseBtn.addEventListener('click', function(){
    let original = parseFloat(displayVariable.textContent);
    original = -original;

    // ± 버튼을 누르면 firstOperand 반전 시킴
    // -> =을 누른 후에도 적용 가능 (result 반전)
    firstOperand = original;

    displayVariable.textContent = original + '';

    confirmReverse = !confirmReverse; // 누를 때마다 반전
})

// 6. % 버튼
perBtn.addEventListener('click', function() {
    displayVariable.textContent *= 0.01
})

buttons.forEach(function (button) {
    // dot 버튼은 이미 별도로 처리하므로 무시
    if (!button.classList.contains('dot')) {
        button.addEventListener('click', function () {
            if (button.classList.contains('number')) {
                if (displayVariable.textContent === '0') {
                    displayVariable.textContent = '';
                }
            }
            buttonEventListener(button);
        });
    }
});

// calBtn 클릭 시 계산기 토글 기능!
calBtn.addEventListener('click', function() {
    container.classList.toggle('opacity');
})