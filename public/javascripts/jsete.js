var selecoes = ["Brasil", "Alemanha"];
var golsdoJogo = {
  "gol": []
};
var selectClass = function (elem) {
  return document.querySelector(elem);
}
var selectId = function (elemId) {
  return document.getElementById(elemId);
}
var $golAlemanha_audio = selectId("golAlemanha_audio");
var $golBrasil_audio = selectId("golBrasil_audio");

function cronometro(){
    minuto = document.getElementById("m-timer").value;  
    minuto = parseInt(minuto)+1; 

    if(minuto <= 90){      
      document.getElementById("m-timer").value = minuto;    
      goleada(minuto);
      setTimeout("cronometro()",100);   
    }
   else
     fimJogo();
}
function inicioJogo() {
  placarDeTimes();
  cronometro();
}

function fimJogo() {

  var placarA = parseInt(selectId("timeAplacar").innerHTML);
  var placarB = parseInt(selectId("timeBplacar").innerHTML);

  //Time B foi goleado
  if ((placarA > placarB) && (placarA - placarB) >= 3) {
    selectId("goleadaTimeB").style.visibility = "visible";
  }
  //Time A foi goleado
  else if ((placarB > placarA) && (placarB - placarA) >= 3) {
    console.log("aqui");
    selectId("goleadaTimeA").style.visibility = "visible";
  }

}

function goleada(minuto){ 

  if(minuto==11)
      marcarGol(minuto,selecoes[1],"Muller")   
  else if(minuto==23)
      marcarGol(minuto,selecoes[1],"Klose")     
  else if(minuto==24)
      marcarGol(minuto,selecoes[1],"Kroos")  
  else if(minuto==26)
      marcarGol(minuto,selecoes[1],"Kroos") 
  else if(minuto==29)
      marcarGol(minuto,selecoes[1],"Khedira") 
  else if(minuto==69)
      marcarGol(minuto,selecoes[1],"Schurrle") 
  else if(minuto==79)
      marcarGol(minuto,selecoes[1],"Schurrle") 
  else if(minuto==90)
      marcarGol(minuto,selecoes[0],"Oscar")

}


function marcarGol(minuto, selecao, goleador) {
  golsdoJogo.gol.push({
    "minuto": minuto,
    "selecao": selecao,
    "goleador": goleador
  });
  marcarEvento(golsdoJogo.gol[golsdoJogo.gol.length - 1]);
  emitirSomDeGol(selecao);
}

function emitirSomDeGol(selecao) {
  switch (selecao) {
  case 'Alemanha':
    emitirSom($golAlemanha_audio);
    break;
  case 'Brasil':
    emitirSom($golBrasil_audio);
    break;
  }
}

function emitirSom(audio) {
  //faz o restart do audio caso já esteja em andamento
  if (audio.currentTime != 0) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  } else {
    audio.play();
  }
}

function marcarEvento(evento) {

  var placarAnalitico = selectId("placarAnalitico").innerHTML;
  var novoEvento = "Minuto: " + evento.minuto + "'' Gol " + evento.selecao + "(" + evento.goleador + ") <br>";
  selectId("placarAnalitico").innerHTML += novoEvento;
}

function placarDeTimes() {
  selectId("timeA").innerHTML = selecoes[0];
  selectId("timeB").innerHTML = selecoes[1];
  placarDeGols();
}


function placarDeGols() {

  var totalGolsSofridosTimeA = 0;
  var totalGolsSofridosTimeB = 0;

  for (i = 0; i < golsdoJogo.gol.length; i++) {
    if (golsdoJogo.gol[i].selecao == selecoes[0])
      totalGolsSofridosTimeA++;
    else
      totalGolsSofridosTimeB++;
  }

  selectId("timeAplacar").innerHTML = totalGolsSofridosTimeA;
  selectId("timeBplacar").innerHTML = totalGolsSofridosTimeB;

  setTimeout("placarDeGols()", 500);
}


function init() {
  inicioJogo();
}

init();
