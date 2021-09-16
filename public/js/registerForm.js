window.addEventListener('load', function (){
    let form = document.querySelector('form')
    let user = form.user
    let date = form.date
    let name = form.name
    let lastname = form.lastname
    let email = form.email
    
    let danger = document.querySelector('.text-danger')
    let msgUser = document.querySelector('.msg-user')
    let msgDate = document.querySelector('.msg-user')
    let msgName = document.querySelector('.msg-user')
    let msgLastname = document.querySelector('.msg-user')
    let msgEmail = document.querySelector('.msg-user')

    email.addEventListener('input', validateEmail, false)
    email.addEventListener('blur', validateEmail, false)

    let regexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        validateEmail() 
    })

    function validateEmail(e) {
        if (!email.value) {
            msgEmail.innerHTML = 'Escribe tu Email'
        } else if (!regexEmail.test(email.value)) {
            danger.innerHTML = ' '
            msgEmail.innerHTML = 'El formano no es del tipo email'
        } else {
            msgEmail.innerHTML = ' '
            form.addEventListener('submit', () => form.submit())
        }
    }




})