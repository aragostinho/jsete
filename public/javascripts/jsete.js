var selecoes = ["Brasil","Alemanha"];
 var golsdoJogo = {
                      "gol" : []
                    };
var $golAlemanha_audio = document.getElementById("golAlemanha_audio");
var $golBrasil_audio = document.getElementById("golBrasil_audio");

function cronometro(){
  minuto = document.getElementById("timer").value;  
  if(minuto <= 90){
    document.getElementById("timer").value = parseInt(minuto) + 1;    
    goleada(minuto);
    setTimeout("cronometro()",100);   
  }   
  else
    fimJogo();
}


function inicioJogo(){
  placarDeTimes();
  cronometro(); 
}


function fimJogo(){

    var placarA =  parseInt(document.getElementById("timeAplacar").innerHTML);
    var placarB =  parseInt(document.getElementById("timeBplacar").innerHTML);

    //Time B foi goleado
    if((placarA>placarB) && (placarA - placarB) >=3){
       document.getElementById("goleadaTimeB").style.visibility  = "visible";
    }
    //Time A foi goleado
    else if((placarB>placarA) && (placarB - placarA) >=3){
       console.log("aqui");
       document.getElementById("goleadaTimeA").style.visibility  = "visible";
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

function marcarGol(minuto,selecao,goleador){
    golsdoJogo.gol.push({
      "minuto": minuto,
      "selecao": selecao,
      "goleador": goleador
    });
    marcarEvento(golsdoJogo.gol[golsdoJogo.gol.length-1]);
    emitirSomDeGol(selecao);
}

function emitirSomDeGol(selecao){
  switch(selecao)
  {
    case 'Alemanha':
      emitirSom($golAlemanha_audio);
      break;
    case 'Brasil':
      emitirSom($golBrasil_audio);
      break;
  }
}

function emitirSom(audio){
  //faz o restart do audio caso já esteja em andamento
  if(audio.currentTime != 0){
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  } else {
    audio.play();
  }
}

function marcarEvento(evento){ 
   
   var placarAnalitico = document.getElementById("placarAnalitico").innerHTML;
   var novoEvento = "Minuto: " + evento.minuto + "'' Gol " +  evento.selecao + "(" + evento.goleador + ") <br>";
   document.getElementById("placarAnalitico").innerHTML += novoEvento;
}

function placarDeTimes(){
    document.getElementById("timeA").innerHTML = selecoes[0]; 
    document.getElementById("timeB").innerHTML = selecoes[1]; 
    placarDeGols();
}


function placarDeGols(){

    var totalGolsSofridosTimeA  = 0; 
    var totalGolsSofridosTimeB  = 0;

    for(i=0;i< golsdoJogo.gol.length;i++){
      if(golsdoJogo.gol[i].selecao == selecoes[0])
         totalGolsSofridosTimeA++;
      else
         totalGolsSofridosTimeB++;
    }     

    document.getElementById("timeAplacar").innerHTML = totalGolsSofridosTimeA;
    document.getElementById("timeBplacar").innerHTML = totalGolsSofridosTimeB;

    setTimeout("placarDeGols()",500); 
} 


function init(){
   inicioJogo(); 
}

init();