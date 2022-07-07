
document.addEventListener('DOMContentLoaded', ()=> {

    "use strict";

    window.addEventListener('resize', () => {
        document.querySelector('main').style.height =
        window.innerHeight -
        document.querySelector('header').scrollHeight
        + "px";
    });

    add(0,1);
// Manage buttons and User Information

// The parameter "number" is used to know which of the button sections you want to access with de function (set -> 0; insert -> 1; add -> 2...)


    const getUsrInput = (number) => {
        let btns = document.getElementsByClassName('select')
        let inputs = btns[number].getElementsByTagName('input');

        if (inputs.length < 2) {
            return inputs[0].value;
        } else {
           let indexValue = inputs[0].value;
           let dataValue = inputs[1].value;
           let usrInfo = [indexValue, dataValue];
           return usrInfo;
        }
    }


    // Error Management

    const errorCircle = '<i class="fas fa-exclamation-circle error-message" id="exclamation"></i>';
    const error = document.getElementById('error');

    const displayErrorMsg = (text) => {
        error.innerHTML = errorCircle;
        let txt = document.createElement('p');
        txt.innerText = text;
        txt.classList.add('error-message');
        txt.setAttribute('id', 'errTxt')
        let exclamation = document.getElementById('exclamation')
        exclamation.style.opacity = 1
        txt.style.opacity = 1
        error.appendChild(txt);
    }
    
    const rmPreviosDiv = () => {
        let exclamation = document.getElementById('exclamation')
        exclamation.style.opacity = 0
        let txt = document.getElementsByClassName('error-message')
        txt[1].style.opacity = 0
    }

    const handleSingleInputError = (number, value) => {
        let btns = document.getElementsByClassName('select')
        let inputs = btns[number].getElementsByTagName('input');
        let check = false;
        if (inputs[0].value === "") {
            displayErrorMsg(value + ' must be a number !')
            check = true;
            return check;
        } else if (inputs[0].value < 0) {
            displayErrorMsg(value + ' is out of bounds !')
            check = true;
            return check;
        }
        else {
            rmPreviosDiv()
            check = false
            return check;
        }
    }

    const handleGeneralErrors = (number) => {
        let btns = document.getElementsByClassName('select')
        let inputs = btns[number].getElementsByTagName('input');
        let check;
        if (inputs[0].value === "" || inputs[1].value === "") {
            displayErrorMsg('Every input must be filled in !')
            check = true;
            return check;
        }
        else if (inputs[0].value < 0) {
            displayErrorMsg('Index is out of bounds !')
            check = true;
            return check;
        }
        else if(inputs[1].value < 0){
            displayErrorMsg('Data is out of bounds !')
            check = true;
            return check;
        }
        else if (isNaN(inputs[0].value)) {
            displayErrorMsg('Index must be a number !')
            check = true;
            return check;
        } else if (isNaN(inputs[1].value)) {
            displayErrorMsg('Data must be a number !')
            check = true;
            return check;
        } else if (inputs[0].value >= nodes.length) {
            displayErrorMsg('You cannot acces a value which does not exist !')
            check = true;
            return check;
        }
        else {
            rmPreviosDiv()
            check = false
            return check;
        }

    }

    // BUTTONS

    // Set Btn

    let setBtn = document.getElementById('set-btn').addEventListener('click', () => {
        if (handleGeneralErrors(0) === true) {
            return;
        } else {
            let indexValue = getUsrInput(0)[0]
            let dataValue = getUsrInput(0)[1]
            set(indexValue, dataValue)
        }
         //Reset inputs

        let btns = document.getElementsByClassName('select')
        let inputs = btns[0].getElementsByTagName('input');
        inputs[0].value = ''
        inputs[1].value = ''
    });

    let insertBtn = document.getElementById('insert-btn').addEventListener('click', () => {
        if (handleGeneralErrors(1) === true) {
            return;
        } else {
            let indexValue = getUsrInput(1)[0];
            let dataValue = getUsrInput(1)[1];
            insert(indexValue, dataValue)
        }
         //Reset inputs

        let btns = document.getElementsByClassName('select')
        let inputs = btns[1].getElementsByTagName('input');
        inputs[0].value = ''
        inputs[1].value = ''

    });

    //Add Button

    let addBtn = document.getElementById('add-btn').addEventListener('click', () => {
        if(handleSingleInputError(2, 'Data') === true) {
            return;
        } else {
            let userValue = getUsrInput(2);
            add(nodes.length, userValue)
        }

        //Reset inputs

        let btns = document.getElementsByClassName('select')
        let inputs = btns[2].getElementsByTagName('input');
        inputs[0].value = ''  
    });

    // Remove Btn

    let removeBtn = document.getElementById('remove-btn').addEventListener('click', () => {
        let btns = document.getElementsByClassName('select')
        let inputs = btns[3].getElementsByTagName('input');
        if (handleSingleInputError(3, 'Index') === true) {
            return;
        } else if (inputs[0].value >= nodes.length) {
            displayErrorMsg('You cannot acces a value which does not exist !')
            return;
        } 
        else {
            let userValue = getUsrInput(3);
            removeIndex(userValue)
        }
         //Reset inputs

        inputs[0].value = ''  
    });
});


