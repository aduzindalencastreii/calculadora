document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const themeToggle = document.getElementById('toggle-theme');

    // Dark Mode Toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        display.classList.toggle('dark');
        document.querySelectorAll('button').forEach(button => button.classList.toggle('dark'));

        themeToggle.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
    });

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

    // Expondo as funções no escopo global
    window.appendNumber = appendNumber;
    window.appendOperator = appendOperator;
    window.clearDisplay = clearDisplay;
    window.deleteLast = deleteLast;
    window.calculate = calculate;
});
