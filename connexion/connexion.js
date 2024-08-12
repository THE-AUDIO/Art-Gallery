window.addEventListener('DOMContentLoaded', () => {
  btn = document.getElementById('btn');
  const toast = document.getElementById('toast-warning');
  // Fonction pour valider l'email
  async function validateEmail(email) {
    const userName = document.getElementById('Email').value;
    const password = document.getElementById('password').value;
    const apiUrl = 'http://localhost:3000/auth/login';
      // Envoyer une requête POST à l'API avec l'adresse email
    const response =  await  fetch(apiUrl, {
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
      .catch((error) =>{
          alert('mon erreur: ' + error.message)
      })
      if(!response.ok){
        toast.classList.add('opac')
        setTimeout(() => {
          toast.classList.remove('opac') 
        }, 2000);
      } else{
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.href = "../front-end/profil/profil.html";
      }
      // .then(response => response.json())
      // .then((response) => {
      //   if (response) {
      //     const token = response.token;
      //     console.log(response);
      //     // localStorage.setItem('token', token);
      //     // window.location.href = "../front-end/profil/profil.html";

      //   } else {
      //     // Gérer les erreurs ou les réponses inattendues
      //     console.error('Invalid response:', response);
      //   }
      // })
      

      // if (data.isValid) {
      //   console.log('L\'adresse email est valide.');
      // } else {
      //   console.log('L\'adresse email est invalide.');
      // }
      // .catch((error)=>{
      //   console.error('Erreur lors de la validation de l\'user:', error);
      // })
    }
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      validateEmail()
    });
  }
)