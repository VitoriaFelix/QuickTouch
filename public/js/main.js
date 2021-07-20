var tempoInicial = $("#tempoDigitacao").text();
var campo = $(".campoDigitacao");

$(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#botaoReiniciar").click(reiniciaJogo);
    atualizaPlacar();
    selecionaBorda();
    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });
    $(".tooltip").tooltipster({
        trigger: "custom"
    });

});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanhoFrase");
    tamanhoFrase.text(numPalavras);
}

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempoDigitacao").text(tempo);
}

function inicializaContadores() {
    campo.on("input", function() {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contadorPalavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contadorCaracteres").text(qtdCaracteres);
    });
}


function inicializaCronometro() {

    campo.one("focus", function() {
        var tempoRestante = $("#tempoDigitacao").text();
        $("#botaoReiniciar").attr("disabled", true);
        var cronometroId = setInterval(function() {
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

    campo.on("input", function() {
        var frase = $(".frase").text();
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