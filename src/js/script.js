// script.js

// Récupère les projets depuis l'API
fetch("/src/api/projects")
  .then(response => response.json())
  .then(projets => {
    const projectsList = document.getElementById("projects-list");

    projets.forEach(projet => {
      // Créer la carte du projet
      const card = document.createElement("div");
      card.classList.add("project-card");

      // Ajouter l'image de fond de la carte
      const image = document.createElement("img");
      image.src = `/src/projects/${projet.path}/image.jpg`; // Chemin de l'image
      image.alt = projet.name; // Texte alternatif

      // Créer le titre du projet, remplacer les tirets par des espaces
      const title = document.createElement("h3");
      title.textContent = projet.name.replace(/-/g, ' '); // Remplace tous les tirets par des espaces

      title.style.fontSize = "0.7rem"; // Ajuste la taille de la police

      // Ajouter l'image et le titre dans la carte
      card.appendChild(image);
      card.appendChild(title);

      // Ajouter un événement de clic pour rediriger vers le projet
      card.addEventListener('click', function() {
        window.location.href = `/src/projects/${projet.path}/index.html`; // Redirige vers la page du projet
      });

      // Ajouter la carte dans la liste des projets
      projectsList.appendChild(card);
    });
  })
  .catch(error => console.error("Erreur lors de la récupération des projets:", error));


function loadFakePage(page) {
  // Masque tout le contenu existant et affiche la page demandée
  document.querySelectorAll('.menu-item').forEach(function (item) {
    item.style.display = 'none';
  });

  alert('Vous avez sélectionné ' + page);
}


