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
    emailjs.init("OBqXgrR0fs5ostHMu"); // Substitueix amb el teu USER_ID
})();

// Funció per enviar el formulari
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita l'enviament per defecte del formulari

    // Recollir les dades del formulari
    const userName = this.user_name.value; // Nom
    const userEmail = this.user_email.value; // Correu electrònic
    const message = this.message.value; // Missatge

    // Enviar el formulari amb les dades personalitzades
    emailjs.send("service_bfmkhjk", "template_k0siyva", {
        to_name: "Mr. Romero", // Especifica aquí el nom del destinatari
        from_name: userName, // Nom de qui envia
        user_email: userEmail, // Correu electrònic de qui envia
        message: message // Missatge enviat
    })
        .then(function(response) {
            alert("Missatge enviat amb èxit!");
            console.log("Success!", response.status, response.text);
        }, function(error) {
            alert("Error al enviar el missatge: " + JSON.stringify(error));
            console.error("Error:", error);
        });
});

// Comprovar si les cookies ja han estat acceptades
if (localStorage.getItem("cookiesAccepted") !== "true") {
    document.getElementById("cookieBanner").classList.remove("hidden"); // Mostrar l'avís
}

// Gestió del botó d'acceptació
document.getElementById("acceptCookies").addEventListener("click", function() {
    localStorage.setItem("cookiesAccepted", "true"); // Guardar l'acceptació en localStorage
    document.getElementById("cookieBanner").classList.add("hidden"); // Amagar l'avís
});

// Funció per gestionar les opcions de cookies
function toggleCookies(checkbox) {
    if (checkbox.checked) {
        checkbox.nextElementSibling.style.backgroundColor = "#34D399"; // Verd
    } else {
        checkbox.nextElementSibling.style.backgroundColor = "#gray"; // Grís
    }
}
