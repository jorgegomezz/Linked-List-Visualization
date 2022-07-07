document.addEventListener('DOMContentLoaded', () => {

    let menuBtn = document.getElementById('menu-btn')
    let closeBtn = document.getElementById('close-btn')
    let save = document.getElementById('save')
    let menu = document.getElementById('settings')
    let inputs = menu.getElementsByTagName('input')
    let success = document.getElementsByClassName('success')
    let error = document.getElementsByClassName('error-advert')
    let reset = document.getElementById('reset');
    // Handle Inputs
    
    let animations = {
        nodeTime: 1500,
        pointerTime: 1000,
        deleteTime: 2000
    } // Default
  
    setAnimationTimeOuts(animations)
    

    save.addEventListener('click', () => {
        for (let i = 0; i < inputs.length; i++) {
            if(inputs[i].value < 0) {
                // error[0].innerHTML = errorCircle;
                // let txt = document.createElement('p');
                // txt.innerText = 'Miliseconds cannot be negative !';
                // txt.setAttribute('id', 'settings-error')
                // error[0].appendChild(txt);
                success[0].innerHTML = null;
                error[0].innerHTML = 
                    '<i class="fas fa-exclamation-circle error-message" id="exclamation2"></i>' +
                    'Miliseconds cannot be negative !'
                
                let exclamation = document.getElementById('exclamation2')
                exclamation.style.opacity = 1
                return;
            }

            error.innerHTML = null;

            animations.nodeTime =
                isNaN(inputs[0].valueAsNumber)?
                1500: inputs[0].valueAsNumber;
            animations.pointerTime =
                isNaN(inputs[1].valueAsNumber)?
                1000: inputs[1].valueAsNumber;
            animations.deleteTime =
                isNaN(inputs[2].valueAsNumber)?
                2000: inputs[2].valueAsNumber;

            success[0].innerHTML = 
            '<i class="fas fa-check-circle"></i>' + 
            " Saved !";
            setAnimationTimeOuts(animations)
            
        }
        for (let j = 0; j < inputs.length; j++) {
            inputs[j].value = ''
        }
        
    })
    
    reset.addEventListener('click', () => {
        let animations = {
            nodeTime: 1500,
            pointerTime: 1000,
            deleteTime: 2000
        } 

        setAnimationTimeOuts(animations)
        success[0].innerHTML = 
        '<i class="fas fa-check-circle"></i>' + 
        " Reseted to default values !";
        

        for (let j = 0; j < inputs.length; j++) {
            inputs[j].value = ''
        }
    })



    // Handle Animation
    
    menuBtn.addEventListener('click', () => {
        menu.classList.add('clicked')
    })
    closeBtn.addEventListener('click', () => {
        menu.classList.remove('clicked')
    })
   
});