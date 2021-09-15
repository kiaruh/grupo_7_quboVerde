window.addEventListener('form', function(){
    let form = document.querySelector('email')

    form.addEventListener('focus', function() {
        console.log(1)
    })
})