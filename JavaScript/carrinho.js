if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready) /* trocar o nome READY */
} else {
    ready()
}

var valorTotal = "0,00"

function ready() {
    const botaoRemoverProdutos = document.getElementsByClassName("remover-produtos")
    for (var i = 0; i < botaoRemoverProdutos.length; i++) {
        botaoRemoverProdutos[i].addEventListener("click", removerProduto)
    }

    const inputQuantidade = document.getElementsByClassName("qtd-produto")
    for (var i = 0; i < inputQuantidade.length; i++) {
        inputQuantidade[i].addEventListener("change", calculoTotal)
    }

    const botaoAdicionarProdutos = document.getElementsByClassName("adc-ao-carrinho")
    for (var i = 0; i < botaoAdicionarProdutos.length; i++) {
        botaoAdicionarProdutos[i].addEventListener("click", adicionarAoCarrinho)
    }

    const botaoCompra = document.getElementsByClassName("confirmar-compra")
    botaoCompra.addEventListener("click", finalizarCompra)
}

function finalizarCompra() {
    if(valorTotal === "0,00"){
        alert("Seu Carrinho está vazio!")
    } else {
        alert(
            `
            Obrigado pela sua Compra!
            Valor do Pedido: R$${valorTotal}
            Tenha um ótimo dia!
            `
        )
    }

    document.querySelector(".cart-table tbody")
    calculoTotal()
}

function checarQtdInput(event) {
    if(event.target.value === "0"){
        event.target.parentElement.parentElement.remove()
    }

    calculoTotal()
}

/*Adicionando produtos ao carrinho*/
function adicionarAoCarrinho(event) {
    const button = event.target
    const infoProd = button.parentElement.parentElement
    const imgProd = infoProd.getElementsByClassName("imagem-produto")[0].src
    const nomeProd = infoProd.getElementsByClassName("titulo-produto")[0].innerText
    const precoProd = infoProd.getElementsByClassName("preco-produto")[0].innerText

    const verifNomeProd = document.getElementsByClassName("titulo-produto")
    for(var i = 0; i < verifNomeProd.length; i++) {
        if(verifNomeProd[i].innerText === nomeProd) {
            verifNomeProd[i].parentElement.parentElement.getElementsByClassName("qtd-produto")[0].value++
            return
        }
    }

    let novaLinhaProd = document.createElement("tr")
    novaLinhaProd.classList.add("linha-produto")

    novaLinhaProd.innerHTML =
    `
    
    `

    const corpoTabela = document.querySelector(".cart-table tbody")
    corpoTabela.append(novoProd)
    
    calculoTotal()
    novaLinhaProd.getElementsByClassName("qtd-produto")[0].addEventListener("change", checarQtdInput)
    novaLinhaProd.getElementsByClassName("remover-produtos")[0].addEventListener("click", removerProduto)
}

/*Removendo produtos do carrinho*/
function removerProduto(event) {
    event.target.parentElement.parentElement.remove()
    calculoTotal()
}

/*Cálculo total dos preços*/
function calculoTotal() {
    valorTotal = 0
    const linhaProduto = document.getElementsByClassName("linha-produto")
    for (var i = 0; i < linhaProduto.length; i++) {
        const precoProduto = linhaProduto[i].getElementsByClassName("preco-produto")[0].innerText.replace("R$", "").replace(",", ".")
        const quantidadeProduto = linhaProduto[i].getElementsByClassName("qtd-produto")[0].value

        valorTotal += precoProduto * quantidadeProduto
    }

    valorTotal = valorTotal.toFixed(2)
    valorTotal = valorTotal.replace(".", ",")
    document.querySelector(".linha-calculo-total span").innerText = "R$ " + valorTotal
}