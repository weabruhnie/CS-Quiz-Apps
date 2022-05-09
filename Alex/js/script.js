// constants
const next = document.querySelector('.continue-btn')
const infoBox = document.querySelector('.info-box')
const buttons = document.querySelectorAll('.btn')

next.onclick = function() {
    infoBox.style.opacity = 0;
    buttons.forEach(function(btn) {
        btn.style.pointerEvents = 'all';
    })
}