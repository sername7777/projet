// Sélection des éléments
const startButton = document.getElementById("start-button");
const startMenu = document.getElementById("start-menu");
const browserIcon = document.getElementById("browser-icon");
const browserWindow = document.getElementById("browser-window");
const closeButton = document.querySelector("#browser-window .window-controls .close");
const minimizeButton = document.querySelector("#browser-window .window-controls .minimize");
const maximizeButton = document.querySelector("#browser-window .window-controls .maximize");

// Afficher / cacher le menu démarrer
startButton.addEventListener("click", () => {
    const isVisible = startMenu.style.display === "block";
    if (isVisible) {
        startMenu.classList.remove("show");
    } else {
        startMenu.classList.add("show");
    }
});


// Mise à jour de l'heure et de la date
function updateClock() {
    const clock = document.getElementById("clock");
    const date = document.getElementById("date");
    const now = new Date();

    // Format de l'heure
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    clock.textContent = `${hours}:${minutes}`;

    // Format de la date
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();
    date.textContent = `${day}/${month}/${year}`;
}

setInterval(updateClock, 1000);
updateClock();


// Ouvrir / fermer la fenêtre du navigateur
browserIcon.addEventListener("click", () => {
    const isVisible = browserWindow.style.display === "block";
    if (isVisible) {
        browserWindow.style.display = "none";
    } else {
        browserWindow.style.display = "flex";
    }
});

// Fonction de fermeture de la fenêtre
closeButton.addEventListener("click", () => {
    browserWindow.style.display = "none";
});

// Fonction de réduction de la fenêtre
minimizeButton.addEventListener("click", () => {
    browserWindow.style.display = "none";  // Cache la fenêtre (simulation de la réduction)
});


// Fonction de maximisation de la fenêtre
maximizeButton.addEventListener("click", () => {
    const isMaximized = browserWindow.style.width === "100vw" && browserWindow.style.height === "100vh";

    if (isMaximized) {
        // Rétablir la taille normale de la fenêtre
        browserWindow.style.width = "800px";
        browserWindow.style.height = "600px";
        browserWindow.style.top = "50px";
        browserWindow.style.left = "50px";
    } else {
        // Maximiser la fenêtre
        browserWindow.style.width = "100vw";
        browserWindow.style.height = "100vh";
        browserWindow.style.top = "0";
        browserWindow.style.left = "0";
    }

    // Ajout d'une condition pour s'assurer que la fenêtre ne dépasse pas
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Ajuster la taille pour ne pas dépasser la fenêtre
    browserWindow.style.width = `${Math.min(windowWidth, 100)}vw`;
    browserWindow.style.height = `${Math.min(windowHeight, 100)}vh`;
});

// Charger les pages faux
function loadFakePage(page) {
    alert(`Chargement de ${page}`);
}

// Fonction de déplacement de la fenêtre
let isDragging = false;
let offsetX, offsetY;

const browserHeader = document.querySelector(".browser-header");

browserHeader.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - browserWindow.offsetLeft;
    offsetY = e.clientY - browserWindow.offsetTop;
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Empêcher la fenêtre de dépasser à gauche
        if (newX < 0) {
            newX = 0;
        }

        // Empêcher la fenêtre de dépasser à droite (largeur de l'écran - largeur de la fenêtre)
        if (newX + browserWindow.offsetWidth > window.innerWidth) {
            newX = window.innerWidth - browserWindow.offsetWidth;
        }

        // Empêcher la fenêtre de dépasser en haut
        if (newY < 0) {
            newY = 0;
        }

        // Empêcher la fenêtre de dépasser sous la barre des tâches (hauteur de l'écran - hauteur de la fenêtre - hauteur de la barre des tâches)
        const taskbarHeight = document.getElementById("taskbar").offsetHeight;
        if (newY + browserWindow.offsetHeight > window.innerHeight - taskbarHeight) {
            newY = window.innerHeight - taskbarHeight - browserWindow.offsetHeight;
        }

        // Mettre à jour la position de la fenêtre
        browserWindow.style.left = `${newX}px`;
        browserWindow.style.top = `${newY}px`;
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

// Redimensionner la fenêtre lorsque l'utilisateur utilise les boutons de redimensionnement
closeButton.addEventListener("click", () => {
    browserWindow.style.display = "none"; // Fermer la fenêtre
});

maximizeButton.addEventListener("click", () => {
    // Maximiser la fenêtre
    browserWindow.style.width = "100vw";
    browserWindow.style.height = "100vh";
    browserWindow.style.top = "0";
    browserWindow.style.left = "0";
});

minimizeButton.addEventListener("click", () => {
    // Réduire la fenêtre
    browserWindow.style.width = "800px";
    browserWindow.style.height = "600px";
    browserWindow.style.top = "50px";
    browserWindow.style.left = "50px";
});


// Menu contextuel
const contextMenu = document.getElementById("context-menu");
const body = document.querySelector("body");

// Afficher le menu contextuel au clic droit
body.addEventListener("contextmenu", (event) => {
    event.preventDefault(); // Empêcher le menu contextuel par défaut du navigateur

    // Positionner le menu contextuel selon la position du clic
    contextMenu.style.left = `${event.pageX}px`;
    contextMenu.style.top = `${event.pageY}px`;

    // Afficher le menu contextuel
    contextMenu.style.display = "block";
});

// Fermer le menu contextuel si on clique ailleurs
body.addEventListener("click", () => {
    contextMenu.style.display = "none";
});


// Redimensionnement automatique de la fenêtre du navigateur
window.addEventListener("resize", () => {
    const browserWindow = document.getElementById("browser-window");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    browserWindow.style.width = `${Math.min(windowWidth - 100, 800)}px`; // Limite la taille de la fenêtre à 800px de large
    browserWindow.style.height = `${Math.min(windowHeight - 100, 600)}px`; // Limite la taille de la fenêtre à 600px de haut
});

function loadFakePage(page) {
    if (page === 'Drive') {
        // Redirection vers project.html
        window.location.href = './../src/index.html';
    }
    // Ajoute d'autres conditions ici pour d'autres pages si nécessaire
}

let zIndexCounter = 1000;
browserWindow.addEventListener("mousedown", () => {
    zIndexCounter++;
    browserWindow.style.zIndex = zIndexCounter;
});

function toggleWindowSize(element, isMaximized) {
    if (isMaximized) {
        element.style = "width: 100vw; height: 100vh; top: 0; left: 0;";
    } else {
        element.style = "width: 800px; height: 600px; top: 50px; left: 50px;";
    }
}

// Fermer le menu démarrer si on clique en dehors
document.addEventListener("click", (event) => {
    const isClickInsideMenu = startMenu.contains(event.target) || startButton.contains(event.target);

    if (!isClickInsideMenu) {
        startMenu.classList.remove("show");
    }
});
const gdBuddyApp = document.querySelector(".open-browser");

gdBuddyApp.addEventListener("click", () => {
    // Vérifier si la fenêtre du navigateur est déjà visible
    const isVisible = browserWindow.style.display === "flex";
    if (isVisible) {
        browserWindow.style.display = "none";  // Fermer la fenêtre si elle est déjà ouverte
    } else {
        browserWindow.style.display = "flex";  // Ouvrir la fenêtre du navigateur
    }
});

function loadContactPage() {
    // Charger dynamiquement le fichier CSS pour la page de contact
    const head = document.querySelector('head');
    let contactStyle = document.querySelector('link[data-page="contact"]');
    if (!contactStyle) {
        contactStyle = document.createElement('link');
        contactStyle.rel = 'stylesheet';
        contactStyle.href = '/src/styles/contact.css'; // Assurez-vous que ce chemin est correct
        contactStyle.setAttribute('data-page', 'contact');
        head.appendChild(contactStyle);
    }

    // Insérer le contenu de la page de contact
    const browserContent = document.querySelector('.browser-content');
    browserContent.innerHTML = `
        <section class="max-w-4xl mx-auto p-8 py-16 bg-white shadow-xl rounded-lg">
            <h2 class="text-3xl font-semibold text-center text-gray-800 mb-8">Contactez-moi</h2>
            
            <form id="contactForm" action="https://formspree.io/f/xdkozrld" method="POST" class="space-y-6">
                <div>
                    <label for="name" class="block text-gray-600 font-semibold">Nom</label>
                    <input type="text" id="name" name="name" class="form-input" required>
                </div>

                <div>
                    <label for="email" class="block text-gray-600 font-semibold">Email</label>
                    <input type="email" id="email" name="email" class="form-input" required>
                </div>

                <div>
                    <label for="message" class="block text-gray-600 font-semibold">Message</label>
                    <textarea id="message" name="message" rows="6" class="form-input" required></textarea>
                </div>

                <div class="flex justify-center">
                    <button type="submit" class="form-button">Envoyer</button>
                </div>
            </form>
        </section>
    `;

    // Ajouter un gestionnaire d'événement pour le formulaire
    const contactForm = document.querySelector('#contactForm');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Empêche l'envoi par défaut pour exécuter d'autres actions

        // Envoi des données au serveur (Formspree)
        const formData = new FormData(contactForm);
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            },
        })
        .then((response) => {
            if (response.ok) {
                // Réinitialiser les champs du formulaire
                contactForm.reset();

                // Afficher un message de confirmation
                alert('Votre message a été envoyé avec succès !');
            } else {
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        })
        .catch(() => {
            alert('Impossible d’envoyer le message. Veuillez vérifier votre connexion.');
        });
    });

    // Mettre à jour l'URL dans la barre d'adresse sans recharger la page
    window.history.pushState({ page: 'contact' }, 'Contact', '/contact');

    // Mettre à jour la barre d'URL pour afficher le chemin correct
    const urlBar = document.querySelector('.url-bar input');
    urlBar.value = 'www.GDbuddy.com/contact';
}

