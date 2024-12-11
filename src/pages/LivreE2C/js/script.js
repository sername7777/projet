
let number1 = document.querySelector('#number1');
let number2 = document.querySelector('#number2');
let resultHtml = document.querySelector('#result');
let calculate = document.querySelector('#calculate');
let reset = document.querySelector('#reset');


function makeCalcul() {
    let nombre1 = parseFloat(number1.value);
    let nombre2 = parseFloat(number2.value);
    if (isNaN(nombre1) || isNaN(nombre2)) {
        resultHtml.innerHTML = "<p style='color:red;'>Veuillez entrer deux nombres valides.</p>";
        return;
    }

    let resultat = nombre1 + nombre2;
    let messageAddition = `<p>Le résultat de l'addition de ${nombre1} et de ${nombre2} est ${resultat}</p>`;
    
    resultat = nombre1 - nombre2;
    let messageSoustraction = `<p>Le résultat de la soustraction de ${nombre1} et de ${nombre2} est ${resultat}</p>`;
    
    resultat = nombre1 * nombre2;
    let messageMultiplication = `<p>Le résultat de la multiplication de ${nombre1} et de ${nombre2} est ${resultat}</p>`;
    
    resultat = nombre1 / nombre2;
    let messageDivision = `<p>Le résultat de la division de ${nombre1} et de ${nombre2} est ${resultat.toFixed(2)}</p>`;

    resultHtml.innerHTML = messageAddition + messageSoustraction + messageMultiplication + messageDivision;
}


function resetFields() {
    number1.value = '';
    number2.value = '';
    resultHtml.innerHTML = '';
}

calculate.addEventListener("click", makeCalcul);
reset.addEventListener("click", resetFields);

