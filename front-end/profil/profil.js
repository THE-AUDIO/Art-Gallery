
// on attend que la page soit chargé
document.addEventListener("DOMContentLoaded", function () {
    // recuperation des element html 
    const btn_up = document.getElementById('btn-float')
    let container_profil = document.getElementById('profil-container');
    let identifiant = document.getElementById('identifiant')
    let selection = document.getElementById('selection')
    var post = document.getElementById('post')
    const saveBtn = document.getElementById('save-btn')
    const closeBtn = document.getElementById('close')
    const showEditProfilBtn = document.getElementById('btn-edit-profil')
    let contentEditProfil = document.querySelector('.edit-profil');
    let btnAddPost = document.getElementById('section-btn-add-post');
    let addPostSection = document.getElementById('add-post');
    let btnSavePost = document.getElementById('btn-add-post');
    let btnCloseAddPost = document.getElementById('close-add-post')
    let username = document.getElementById('username');
    let profilImage = document.getElementById('profil-image');

    let positionInitial = 30;
    function upDateProfil(){
        const fileInput = document.getElementById('file-profil')// fichier
        const apiUrl = 'http://localhost:3000/user/profil'
        fileData = new FormData();
        console.log(fileData)
        fileData.append('file', fileInput.files[0]);// ajouter le fichier dans la formData
        const token = localStorage.getItem('token');
        // envoie de la requête POST à l'api avec la formData
        fetch(apiUrl, {
            method: 'POST',
            body: fileData,
            headers: {
                // ajout de l'information de l'utilisateur dans l'entête du requête
                'Authorization': 'Bearer ' + token,
            },
        })
        .then(response => {
            if(!response.ok){
                throw new Error
            }
           return response.json()
        })
    }
    // Tous les fonction sont ici
    // ajout de nouveau post 
    function addNewPost() {
        // recuperation des element via la formulaire 
        const fileInput = document.getElementById('file')// fichier
        const description = document.getElementById('description')//description du fichier
        formData = new FormData()// instanciation de objet formData 
        formData.append('file', fileInput.files[0]);// ajouter le fichier dans la formData
        formData.append('description', description.value);//ajoute la description dans la formData
        //declaration de l'url qui va reçevoir la requête
        const apiUrl = 'http://localhost:3000/post/newPost';
        // recuperation des informations des l'utilisateur dans la localStorage
        const token = localStorage.getItem('token');
        // envoie de la requête POST à l'api avec la formData
        fetch(apiUrl, {
            method: 'POST',
            body: formData,
            headers: {
                // ajout de l'information de l'utilisateur dans l'entête du requête
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(response => {
                // si la reponse n'est pas bon en retourne l'erreur
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data =  response.json(); // parser le retoure en json
                console.log(data);
            })
    }

    //fonction pour rechercher un utilisateur  qui vien de se connecter
    function findOneUser(){
        // declaration de l'url qui vient de reçevoir la requête 
        const apiUrl = 'http://localhost:3000/auth/user'
        // recuperation du token dans la localStorage 
        //le token contient l'information des utlisateur mais encoder 
        const token = localStorage.getItem('token');
        // envoie de la requête GET à l'api avec l'authorization en entête
        fetch(apiUrl,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer '+ token
                },
            })
           .then(response => response.json())
           .then(data => {
               username.textContent = data.userName;
               profilImage.src = `${data.profilLink}`
               console.log(data);
           })
    }
    // appel du fonction  
    findOneUser();

    
    // une fonction pour monter des section cibler en ajoutant et relevant une classe
    function toggleClass() {
        container_profil.classList.toggle('up-container')
        identifiant.classList.toggle('up-container')
        selection.classList.toggle('up-container')
        post.classList.toggle('up-container')
        post.classList.toggle('up-post');
    }
    // une fonction pour flouter des elements 

    function blurSomeDiv() {
        post.style.filter = 'blur(32px)'
        selection.style.filter = 'blur(32px)'
        container_profil.style.filter = 'blur(32px)'
        identifiant.style.filter = 'blur(32px)'
        document.body.style.background = 'black'

    }
    // une fonction pour deflouter des elements cibler
    function unBlurSomeDiv() {
        post.style.filter = 'blur(0)'
        selection.style.filter = 'blur(0)'
        container_profil.style.filter = 'blur(0)'
        identifiant.style.filter = 'blur(0)'
        document.body.style.background = 'white'
    }
    // une fonction pour masquer la section de modification du profil
    function hiddenEditProfil() {
        contentEditProfil.style.display = 'none';
        unBlurSomeDiv();
    }
    // une fonction pour masquer la section d'ajout de nouveau post
    function hiddenAddPost() {
        addPostSection.classList.add('add-post');
        unBlurSomeDiv()
    }

    // tous les ecoutes des évenements necessaire pour le bon fonction de cette page sont ici

    btnAddPost.addEventListener('click', () => {
        // affichage de nouveau en enlevant la classe add post car cette classe le rend invisible
        addPostSection.classList.remove('add-post');
        // flouter tous les elements html a part la section add post 
        blurSomeDiv();
    })
    btnSavePost.addEventListener('click', () => {
        // ici on appelle fonction d'envoye de requêtes pour sauvegarder dans la base de donné les element les element  dans la formulaire
        addNewPost()
    })
    // pour  masquer des section profil une fois quand on cliquer sur le bouton close
    closeBtn.addEventListener('click', hiddenEditProfil);
    btnCloseAddPost.addEventListener('click', hiddenAddPost);                         
    // pour  masquer des section add post une fois quand on cliquer sur le bouton save
    saveBtn.addEventListener('click', ()=>{
        upDateProfil()
        hiddenEditProfil();
        // si vous souhaitez charger les nouveaux post il suffit de faire un appel à la fonction getAllPost() dans le event.js
    }); 

    // here we make visible a edit profil section
    showEditProfilBtn.addEventListener('click', () => {
        contentEditProfil.style.display = 'flex';
        blurSomeDiv();
    })

    // we listen a scroll event in the div post and call the toogle function
    // if some condition is verified
    var states = true;
    btn_up.style.opacity = '0';
    post.addEventListener('scroll', () => {
        if (post.scrollTop >= positionInitial && states) {
            toggleClass();
            states = false;
            btn_up.style.opacity = '1'
        } else if (post.scrollTop <= positionInitial && !states) {
            states = true;
            toggleClass();
            btn_up.style.opacity = '0'
        }
    });


    // here if we at the post section this function is used to go back to the previous section
   if(btn_up){
    btn_up.addEventListener('click', () => {
        console.log(1);
        post.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
   }

    async function getPostForOneUser(){
        // declaration de l'url qui doit traiter le requête
        const apiUrl = 'http://localhost:3000/post/mypost'
       const reponse = await fetch(apiUrl,{
            method: 'GET',

            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            },
        })
        const data = await  reponse.json()
       data.forEach(element =>{
         post.innerHTML+= `
         <div
         class="post flex justify-end items-center flex-col border-2 rounded-xl relative overflow-hidden">
         <img class="w-full h-full object-cover" src="${element.linkPhoto}" alt="">
         <div class="absolute like android:w-full md:w-1/2 flex justify-around items-center flex-row text-center text-white md:text-2xl font-bold px-5 md:py-2 android:text-sm android:py-1 shadow-2xl">
             <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
             <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"/>
           </svg> 
           <span>${element.nbLikes}</span>
         </div>
     </div>
         `
       })
    };
    getPostForOneUser();
    
})