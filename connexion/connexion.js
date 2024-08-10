window.addEventListener('DOMContentLoaded', () => {
  btn = document.getElementById('btn');
  // Fonction pour valider l'email
  async function validateEmail(email) {
    const userName = document.getElementById('Email').value;
    const password = document.getElementById('password').value;
    console.log(userName, password);
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
      
      .then(data => {
        console.log(data);
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