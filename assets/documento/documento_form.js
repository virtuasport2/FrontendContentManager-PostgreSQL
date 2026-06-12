// form.js
document.getElementById('documento-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene il comportamento di submit predefinito

    // Qui puoi gestire il salvataggio del documento (ad esempio, fare una chiamata a un API o semplicemente mostrare un messaggio)
    alert('Documento salvato!');

    // Mostra il pulsante per creare un articolo
    const articoloButton = document.createElement('button');
    articoloButton.textContent = '+ Articolo';
    articoloButton.onclick = function() {
        window.location.href = '../articolo/articolo.html'; // Ti reindirizza a un'altra pagina per la creazione dell'articolo
    };

    document.body.appendChild(articoloButton); // Aggiunge il bottone al body della pagina
});
