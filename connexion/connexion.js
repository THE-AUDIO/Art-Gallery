window.addEventListener('DOMContentLoaded', () => {
  btn = document.getElementById('btn');
  // Fonction pour valider l'email
  async function validateEmail(email) {
    const userName = document.getElementById('Email').value;
    const password = document.getElementById('password').value;
    const apiUrl = 'http://localhost:3000/auth/login';
      // Envoyer une requête POST à l'API avec l'adresse email
       fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          password,

        }),
        // credentials:'include',
      })
      .then(response => response.json())
      .then((response) => {
        if (response) {
          const token = response;
          console.log(token);
          localStorage.setItem('token', token);
        } else {
          // Gérer les erreurs ou les réponses inattendues
          console.error('Invalid response:', response);
        }
      })
      
      .then(data => {
        // Redirect to profile page
        window.location.href = "../front-end/profil/profil.html";
      })

      // if (data.isValid) {
      //   console.log('L\'adresse email est valide.');
      // } else {
      //   console.log('L\'adresse email est invalide.');
      // }
      .catch((error)=>{
        console.error('Erreur lors de la validation de l\'user:', error);
      })
    }
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      validateEmail()
    });
  }
)