
document.addEventListener('DOMContentLoaded', () => {

    let btn = document.getElementById('theme-icon');
    // Colors

    let dark = "rgb(25, 25, 25)";
    let light = "#f9f9f9"

    btn.addEventListener('click', () => {
        let bg = document.body;
        let h1 = document.getElementById('header-h1');
        let inputs = document.getElementsByTagName('input');
        let menubtn = document.getElementById('menu-btn')

        // White Theme
        if (bg.style.backgroundColor === "" || bg.style.backgroundColor == dark) {
            bg.style.backgroundColor = light;
            h1.style.color = dark;
            btn.style.color = dark;
            menubtn.style.color = dark;

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].style.backgroundColor = "#d4d4d4";
            }

        }
        // Dark Theme
        else {
            bg.style.backgroundColor = dark;
            h1.style.color = light;
            btn.style.color = light;
            menubtn.style.color = light;

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].style.backgroundColor = "#fff";
            }

        }

    });

});