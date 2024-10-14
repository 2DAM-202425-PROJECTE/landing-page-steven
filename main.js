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

// Funció per detectar mode incògnit
function detectIncognitoMode(callback) {
    const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
    if (!fs) {
        callback(false); // Si no és incògnit
    } else {
        fs(window.TEMPORARY, 100, () => callback(false), () => callback(true)); // Si és incògnit
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cookieConsent = document.getElementById('cookie-consent');
    const preferencesModal = document.getElementById('preferences-modal');
    const acceptButton = document.getElementById('accept-cookies');
    const rejectButton = document.getElementById('reject-cookies');
    const closeButton = document.getElementById('close-cookies');
    const preferencesButton = document.getElementById('preferences-cookies');
    const closePreferencesButton = document.getElementById('close-preferences');
    const savePreferencesButton = document.getElementById('save-preferences');

    // Funció per mostrar el consentiment de cookies
    const showCookieConsent = () => {
        cookieConsent.classList.remove('hidden');
    };

    // Comprovar consentiment de cookies
    const checkCookieConsent = () => {
        const cookieAccepted = localStorage.getItem('cookieAccepted');
        detectIncognitoMode(isIncognito => {
            if (isIncognito || !cookieAccepted) {
                showCookieConsent(); // Sempre mostra el consentiment si és incògnit
            }
        });
    };

    checkCookieConsent();

    // Acceptar cookies
    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', 'true');
        console.log("Cookies accepted");
        cookieConsent.classList.add('hidden');
    });

    // Rebutjar cookies
    rejectButton.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', 'false');
        console.log("Cookies rejected");
        cookieConsent.classList.add('hidden');
    });

    // Tancar modal de cookies
    closeButton.addEventListener('click', () => {
        cookieConsent.classList.add('hidden');
    });

    // Obrir modal de preferències
    preferencesButton.addEventListener('click', () => {
        cookieConsent.classList.add('hidden');
        preferencesModal.classList.remove('hidden');
    });

    // Tancar modal de preferències
    closePreferencesButton.addEventListener('click', () => {
        preferencesModal.classList.add('hidden');
    });

    // Desar preferències
    savePreferencesButton.addEventListener('click', () => {
        const trackingCookiesAccepted = document.getElementById('tracking-cookies').checked;
        const functionalCookiesAccepted = document.getElementById('functional-cookies').checked;

        // Guardem les preferències
        localStorage.setItem('trackingCookies', trackingCookiesAccepted);
        localStorage.setItem('functionalCookies', functionalCookiesAccepted);

        console.log("Preferences saved:", {
            trackingCookies: trackingCookiesAccepted,
            functionalCookies: functionalCookiesAccepted,
        });

        // Acceptem les preferències i tancar el modal
        localStorage.setItem('cookieAccepted', 'true');
        preferencesModal.classList.add('hidden');
    });
});