
window.addEventListener('load',function(){
    let form = document.querySelector('.register-registro')
    let product = document.querySelector("input[name='producto']")
    let price = document.querySelector("input[name='precio']")

    
    let msgproduct = document.querySelector('.msg-product')
    let msgprice = document.querySelector('.msg-price')

    
    product.addEventListener('input', isEmpty(product,msgproduct),false)
    product.addEventListener('blur', isEmpty(product,msgproduct),false)


    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        if(isEmpty(product,msgproduct)){
            if(isEmpty(price,msgprice)){
                                    form.submit()
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