
window.addEventListener('DOMContentLoaded', async () => {
    const profil = document.getElementById('profil');
    const eltProfil = document.getElementById('elt-profil');
    const container = document.getElementById('container');
    function findOneUser(){
        const apiUrl = 'http://localhost:3000/auth/user'
        const token = localStorage.getItem('token');
            fetch(apiUrl,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer '+ token
                },
            })
           .then(response => response.json())
           .then(data => {
               profil.src = `${data.profilLink}`
           })
    }
    findOneUser();
    async function getAllPost() {
        const apiUrl = 'http://localhost:3000/post/all';
        const token = localStorage.getItem('token');
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const data = await response.json();
        data.forEach(post => {
            container.innerHTML += `
                <div class="post flex justify-end items-center flex-col border-2 rounded-3xl bg-center bg-no-repeat bg-cover relative">
                    <img class="w-full h-full object-cover" src="${post.linkPhoto}" alt="">
                    <div class="absolute z-10 opacity-0 transition container-post android:w-full h-1/4 android:text-xl flex justify-around items-center flex-col text-center p-2 text-white md:text-2xl font-bold md:py-2 android:py-1 shadow-2xl shadow-white">
                        <span class="text-sm">
                            ${post.description}
                        </span>
                        <span class="down flex justify-around items-center flex-row w-1/2">
                            <span class="sr-only postId" id="P-${post.postId}">${post.postId}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="pink" class="bi bi-suit-heart-fill transition active:animate-bounce" viewBox="0 0 16 16">
                                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"/>
                            </svg>
                            <span> ${post.nbLikes} </span>
                        </span>
                    </div>
                </div>
            `;

        });

        // Maintenant que les posts sont ajoutés au DOM, on peut ajouter les écouteurs d'événements
        const allPost = container.querySelectorAll('.post');
        allPost.forEach(element => {
            const btnLike = element.children[1].children[1].children[1];
            const like = element.children[1].children[1].children[2]
          
            const containerLike = element.querySelector('.flex span:last-child');
            
            btnLike.addEventListener('click', async () => {
                const id = element.querySelector('.down span:first-child');
                const postId = parseInt(id.textContent);
                // var containerPostId = document.querySelector(".postId");
                 nbLikes = parseInt(like.textContent);
                // containerLike.textContent='';
                // postId = parseInt(containerPostId.textContent)
                like.textContent =`${nbLikes +1}`;
                btnLike.style.display = 'none';
                const formData = new FormData();
                formData.append('nbLikes', nbLikes);
                formData.append('postId', postId);
                const apiUrl = 'http://localhost:3000/post/like';
                const response =  await  fetch(apiUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nbLikes,
                        postId
                    })
                })
                .catch((error) =>{
                    alert('mon erreur: ' + error.message)
                })

                console.log(response.bodyUsed)
                 
            });
        });
    }

    getAllPost();

    profil.addEventListener('click', () => {
        eltProfil.classList.toggle('none-profil');
    });

    // signOutBtn.addEventListener('click', signOut())
});
