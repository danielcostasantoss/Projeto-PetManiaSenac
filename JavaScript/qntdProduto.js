var btnMenos = document.querySelector("#menos")
var btnQuant = document.querySelector("#iQntd")
var btnMais = document.querySelector("#mais")

btnMenos.addEventListener("click", abaixarQntd)
function abaixarQntd() {
    btnQuant.textContent = btnQuant - 1
}

btnMais.addEventListener("click", aumentarQntd)
function aumentarQntd() {
    btnQuant.textContent = btnQuant + 1
}