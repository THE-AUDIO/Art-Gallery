// on attend le chargement de la page 
document.addEventListener("DOMContentLoaded", function() {
    // récupération du bouton creer
    const btn = document.getElementById('btn');
    // écouteur d'évènement lors du click sur le bouton
    btn.addEventListener('click', function() {
        // récupération des données du formulaire
        let userName = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let email = document.getElementById("email").value;
        // url de l'api qui va recevoir la requête de création du compte
        const   apiUrl = 'http://localhost:3000/auth/create'
        // envoie de la requête POST à l'api avec les données du formulaire
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName,
                password,
                email,
            }),
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json(); // parse le response en json
        })
        .then(() => {
            // Redirect to profile page
            window.location.href = "../../connexion/connexion.html";
        })
        // gestion des erreurs
        .catch((error) => console.error('Erreur:', error));
    });
});
