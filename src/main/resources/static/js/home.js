document.addEventListener("DOMContentLoaded", function() {


const loginModal = document.querySelector('#login-modal');
const openLogin = document.querySelector('#open-login');
const closeLogin = document.querySelector('#close-login');

openLogin.addEventListener('click',()=>{
    loginModal.showModal();
})
closeLogin.addEventListener('click',()=>{
    loginModal.close();
})

const registerModal = document.querySelector('#register-modal');
const openRegister = document.querySelector('#open-register');
const closeRegister = document.querySelector('#close-register');

openRegister.addEventListener('click',()=>{
    registerModal.showModal();
})
closeRegister.addEventListener('click',()=>{
    registerModal.close();
})

    const contactModal = document.querySelector('#contact-modal');
    const openContact = document.querySelector('#open-contact');
    const closeContact = document.querySelector('#close-contact');

    openContact.addEventListener('click', ()=>{
        contactModal.showModal();
    })
    closeContact.addEventListener('click', ()=>{
        contactModal.close();
    })
});
