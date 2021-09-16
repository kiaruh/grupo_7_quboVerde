window.addEventListener('load', function(){
    let form = document.querySelector('.form-login')
    let mensaje = document.querySelector('.mensaje')
    let email = form.email
    let danger = document.querySelector('.text-danger')


    email.addEventListener('input', validateEmail, false);
    email.addEventListener('blur', validateEmail, false);

    let regexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        validateEmail() 
    })

    function validateEmail(e) {
        if (!email.value) {
            danger.innerHTML = ' '
            mensaje.innerHTML = 'Escribe tu Email'
        } else if (!regexEmail.test(email.value)) {
            danger.innerHTML = ' '
            mensaje.innerHTML = 'El formano no es del tipo email'
        } else {
            mensaje.innerHTML = ' '
            form.addEventListener('submit', () => form.submit())
        }
    }

})