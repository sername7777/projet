<?php
// Connexion à la base de données
$mysqli = new mysqli("localhost", "root", "", "memory_duel");

// Vérification de la connexion
if ($mysqli->connect_error) {
    die("Échec de la connexion: " . $mysqli->connect_error);
}

// Ajouter un nouveau joueur
function addPlayer($username) {
    global $mysqli;
    $stmt = $mysqli->prepare("INSERT INTO users (username) VALUES (?)");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->close();
}

// Mettre à jour le score du joueur
function updateScore($playerId, $score) {
    global $mysqli;
    $stmt = $mysqli->prepare("UPDATE users SET score = ? WHERE id = ?");
    $stmt->bind_param("ii", $score, $playerId);
    $stmt->execute();
    $stmt->close();
}

// Récupérer le meilleur score
function getHighScores() {
    global $mysqli;
    $result = $mysqli->query("SELECT * FROM users ORDER BY score DESC LIMIT 10");
    $highScores = [];
    while ($row = $result->fetch_assoc()) {
        $highScores[] = $row;
    }
    return $highScores;
}
?>
