const words = [
  "ordinateur", "javascript", "developpeur",
  "logiciel", "internet", "programmation",
  "algorithme", "technologie", "interface",
  "navigateurs", "processeur", "reseau",
  "systeme", "developpement", "cloud",
  "serveur", "client", "utilisateur",
  "machine", "langage", "code",
  "donnees", "robotique", "intelligence",
  "artificielle", "realite", "augmentee",
  "cryptographie", "base", "donnees",
  "virtualisation", "fonctionnalite", "optimisation",
  "performance", "informatique", "materiel",
  "numerique", "cybersecurite", "analyse",
  "statistique", "architecture", "integration",
  "test", "maintenance", "production",
  "framework", "outil", "bibliotheque",
  "apprentissage", "modele", "reseau",
  "neuronal", "projet", "collaboration",
  "gestion", "equipe", "methodologie",
  "scrum", "agile", "kubernetes",
  "docker", "container", "microservices",
  "pipeline", "abstraction", "adaptation",
  "algorithme", "application", "array",
  "asynchrone", "attribut", "autonomie",
  "backend", "balise", "binary",
  "bootstrap", "bug", "cache",
  "circuit", "cli", "cloud",
  "client-server", "compiler", "condition",
  "configuration", "connecteur", "console",
  "conteneur", "contract", "coroutine",
  "couplage", "curseur", "decodage",
  "debogage", "direct", "docker",
  "echantillon", "environnement", "entrees-sorties",
  "equilibrage", "exploitabilite", "expression",
  "extraction", "fichier", "fonction",
  "framework", "front-end", "gestionnaire",
  "graphiques", "header", "hebergement",
  "HTML", "hypertexte", "index",
  "initialisation", "interface", "integration",
  "internet", "interprete", "jeu",
  "jQuery", "JSON", "JVM",
  "laisse", "langage", "lien",
  "liste", "modele", "module",
  "moteur", "navigation", "nettoyage",
  "node", "objet", "optimisation",
  "orchestration", "organigramme", "paralleisme",
  "passage", "performance", "pile",
  "pluggable", "programme", "protocole",
  "recherche", "reseau", "representation",
  "ressource", "resultat", "routage",
  "systeme", "serveur", "services",
  "sharding", "socket", "source",
  "template", "type", "upload",
  "validation", "virtualisation", "vue",
  "binaire", "algorithmique", "serveur-web",
  "cloud-computing", "database", "frameworks",
  "machine-learning", "deep-learning", "containers",
  "api", "nodejs", "javascript",
  "typescript", "html5", "css3",
  "react", "vuejs", "angular",
  "mongodb", "express", "mongodb",
  "sql", "nosql", "cloud-native"
];


// Générer un mot aléatoire
function generateWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Variables globales
let selectedWord = generateWord();
let displayedWord = Array(selectedWord.length).fill("_");
let errors = 0;
const maxErrors = 8;

// Références DOM
const wordEl = document.getElementById("word");
const lettersEl = document.getElementById("letters");
const errorsEl = document.getElementById("errors");
const messageEl = document.getElementById("message");
const resetBtn = document.getElementById("reset");
const canvas = document.getElementById("hangman");
const ctx = canvas.getContext("2d");

// Mettre à jour le mot affiché
function updateDisplayedWord() {
  wordEl.textContent = displayedWord.join(" ");
}

// Générer les boutons de lettres
function generateLetterButtons() {
  lettersEl.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => handleGuess(letter));
    lettersEl.appendChild(button);
  }
}

const parts = [
  // Base (support horizontal du pendu)
  () => {
    ctx.fillStyle = "#000"; 
    ctx.fillRect(50, 380, 200, 10); // Base
  },

  // Poteau vertical (support principal du pendu)
  () => {
    ctx.fillStyle = "#000"; 
    ctx.fillRect(130, 20, 10, 360); // Poteau vertical
  },

  // Poteau horizontal (partie supérieure où la corde est attachée)
  () => {
    ctx.fillStyle = "#000"; 
    ctx.fillRect(130, 20, 150, 10); // Poteau horizontal
  },

  // Corde (la ligne qui relie le poteau à la tête du pendu)
  () => {
    ctx.fillStyle = "#000"; 
    ctx.fillRect(270, 20, 10, 60);  // Corde
  },

  // Tête (cercle représentant la tête du pendu)
  () => {
    ctx.beginPath();
    ctx.arc(275, 120, 30, 0, Math.PI * 2);  // Tête
    ctx.fillStyle = "#f2c9ac"; // Couleur de la peau de la tête
    ctx.fill();
    ctx.stroke();
  },

  // Corps (rectangle représentant le torse du pendu)
  () => {
    ctx.fillStyle = "#000"; 
    ctx.fillRect(270, 150, 10, 120); // Corps
  },

  // Bras gauche (rectangle pour le bras gauche du pendu)
  () => {
    ctx.fillStyle = "#000"; 
    ctx.fillRect(230, 180, 20, 60);  // Bras gauche
  },

  // Bras droit (rectangle pour le bras droit du pendu)
  () => {
    ctx.fillStyle = "#000"; 
    ctx.fillRect(290, 180, 20, 60);  // Bras droit
  },

  // Jambe gauche (rectangle pour la jambe gauche)
  () => {
    ctx.fillStyle = "#000"; 
    ctx.fillRect(260, 270, 20, 60);  // Jambe gauche
  },

  // Jambe droite (rectangle pour la jambe droite)
  () => {
    ctx.fillStyle = "#000"; 
    ctx.fillRect(280, 270, 20, 60);  // Jambe droite
  }
];


  
// Dessiner la partie en fonction des erreurs
function drawHangman() {
  if (errors <= maxErrors) {
    ctx.beginPath();
    parts[errors - 1]();  // Dessiner la partie en fonction du nombre d'erreurs
    ctx.stroke();
  }
}

// Gérer une lettre devinée
function handleGuess(letter) {
  const buttons = lettersEl.querySelectorAll("button");
  buttons.forEach((button) => {
    if (button.textContent === letter) {
      button.disabled = true;
    }
  });

  if (selectedWord.includes(letter.toLowerCase())) {
    selectedWord.split("").forEach((char, index) => {
      if (char === letter.toLowerCase()) {
        displayedWord[index] = letter;
      }
    });
    updateDisplayedWord();
    if (!displayedWord.includes("_")) {
      messageEl.textContent = "Félicitations, vous avez gagné !";
      messageEl.classList.add("win");
      disableAllButtons();
      confetti(); // Confettis de victoire
   }
   
  } else {
    errors++;
    errorsEl.textContent = errors;
    drawHangman();
    if (errors >= maxErrors) {
      messageEl.textContent = `Vous avez perdu ! Le mot était "${selectedWord}".`;
      disableAllButtons();
      resetBtn.style.display = "block"; // Afficher le bouton "Réinitialiser" lorsque le joueur a perdu
    }
  }
}


// Désactiver tous les boutons
function disableAllButtons() {
  const buttons = lettersEl.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));
}

// Réinitialiser le jeu
function resetGame() {
  errors = 0;
  selectedWord = generateWord();
  displayedWord = Array(selectedWord.length).fill("_");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateDisplayedWord();
  generateLetterButtons();
  errorsEl.textContent = errors;
  messageEl.textContent = "";
  resetBtn.style.display = "none";  // Cacher le bouton "Réinitialiser"
}

// Initialisation
updateDisplayedWord();
generateLetterButtons();
resetBtn.addEventListener("click", resetGame);
