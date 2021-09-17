window.addEventListener('load', function (){
    
    let form = document.querySelector('.form-register')

    let user = document.querySelector("input[name='user']")
    let name = document.querySelector("input[name='firstname']")
    let lastname = document.querySelector("input[name='lastname']")
    let email = document.querySelector("input[name='email']")
    let password = document.querySelector("input[name='password']")
    
    let msgUser = document.querySelector('.msg-user')
    let msgName = document.querySelector('.msg-name')
    let msgLastname = document.querySelector('.msg-lastname')
    let msgEmail = document.querySelector('.msg-email')
    let msgPsw  = document.querySelector('.msg-psw')


    email.addEventListener('input', validateEmail, false)
    email.addEventListener('blur', validateEmail, false)

    let regexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/


    
    form.addEventListener('submit', (e) => {
        e.preventDefault() 
        if(isEmpty(user,msgUser)){
            if(isEmpty(name,msgName)){
                if(isEmpty(lastname,msgLastname)){
                    if(validateEmail()){
                        if(isEmpty(password,msgPsw)){
                            form.submit()
                        }
                    }
                }
            }
        }
    })

    function validateEmail() {
        if (!email.value) {
            msgEmail.innerHTML = 'Escribe tu Email'
            return false
        } else if (!regexEmail.test(email.value)) {
            msgEmail.innerHTML = 'El formano no es del tipo email'
            return false
        } else {
            msgEmail.innerHTML = ''
            return true

        }
    }

    function isEmpty(input,output){
        if(!input.value){
            output.innerHTML = 'El campo esta vacio'
            return false
        }else {
            output.innerHTML = ''
            return true
        }
    }
})