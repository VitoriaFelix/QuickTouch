var tempoInicial = $("#tempoDigitacao").text();
var campo = $(".campoDigitacao");

$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#botaoReiniciar").click(reiniciaJogo);
    selecionaBorda();
   
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanhoFrase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    campo.on("input", function () {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contadorPalavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contadorCaracteres").text(qtdCaracteres);
    });
}


function inicializaCronometro() {
    var tempoRestante = $("#tempoDigitacao").text();
    campo.one("focus", function () {
        $("#botaoReiniciar").attr("disabled", true);
        var cronometroId = setInterval(function () {
            tempoRestante--;
            $("#tempoDigitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroId);
                $("#botaoReiniciar").attr("disabled", false);
                campo.attr("disabled", true);
                campo.addClass("campoDesativado");
                inserePlacar();
            }
        }, 1000);
    });
}



function selecionaBorda() {
    var frase = $(".frase").text();
    campo.on("input", function () {
        var conteudoDigitado = campo.val();
        var comparavel = frase.substr(0, conteudoDigitado.length);
        if (conteudoDigitado == comparavel) {
            campo.addClass("bordaVerde");
            campo.removeClass("bordaVermelha")
        } else {
            campo.addClass("bordaVermelha");
            campo.removeClass("bordaVerde")
        }


    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contadorCaracteres").text("0");
    $("#contadorPalavras").text("0");
    $("#tempoDigitacao").text(tempoInicial);
    inicializaCronometro();
    campo.removeClass("campoDesativado");
    campo.removeClass("bordaVerde");
    campo.removeClass("bordaVermelha");
}



