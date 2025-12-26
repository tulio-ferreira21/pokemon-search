// Talvez eu use
function ShowPopup(){
    const Popup = document.getElementById('popup')
    const fechar = document.getElementById('fechar')
    const audio = document.getElementById('audio')
    fechar.addEventListener('click', ()=>{
        audio.onplay()
    })
}