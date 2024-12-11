const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const app = express();

// Configurer express-session pour gérer les sessions utilisateur
app.use(session({
    secret: 'votre_clé_secrète', // Remplacez par une clé secrète pour sécuriser les sessions
    resave: false,
    saveUninitialized: true
}));

// Middleware pour parser les données envoyées par le formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (CSS, JS, images)
app.use('/src/styles', express.static(path.join(__dirname, 'src/styles')));
app.use('/src/js', express.static(path.join(__dirname, 'src/js')));
app.use('/src/assets', express.static(path.join(__dirname, 'src/assets')));
app.use('/src/projects', express.static(path.join(__dirname, 'src/pages')));

// Fonction pour récupérer tous les projets dans les sous-dossiers de 'src/pages'
function getAllProjects(dirPath) {
    let results = [];
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            const projectIndexPath = path.join(fullPath, 'index.html');
            if (fs.existsSync(projectIndexPath)) {
                results.push({
                    name: file,
                    path: file,
                });
            }
        }
    });
    console.log(`Projets récupérés: ${results.length} projets`);
    return results;
}

// Route pour récupérer tous les projets
app.get('/src/api/projects', (req, res) => {
    const projects = getAllProjects(path.join(__dirname, 'src/pages'));
    console.log('Liste des projets envoyée');
    res.json(projects); // Retourne un tableau d'objets de projets avec 'name' et 'path'
});

// Page de connexion
app.get('/login', (req, res) => {
    if (req.session.pseudo) {
        console.log(`Utilisateur déjà connecté : ${req.session.pseudo}`);
        // Si l'utilisateur est déjà connecté, rediriger vers la page principale
        res.redirect('/');
    } else {
        console.log('Utilisateur non connecté, affichage de la page de connexion');
        // Si l'utilisateur n'est pas connecté, afficher la page de connexion
        res.sendFile(path.join(__dirname, 'src/login.html'));
    }
});

// Route principale pour le bureau
// Route principale pour le bureau
app.get('/', (req, res) => {
    if (req.session.pseudo) {
        console.log(`Utilisateur connecté : ${req.session.pseudo}, accès à la page d'accueil`);
        // Si l'utilisateur est connecté, afficher la page d'accueil
        res.sendFile(path.join(__dirname, 'src/index.html'));
    } else {
        console.log('Utilisateur non connecté, redirection vers la page de connexion');
        // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
        res.redirect('/login');
    }
});


// Exemple de route pour traiter la connexion (ici, on simule juste un pseudo)
app.post('/login', (req, res) => {
    const { pseudo } = req.body;
    if (pseudo) {
        // Si le pseudo existe, stocker dans la session et rediriger vers le bureau
        req.session.pseudo = pseudo;
        console.log(`Utilisateur connecté : ${pseudo}`);
        res.redirect('/');
    } else {
        // Sinon, renvoyer un message d'erreur (ou rediriger vers la page de connexion)
        console.log('Erreur : Pseudo manquant');
        res.status(400).send('Pseudo manquant');
    }
});

// Gestion des pages de projets
app.get('/projects/:projectName', (req, res) => {
    const projectPath = path.join(__dirname, 'src/pages', req.params.projectName, 'index.html');
    if (fs.existsSync(projectPath)) {
        console.log(`Page du projet demandée : ${req.params.projectName}`);
        res.sendFile(projectPath);
    } else {
        console.log(`Erreur 404 : Projet non trouvé : ${req.params.projectName}`);
        res.status(404).sendFile(path.join(__dirname, 'src/404.html')); // Si le projet n'existe pas, renvoie 404.html
    }
});

// Gestion des autres routes non définies
app.use((req, res) => {
    console.log('Erreur 404 : Route non définie');
    res.status(404).sendFile(path.join(__dirname, 'src/404.html')); // Renvoie la page 404.html pour toute autre route
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error('Erreur interne :', err.stack);
    res.status(500).send('Quelque chose a mal tourné !');
});

const port = 3030;
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
