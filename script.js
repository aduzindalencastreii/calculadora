document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const themeToggle = document.getElementById('toggle-theme');

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
        display.classList.add('dark');
        document.querySelectorAll('button').forEach(button => button.classList.add('dark'));
        themeToggle.textContent = 'Light Mode';
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        document.body.classList.remove('dark');
        display.classList.remove('dark');
        document.querySelectorAll('button').forEach(button => button.classList.remove('dark'));
        themeToggle.textContent = 'Dark Mode';
        localStorage.setItem('darkMode', 'disabled');
    }

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