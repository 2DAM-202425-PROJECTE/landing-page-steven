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
