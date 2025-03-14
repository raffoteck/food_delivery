///////////////////////// PRENOTA RISTORANTE

function prenotaRistorante(i){

  window.location.href = "booking.html?"+i;

}

///////////////////////// STAMPA RISTORANTI

function stampaRistoranti(){

  if (typeof(localStorage.ristoranti) == "undefined") {
    localStorage.setItem("ristoranti", JSON.stringify(ristoranti));  
  }
  // caricamento dati dal localStorage
  var vristoranti = JSON.parse(localStorage.getItem("ristoranti"));

  // variabili che mi serviranno durante la funzione
  var j; // variabile per stampare le stilline
  var s = new String("<h2>Ristoranti</h2>");

  for (i=0;i<vristoranti.length;i++) {

    s+="<div class='row'> <div class='col-md-12 col-xs-12'>";
    s+="<div class='panel panel-default'><div class='panel-heading'><h3 class='panel-title'><strong>"+vristoranti[i].nome+"</strong></h3></div><div class='panel-body'><div class='row'><div class='col-md-6'><strong>Cucina</strong>: "+vristoranti[i].type+"<br/><strong>Luogo</strong>: "+vristoranti[i].luogo+"<br/><strong>Telefono</strong>: "+vristoranti[i].telefono+"<br/><strong>Partita iva</strong>: "+vristoranti[i].partitaiva+"<br/><strong>Cucina</strong>: "+vristoranti[i].prezzo+"<br/><strong>Stelle</strong>: ";

    for(j=0;j<vristoranti[i].stelle-1;j++) // stelline piene
      s+="<span class='glyphicon glyphicon-star' aria-hidden='true'></span>";
    for(;j<5;j++) // stelline vuote
      s+="<span class='glyphicon glyphicon-star-empty' aria-hidden='true'></span>";
    s+="</div><div class='col-md-6'><img class='img-rounded' src='../foto/"+vristoranti[i].foto+"'></div></div></div><div class='panel-footer'><button type='submit' class='btn btn-success' onclick='prenotaRistorante("+i+")'><span class='glyphicon glyphicon-shopping-cart'></span> Ordina</button></div></div>";

    s+="</div></div>";

  } // for

  document.getElementById("ristorante").innerHTML = s;

}

///////////////////////// RICERCA RISTORANTI

function ricercaRistoranti(){

  if (true) {

    // prendo i valori di tiporis
    var tiporis = new String("");
    for(j=0;j<document.cercaristorante.tiporistorante.length;j++)
      if(document.cercaristorante.tiporistorante[j].checked)
        tiporis += document.cercaristorante.tiporistorante[j].value;

    // caricamento dati dal localStorage
    var vristoranti = JSON.parse(localStorage.getItem("ristoranti"));

    // variabili che mi serviranno durante la funzione
    var nomeris, luogoris, tiporis;
    var x,y,z,k,controllo=0;
    var s = new String("<h2>Risultati:</h2>");

    for (i=0;i<vristoranti.length;i++) {
      
      x = true; // nomeris
      y = true; // luogoris
      z = true; // tiporis
      

      // controllo se l'utente ha inserito qualcosa nel campo nome
      if(document.cercaristorante.nomeristorante.value == "")
        nomeris = true;
      else
        nomeris = document.cercaristorante.nomeristorante.value;
      if(document.cercaristorante.luogoristorante.value == "")
        luogoris = true;
      else
        luogoris = document.cercaristorante.luogoristorante.value;
      if(tiporis == "")
        tiporis = true;

      // se l'utente ha inserito qualcosa, controllo che sia uguale al campo in posizione i
      if (nomeris!=true)
        x = RegExp(nomeris, "ig").test(vristoranti[i].nome);
      if (luogoris!=true)
        y = RegExp(luogoris, "ig").test(vristoranti[i].luogo);
      if (tiporis!=true)
        z = RegExp(tiporis, "ig").test(vristoranti[i].tipo);
      

      // se tutti i valori sono veri, allora stampo il ristorante
      if ( nomeris && x && luogoris && y && tiporis && z/* && prezzoris && k*/) {

        s+="<div class='row'> <div class='col-md-12 col-xs-12'>";
	    s+="<div class='panel panel-default'><div class='panel-heading'><h3 class='panel-title'><strong>"+vristoranti[i].nome+"</strong></h3></div><div class='panel-body'><div class='row'><div class='col-md-6'><strong>Cucina</strong>: "+vristoranti[i].type+"<br/><strong>Luogo</strong>: "+vristoranti[i].luogo+"<br/><strong>Telefono</strong>: "+vristoranti[i].telefono+"<br/><strong>Partita iva</strong>: "+vristoranti[i].partitaiva+"<br/><strong>Prezzo</strong>: "+vristoranti[i].prezzo+"<br/><strong>Stelle</strong>: ";

	    for(j=0;j<vristoranti[i].stelle-1;j++) // stelline piene
	      s+="<span class='glyphicon glyphicon-star' aria-hidden='true'></span>";
	    for(;j<5;j++) // stelline vuote
	      s+="<span class='glyphicon glyphicon-star-empty' aria-hidden='true'></span>";
	    s+="</div><div class='col-md-6'><img class='img-rounded' src='../foto/"+vristoranti[i].foto+"'></div></div></div><div class='panel-footer'><button type='submit' class='btn btn-success' onclick='prenotaRistorante("+i+")'><span class='glyphicon glyphicon-shopping-cart'></span> Ordina</button></div></div>";

	    s+="</div></div>";

        controllo=1;

      } // if

    } // for

    if (controllo==0) {
      s+="<div class='alert alert-danger'>Nessun risultato :(</div>";
    }

    document.getElementById("ristorante").innerHTML = s;

    window.location.href = "#visibile";

    return false;

  } else {
    return true;
  }

} // function