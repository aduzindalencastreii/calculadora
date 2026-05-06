document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const themeToggle = document.getElementById('toggle-theme');
    const calculator = document.querySelector('.calculator');
    const chaosButton = document.getElementById('chaos-button');
    const chaosOutput = document.getElementById('chaos-output');
    const chaosLog = document.getElementById('chaos-log');

    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        document.body.classList.add('dark');
        calculator.classList.add('dark');
        display.classList.add('dark');
        document.querySelectorAll('button').forEach(button => button.classList.add('dark'));
        themeToggle.textContent = 'Light Mode';
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        document.body.classList.remove('dark');
        calculator.classList.remove('dark');
        display.classList.remove('dark');
        document.querySelectorAll('button').forEach(button => button.classList.remove('dark'));
        themeToggle.textContent = 'Dark Mode';
        localStorage.setItem('darkMode', 'disabled');
    }

    function addChaosLog(message) {
        const item = document.createElement('li');
        item.textContent = message;
        chaosLog.prepend(item);

        while (chaosLog.children.length > 5) {
            chaosLog.removeChild(chaosLog.lastChild);
        }
    }

    function flashChaosAnimation() {
        calculator.classList.remove('chaos-active');
        void calculator.offsetWidth;
        calculator.classList.add('chaos-active');
    }

    function runChaosMode() {
        const chaoticColors = ['#ff7a00', '#00b894', '#00a8ff', '#e84393', '#fbc531'];

        const chaosActions = [
            () => {
                const randomDigit = Math.floor(Math.random() * 10).toString();
                display.value += randomDigit;
            },
            () => {
                const maybeExpression = `${Math.floor(Math.random() * 9) + 1}+${Math.floor(Math.random() * 9) + 1}`;
                display.value = maybeExpression;
            },
            () => {
                display.value = display.value.split('').reverse().join('');
            },
            () => {
                if (document.body.classList.contains('dark')) {
                    disableDarkMode();
                }

                enableDarkMode();
            }
        ];

        const color = chaoticColors[Math.floor(Math.random() * chaoticColors.length)];
        const actionResult = chaosActions[Math.floor(Math.random() * chaosActions.length)]();
        const luck = Math.floor(Math.random() * 101);

        document.body.style.setProperty('--chaos-accent', color);
        flashChaosAnimation();
    }

    chaosButton.addEventListener('click', runChaosMode);

    function appendNumber(number) {
        display.value += number;
    }

    function appendOperator(operator) {
        const lastChar = display.value.slice(-1);
        if (!['+', '-', '*', '/'].includes(lastChar)) {
            display.value += operator;
        }
    }

    function clearDisplay() {
        display.value = '';
    }

    function deleteLast() {
        display.value = display.value.slice(0, -1);
    }

    function calculate() {
        try {
            display.value = eval(display.value) || '';
        } catch {
            display.value = 'Error';
        }
    }

    window.appendNumber = appendNumber;
    window.appendOperator = appendOperator;
    window.clearDisplay = clearDisplay;
    window.deleteLast = deleteLast;
    window.calculate = calculate;
});