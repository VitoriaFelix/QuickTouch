 $("#botaoFrase").click(trocaFrase);
 $("#botaoFraseId").click(buscaFrase);

 function trocaFrase() {
     $("#spinner").toggle();
     $.get("http://localhost:3000/frases", trocaFraseAleatoria)
         .fail(function() {
             $("#erro").show();
             setTimeout(function() {
                 $("#erro").toggle()
             }, 2000);
         })
         .always(function() {
             $("#spinner").toggle();
         });
 }

 function trocaFraseAleatoria(data) {
     var frase = $(".frase");
     var numeroAleatorio = Math.floor(Math.random() * data.length);
     frase.text(data[numeroAleatorio].texto);
     atualizaTamanhoFrase();
     atualizaTempoInicial(data[numeroAleatorio].tempo);
 }

 function buscaFrase() {
     $("#spinner").toggle();
     var fraseId = $("#fraseId").val();
     var dados = { id: fraseId };
     $.get("http://localhost:3000/frases", dados, trocar)
         .fail(function() {
             $("#erro").show();
             setTimeout(function() {
                 $("#erro").toggle()
             }, 2000);
         })
         .always(function() {
             $("#spinner").toggle();
         });

 }


 function trocar(data) {
     var frase = $(".frase");
     frase.text(data.texto);
     atualizaTamanhoFrase();
     atualizaTempoInicial(data.tempo);
 }