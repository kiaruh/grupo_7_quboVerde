
window.addEventListener('load',function(){
    let form = document.querySelector('.register-registro')
    let product = document.querySelector("input[name='producto']")
    let price = document.querySelector("input[name='precio']")
    let picture = document.querySelector("input[name='img']")
    let specie = document.querySelector("input[name='especie']")
    let size = document.querySelector("select[name='escala']")
    let light = document.querySelector("input[name='luz']")
    let pet = document.querySelector("input[name='user']")
    
    let msgproduct = document.querySelector('.msg-product')
    let msgprice = document.querySelector('.msg-price')
    let msgpicture = document.querySelector('.msg-picture')
    let msgspecie = document.querySelector('.msg-specie')
    let msgsize = document.querySelector('.msg-size')
    let msglight = document.querySelector('.msg-light')
    let msgpet = document.querySelector('.msg-pet')
    


    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        if(isEmpty(product,msgproduct)){
            if(isEmpty(price,msgprice)){
                if(isEmpty(picture,msgpicture)){
                                    form.submit()
                                }
                            }
                        }
                    
                })
            
        
        
    

    function isEmpty(input,output){
        if(input.value == ""){
            output.innerHTML = 'El campo esta vacio'
            return false
        }else {
            output.innerHTML = ''
            return true
        }

    }
    function isCheck (input,output){
        if(!input.checked){
            output.innerHTML = 'El campo esta vacio'
            return false
        }else {
            output.innerHTML = ''
            return true
        }
    }


})