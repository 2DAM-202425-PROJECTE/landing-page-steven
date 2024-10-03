import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start()

AOS.init({
    duration: 1000, // Duració de l'animació en milisegons
});

document.querySelectorAll('[data-toggle]').forEach(item => {
    item.addEventListener('click', () => {
        const content = item.nextElementSibling; // El següent element (la resposta)
        const icon = item.querySelector('.toggle-icon'); // L'ícona + o -

        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden'); // Mostrar resposta
            icon.textContent = '-'; // Canviar símbol a -
        } else {
            content.classList.add('hidden'); // Ocultar resposta
            icon.textContent = '+'; // Canviar símbol a +
        }
    });
});


(function(){
    emailjs.init("OBqXgrR0fs5ostHMu"); // Substitueix YOUR_USER_ID pel teu User ID d'EmailJS
})();

// Funció per enviar el formulari
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita l'enviament per defecte del formulari

    emailjs.sendForm('service_bfmkhjk', 'template_k0siyva', this)
        .then(function() {
            alert("Missatge enviat amb èxit!");
        }, function(error) {
            alert("Error al enviar el missatge: " + JSON.stringify(error));
        });
});