
window.addEventListener('DOMContentLoaded',()=>{
    btn = document.getElementById('btn');
// Fonction pour valider l'email
async function validateEmail(email) {
    const userName= document.getElementById('Email').value;
    const password= document.getElementById('password').value;
    console.log(userName, password);
    const apiUrl='http://localhost:auth/login';
  try {
    // Envoyer une requête POST à l'API avec l'adresse email
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({ 
        userName,
        password,

       })
    });

    // Vérifier si la réponse est correcte
    if (!response.ok) {
      throw new Error('Erreur de réseau');
    }

    // Convertir la réponse en JSON
    const data = await response.json();

    // Vérifier la réponse de l'API
    if (data.isValid) {
      console.log('L\'adresse email est valide.');
    } else {
      console.log('L\'adresse email est invalide.');
    }
  } catch (error) {
    console.error('Erreur lors de la validation de l\'email:', error);
  }
}
btn.addEventListener("click", (e)=>{
    e.preventDefault()
    validateEmail()
});
})