
<<<<<<< HEAD
// await the document load  
document.addEventListener("DOMContentLoaded", function () {
    // declaration of the html element
    const btn_up = document.getElementById('btn-float')
    let container_profil = document.getElementById('profil-container');
    let identifiant = document.getElementById('identifiant')
    let selection = document.getElementById('selection')
    let post = document.getElementById('post')
    const saveBtn = document.getElementById('save-btn')
    const closeBtn = document.getElementById('close')
    const showEditProfilBtn = document.getElementById('btn-edit-profil')
    let contentEditProfil = document.querySelector('.edit-profil');
    let btnAddPost = document.getElementById('section-btn-add-post');
    let addPostSection = document.getElementById('add-post');
    let btnSavePost = document.getElementById('btn-add-post');
    let btnCloseAddPost = document.getElementById('close-add-post')
    let positionInitial = 20;

// all functions is here

    // this function is used to move up the container
=======

document.addEventListener("DOMContentLoaded", function () {
    let container_profil = document.getElementById('profil-container');
    let btn = document.getElementById('up')
    let identifiant = document.getElementById('identifiant')
    let selection = document.getElementById('selection')
    let post = document.getElementById('post')
    let positionInitial = 200;

>>>>>>> 811a925 (scroll animation)
    function toggleClass() {
        container_profil.classList.toggle('up-container')
        identifiant.classList.toggle('up-container')
        selection.classList.toggle('up-container')
        post.classList.toggle('up-container')
        post.classList.toggle('up-post');
    }
<<<<<<< HEAD

    function blurSomeDiv(){
        post.style.filter = 'blur(32px)'
        selection.style.filter = 'blur(32px)'
        container_profil.style.filter = 'blur(32px)'
        identifiant.style.filter = 'blur(32px)'
        document.body.style.background='black'

    }

    function unBlurSomeDiv(){
        post.style.filter = 'blur(0)'
        selection.style.filter = 'blur(0)'
        container_profil.style.filter = 'blur(0)'
        identifiant.style.filter = 'blur(0)'
        document.body.style.background='white'
    }
    function hiddenEditProfil() {
        contentEditProfil.style.display = 'none';
        unBlurSomeDiv();
    }

    function hiddenAddPost(){
        addPostSection.classList.add('add-post');
        console.log('hidden add post')
        unBlurSomeDiv()
    }
   const cookies = document.cookies
   console.log(cookies);

// all event is here .......
    btnAddPost.addEventListener('click', ()=>{
        addPostSection.classList.remove('add-post');
        blurSomeDiv();
    })
    btnSavePost.addEventListener('click', hiddenAddPost)
    closeBtn.addEventListener('click', hiddenEditProfil);
    saveBtn.addEventListener('click', hiddenEditProfil);
    btnCloseAddPost.addEventListener('click',hiddenAddPost);
    
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

    btn_up.addEventListener('click', () => {
        console.log(1);
        post.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
=======
    btn.addEventListener('click', toggleClass)
    var states = true;
    post.addEventListener('scroll', () => {
        console.log(post.scrollTop);
        if (post.scrollTop >= positionInitial && states) {
                toggleClass();
                states = false;
        } else if (post.scrollTop  <= positionInitial && !states) {
                states = true;
                toggleClass();
        }
    });
>>>>>>> 811a925 (scroll animation)
})