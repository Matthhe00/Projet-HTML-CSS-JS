document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('#result-input');
    const buttons = document.querySelectorAll('.nombre');
    const operators = document.querySelectorAll('.operation');
    const clear = document.querySelector('.effacer');
    const decimal = document.querySelector('.decimal');
    let currentVal = '';

    // Ajoutez des écouteurs d'événements pour les boutons
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Bouton cliqué:', this.textContent);
            currentVal += this.textContent;
            input.value += this.textContent;
        });
    });

    operators.forEach(operator => {
        operator.addEventListener('click', function() {
            console.log('Opérateur cliqué:', this.textContent);
            if (this.textContent === '=') {
                calculate();
            } else {
                currentVal += this.textContent;
                input.value += this.textContent;
            }

        });
    });
    
    decimal.addEventListener('click', function() {
        console.log('Decimal cliqué:', this.textContent);
        currentVal += this.textContent;
        input.value += this.textContent;
    });

    clear.addEventListener('click', function() {
        console.log('Effacer ' + currentVal);
        input.value = '';
        currentVal = '';
    });

    function calculate() {
        console.log('Calculer ' + currentVal);
        input.value = eval(currentVal);
        currentVal = eval(currentVal);
    }
});