$("#botaoPlacar").click(mostraPlacar);
$("#botaoFraseSync").click(sincronizarPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();

    var numPalavras = $("#contadorPalavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botaoRemover").click(removeLinha);
    corpoTabela.prepend(linha);
    $(".placar").slideDown(1000);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;
    $("body").animate({
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

function novaLinha(usuario, numPalavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavra = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botaoRemover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavra);
    linha.append(colunaRemover);
    return linha;
}

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function() {
        linha.remove();
    }, 1000);


}

function mostraPlacar() {
    $(".placar").stop().slideToggle(1000);
}


function sincronizarPlacar() {
    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function() {
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        var score = {
            usuario: usuario,
            pontos: palavras
        };
        placar.push(score);
    });

    var dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar", dados, function() {
        console.log("Placar sincronizado com sucesso");
        $(".tooltip").tooltipster("open");
    }).fail(function() {
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");
    }).always(function() { //novo
        setTimeout(function() {
            $(".tooltip").tooltipster("close");
        }, 1200);
    });
}

function atualizaPlacar() {
    $.get("http://localhost:3000/placar", function(data) {
        $(data).each(function() {
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botaoRemover").click(removeLinha);
            $("tbody").append(linha);
        });
    });
}