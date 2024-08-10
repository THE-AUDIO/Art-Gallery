document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById('btn');
    btn.addEventListener('click', function() {
        let userName = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let email = document.getElementById("email").value;
        const   apiUrl = 'http://localhost:3000/auth/create'
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
            return response.json(); // Correctly parse the JSON response
        })
        .then(data => {
            console.log(data);
            let jsonData = JSON.stringify(data);

            // Assuming 'id' is the relevant piece of data to store
            localStorage.setItem('user', jsonData); 
            // Redirect to profile page
            window.location.href = "../profil/profil.html";
        })
        .catch((error) => console.error('Erreur:', error));
    });
});
