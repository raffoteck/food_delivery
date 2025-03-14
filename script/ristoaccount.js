function log(ristoranti){
  var k;
for(k=0;k<ristoranti.length;k++)
  {
      if(ristoranti[k].l==1)
      {
        return k;
      }
  }
  return -1;
} 

function stampaDatiUtente(){
  // caricamento dati dal localStorage
  var risto = JSON.parse(localStorage.ristoranti);
  var s = new String("");
  for (i=0;i<risto.length;i++){
    if (risto[i].l==1) {
      s+="<div class=\"panel-heading\"><h3><span class=\"glyphicon glyphicon-user\"></span> "+risto[i].nome+"</h3></div><div class='panel-body'><div class='col-md-6'>";
      s+="<strong>Nome titolare</strong>: "+risto[i].nometit;
      s+=" <a href='modracc.html?"+i+"'>change it</a><br/>";
      s+="<strong>Password</strong>: *****";
      s+=" <a href='modracc.html?"+i+"'>change it</a><br/>";
      s+="<strong>Cucina</strong>: "+risto[i].tipo+" <a href='modracc.html?"+i+"'>change it</a><br/>";
      s+="<strong>Luogo</strong>: "+risto[i].luogo+" <a href='modracc.html?"+i+"'>change it</a><br/>";
      s+="<strong>Telefono</strong>: "+risto[i].telefono+" <a href='modracc.html?"+i+"'>change it</a><br/>";
      s+="<strong>Partita iva</strong>: "+risto[i].partitaiva+" <a href='modracc.html?"+i+"'>change it</a><br/>";
      s+="<strong>Prezzo</strong>: "+risto[i].prezzo+" <a href='modracc.html?"+i+"'>change it</a><br/>";
      s+="<strong>Stelle</strong>: ";
      for(j=0;j<risto[i].stelle-1;j++) // stelline piene
        s+="<span class='glyphicon glyphicon-star' aria-hidden='true'></span>";
      for(;j<5;j++) // stelline vuote
        s+="<span class='glyphicon glyphicon-star-empty' aria-hidden='true'></span>";
      s+=" <a href='modracc.html?"+i+"'>change it</a><br/>";
    s+="</div><div class='col-md-6'><img class='img-rounded' src='../foto/"+risto[i].foto+"'></div></div></div>";
    } // if

  } // for

  document.getElementById("vistaDatiAzienda").innerHTML = s;

  return true;

}

///////////////////////// STAMPA PRENOTAZIONI UTENTE

function stampaPrenotazioniUtenti(){

  var vutenti = JSON.parse(localStorage.utenti);
  var risto = JSON.parse(localStorage.ristoranti);

  var s = new String("");
  var u,costo;
  var nome = new String("");
  var qtot=0;
  var i,j;//cicli
  var idris=log(risto);
  var costototale=0;
  var tattesa=0;
  var controllo=0;
  if (risto[idris].prenotazioni.length==0) {
    s+="<div class='alert alert-danger'>Nessuna prenotazione :( </div>";
    }
  else{
    for(i=0;i<risto[idris].prenotazioni.length;i++){
      if(controllo==0)
      { controllo=1;
        costototale=0;
        if(risto[idris].prenotazioni[i].pagamento==0){
            s+="<p class='pagamento'>Pagato online</p>";
          }else{
            s+="<p class='pagamento1'>Da pagare al ritiro</p>";
          }
          s+="<h1>Prenotazione di "+risto[idris].prenotazioni[i].nome+" </h1><hr>";
      }
      if(controllo==1)
      {
        s+="<div class=\"panel panel-default\"><div class=\"panel-body\"><div class=\"row\"><div class=\"col-md-12\"><div class=\"col-md-2\">";
            s+="<div class=\"setbg\" style=\"background-image: url(../foto/"+risto[idris].prenotazioni[i].foto+")\"></div></div><div class=\"col-md-6 fixtop\">";
            s+="<h2>"+risto[idris].prenotazioni[i].nomePiatto+"</h2></div><div class=\"col-md-2 fixtop\"><h3>Qt:";
            s+=risto[idris].prenotazioni[i].quantita+"</h3></div><div class=\"col-md-2 setprice\">";
            s+="<p>"+risto[idris].prenotazioni[i].costo+"€</p></div></div></div></div></div>";
            costototale=costototale+risto[idris].prenotazioni[i].costo*risto[idris].prenotazioni[i].quantita;
            tattesa+=risto[idris].prenotazioni[i].quantita*risto[idris].tempoattesa;
        if(risto[idris].prenotazioni.length>i+1)
        {
          if(risto[idris].prenotazioni[i].nome!=risto[idris].prenotazioni[i+1].nome||risto[idris].prenotazioni[i].pagamento!=risto[idris].prenotazioni[i+1].pagamento)
            {controllo=0;}
        }else if(risto[idris].prenotazioni.length==i+1)
        {
          controllo=0;
        }
      }
      if(controllo==0)
      {

        s+="<h1 id=\"tot\">Totale: "+costototale+"€</h1><p class=\"attesa\"><span class=\"glyphicon glyphicon-time\"></span> Tempo di attesa: "+tattesa+" min.</p><hr>";
      }
    }
}
document.getElementById('vistaPrenotazioniUtenti').innerHTML = s;
}

function prenotaOra(){

  window.location.href = "index.html";

}

///////////////////////// ESCI ACCOUNT

function esciAccount(){
  
  // caricamento dati dal localStorage
  var risto = JSON.parse(localStorage.ristoranti);
  var i;
  for (i=0;i<risto.length;i++){

    if (risto[i].l==1) {

      risto[i].l=0;
      localStorage.ristoranti = JSON.stringify(risto);
      alert("Logout successfully");
      window.location.href = "index.html";
      return true;

    } // if

  } // for

}

///////////////////////// CANCELLA ACCOUNT

function cancellaAccount(){

  // caricamento dati dal localStorage
  var risto = JSON.parse(localStorage.ristoranti);

  // cerco utente loggato
  for(var i=0; i<risto.length;i++)
    if(risto[i].l==1)
      risto.splice(i, 1); // splice (index, howmany)

  // salvo i dati nel localStorage
  localStorage.ristoranti = JSON.stringify(risto);

  alert("Account deleted successfully!");
  window.location.href = "index.html";
  return false;

}


function printSubPrimi(){
  var ristoranti = JSON.parse(localStorage.ristoranti);
  var s = new String("");
  var k;
  var nome = new String("");
  var idris=log(ristoranti);
  if(ristoranti[idris].primi.length!=0)
  {
  for (k=0;k<ristoranti[idris].primi.length;k++) {
    nome=ristoranti[idris].primi[k].nome;
    s+="<hr><div class='row'> <div class='col-md-12 col-xs-12'>";
    s+="<div class='row'><div class='col-md-6'><h2 class='panel-title'><strong><h2>"+ristoranti[idris].primi[k].nome+"</h2></strong></h2><br><strong>ingredienti</strong><br> ";
    for (var z=0;z<ristoranti[idris].primi[k].ingredienti.length;z++) {
    s+="- "+ristoranti[idris].primi[k].ingredienti[z]+"<br/>"; }
    s+="<strong>Costo</strong>: "+ristoranti[idris].primi[k].costo;
    s+="<br><br><button type='submit' class='btn btn-success' onclick='subPiatto("+idris+",\"primi\","+k;
    s+=");'><span class=\"glyphicon glyphicon-remove\"></span> Elimina</button><br/>";
    s+="</div><div class='col-md-6'><img class='img-rounded' src='../foto/"+ristoranti[idris].primi[k].foto+"'></div></div></div></div></div></div></div>";
  }
  }else
  {
    s+="<h1>vuto</h1><p>Aggiungi un piatto!</p></h1> ";
  }
  document.getElementById('primi1').innerHTML = s;
}


function printSubSecondi(){
  var ristoranti = JSON.parse(localStorage.ristoranti);
  var s = new String("");
  var k;
  var nome = new String("");
  var idris=log(ristoranti);
  if(ristoranti[idris].secondi.length!=0)
  {
  for (k=0;k<ristoranti[idris].secondi.length;k++) {
    nome=ristoranti[idris].secondi[k].nome;
    s+="<hr><div class='row'> <div class='col-md-12 col-xs-12'>";
    s+="<div class='row'><div class='col-md-6'><h2 class='panel-title'><strong><h2>"+ristoranti[idris].secondi[k].nome+"</h2></strong></h2><br><strong>ingredienti</strong><br> ";
    for (var z=0;z<ristoranti[idris].secondi[k].ingredienti.length;z++) {
    s+="- "+ristoranti[idris].secondi[k].ingredienti[z]+"<br/>"; }
    s+="<strong>Costo</strong>: "+ristoranti[idris].secondi[k].costo;
    s+="<br><br><button type='submit' class='btn btn-success' onclick='subPiatto("+idris+",\"secondi\","+k;
    s+=");'><span class=\"glyphicon glyphicon-remove\"></span> Elimina</button><br/>";
    s+="</div><div class='col-md-6'><img class='img-rounded' src='../foto/"+ristoranti[idris].secondi[k].foto+"'></div></div></div></div></div></div></div>";
  }
  }else
  {
    s+="<h1>vuto</h1><p>Aggiungi un piatto!</p></h1> ";
  }

  document.getElementById("secondi").innerHTML = s;
}

function printSubDessert(){
  var ristoranti = JSON.parse(localStorage.ristoranti);
  var s = new String("");
    var k;
  var nome = new String("");
  var idris=log(ristoranti);
  if(ristoranti[idris].dessert.length!=0)
  {
  for (k=0;k<ristoranti[idris].dessert.length;k++) {
    nome=ristoranti[idris].dessert[k].nome;
    s+="<hr><div class='row'> <div class='col-md-12 col-xs-12'>";
    s+="<div class='row'><div class='col-md-6'><h2 class='panel-title'><strong><h2>"+ristoranti[idris].dessert[k].nome+"</h2></strong></h2><br><strong>ingredienti</strong><br> ";
    for (var z=0;z<ristoranti[idris].dessert[k].ingredienti.length;z++) {
    s+="- "+ristoranti[idris].dessert[k].ingredienti[z]+"<br/>"; }
    s+="<strong>Costo</strong>: "+ristoranti[idris].dessert[k].costo;
    s+="<br><br><button type='submit' class='btn btn-success' onclick='subPiatto("+idris+",\"dessert\","+k;
    s+=");'><span class=\"glyphicon glyphicon-remove\"></span> Elimina</button><br/>";
    s+="</div><div class='col-md-6'><img class='img-rounded' src='../foto/"+ristoranti[idris].dessert[k].foto+"'></div></div></div></div></div></div></div>";
  }
  }else
  {
    s+="<h1>vuto</h1><p>Aggiungi un piatto!</p></h1> ";
  }

  document.getElementById("dessert").innerHTML = s;
}

function printSubBevande(){
  var ristoranti = JSON.parse(localStorage.ristoranti);
  var s = new String("");
  var k;
  var nome = new String("");
  var idris=log(ristoranti);
  if(ristoranti[idris].bevande.length!=0)
  {
  for (k=0;k<ristoranti[idris].bevande.length;k++) {
    nome=ristoranti[idris].bevande[k].nome;
    s+="<hr><div class='row'> <div class='col-md-12 col-xs-12'>";
    s+="<div class='row'><div class='col-md-6'><h2 class='panel-title'><strong><h2>"+ristoranti[idris].bevande[k].nome+"</h2></strong></h2><br>";
    s+="<strong>Costo</strong>: "+ristoranti[idris].bevande[k].costo;

    s+="<br><br><button type='submit' class='btn btn-success' onclick='subPiatto("+idris+",\"bevande\","+k;
    s+=");'><span class=\"glyphicon glyphicon-remove\"></span> Elimina</button><br/>";
    s+="</div><div class='col-md-6'><img class='img-rounded' src='../foto/"+ristoranti[idris].bevande[k].foto+"'></div></div></div></div></div></div></div>";
  }
  }else
  {
    s+="<h1>vuto</h1><p>Aggiungi un piatto!</p></h1> ";
  }

  document.getElementById("bevande").innerHTML = s;
}


function loadList(){
    if (typeof(localStorage.lista) == "undefined") {
    localStorage.setItem("lista", JSON.stringify(listaPiatti));  
  }
}

function printAddPrimi(){

  var ristoranti = JSON.parse(localStorage.ristoranti);
  var s = new String("");
  var k,j,controllo=0;
  var idris=log(ristoranti);
  var lista=JSON.parse(localStorage.lista);
  if(ristoranti[idris].primi.length!=lista.primi.length)
  {
    for (j=0;j<lista.primi.length;j++) {
      controllo=0;
    for (k=0;k<ristoranti[idris].primi.length;k++) {
      if(ristoranti[idris].primi[k].nome==lista.primi[j].nome&&ristoranti[idris].primi[k].costo==lista.primi[j].costo)
      {
        controllo=1;
      }
    }
    if(controllo==0){
    s+="<hr><div class='row'> <div class='col-md-12 col-xs-12'>";
    s+="<div class='row'><div class='col-md-6'><h2 class='panel-title'><strong><h2>"+lista.primi[j].nome+"</h2></strong></h2><br>";
    
    for (var z=0;z<lista.primi[j].ingredienti.length;z++) {
    s+="- "+lista.primi[j].ingredienti[z]+"<br/>"; }
    s+="<strong>Costo</strong>: "+lista.primi[j].costo;
    s+="<br><br><button type='submit' class='btn btn-success' onclick='addPiatto("+idris+",\"primi\","+j;
    s+=");'><span class=\"glyphicon glyphicon-plus\"></span> Aggiungi</button><br/>";
    s+="</div><div class='col-md-6'><img class='img-rounded' src='../foto/"+lista.primi[j].foto+"'></div></div></div></div></div></div></div>";
    }
  }
  }else
  {
    s+="<h1>vuto</h1><p>Elimina un piatto!</p></h1> ";
  }

  document.getElementById("id1").innerHTML = s;
}

function printAddSecondi(){
  var ristoranti = JSON.parse(localStorage.ristoranti);
  var s = new String("");
  var k,j,controllo=0;
  var idris=log(ristoranti);
  var lista=JSON.parse(localStorage.lista);
  if(ristoranti[idris].secondi.length!=lista.secondi.length)
  {
    for (j=0;j<lista.secondi.length;j++) {
      controllo=0;
    for (k=0;k<ristoranti[idris].secondi.length;k++) {
      if(ristoranti[idris].secondi[k].nome==lista.secondi[j].nome&&ristoranti[idris].secondi[k].costo==lista.secondi[j].costo)
      {
        controllo=1;
      }
    }
    if(controllo==0){
    s+="<hr><div class='row'> <div class='col-md-12 col-xs-12'>";
    s+="<div class='row'><div class='col-md-6'><h2 class='panel-title'><strong><h2>"+lista.secondi[j].nome+"</h2></strong></h2><br>";
   
    for (var z=0;z<lista.secondi[j].ingredienti.length;z++) {
    s+="- "+lista.secondi[j].ingredienti[z]+"<br/>"; }
     s+="<strong>Costo</strong>: "+lista.secondi[j].costo;
    s+="<br><br><button type='submit' class='btn btn-success' onclick='addPiatto("+idris+",\"secondi\","+j;
    s+=");'> <span class=\"glyphicon glyphicon-plus\"></span> Aggiungi</button><br/>";
    s+="</div><div class='col-md-6'><img class='img-rounded' src='../foto/"+lista.secondi[j].foto+"'></div></div></div></div></div></div></div>";
    }
  }
  }else
  {
    s+="<h1>vuto</h1><p>Elimina un piatto!</p></h1> ";
  }


  document.getElementById("id2").innerHTML = s;
}

function printAddDessert(){
  var ristoranti = JSON.parse(localStorage.ristoranti);
  var s = new String("");
  var k,j,controllo=0;
  var idris=log(ristoranti);
  var lista=JSON.parse(localStorage.lista);
  if(ristoranti[idris].dessert.length!=lista.dessert.length)
  {
    for (j=0;j<lista.dessert.length;j++) {
      controllo=0;
    for (k=0;k<ristoranti[idris].dessert.length;k++) {
      if(ristoranti[idris].dessert[k].nome==lista.dessert[j].nome&&ristoranti[idris].dessert[k].costo==lista.dessert[j].costo)
      {
        controllo=1;
      }
    }
    if(controllo==0){
    s+="<hr><div class='row'> <div class='col-md-12 col-xs-12'>";
    s+="<div class='row'><div class='col-md-6'><h2 class='panel-title'><strong><h2>"+lista.dessert[j].nome+"</h2></strong></h2><br>";
    for (var z=0;z<lista.dessert[j].ingredienti.length;z++) {
    s+="- "+lista.dessert[j].ingredienti[z]+"<br/>"; }
    s+="<strong>Costo</strong>: "+lista.dessert[j].costo;
    s+="<br><br><button type='submit' class='btn btn-success' onclick='addPiatto("+idris+",\"dessert\","+j;
    s+=");'> <span class=\"glyphicon glyphicon-plus\"></span> Aggiungi</button><br/>";
    s+="</div><div class='col-md-6'><img class='img-rounded' src='../foto/"+lista.dessert[j].foto+"'></div></div></div></div></div></div></div>";
    }
  }
  }else
  {
    s+="<h1>vuto</h1><p>Elimina un piatto!</p></h1> ";
  }

  document.getElementById("id3").innerHTML = s;
}

function printAddBevande(){
  var ristoranti = JSON.parse(localStorage.ristoranti);
  var s = new String("");
var k,j,controllo=0;
  var idris=log(ristoranti);
  var lista=JSON.parse(localStorage.lista);
  if(ristoranti[idris].bevande.length!=lista.bevande.length)
  {
    for (j=0;j<lista.bevande.length;j++) {
      controllo=0;
    for (k=0;k<ristoranti[idris].bevande.length;k++) {
      if(ristoranti[idris].bevande[k].nome==lista.bevande[j].nome&&ristoranti[idris].bevande[k].costo==lista.bevande[j].costo)
      {
        controllo=1;
      }
    }
    if(controllo==0){
    s+="<hr><div class='row'> <div class='col-md-12 col-xs-12'>";
    s+="<div class='row'><div class='col-md-6'><h2 class='panel-title'><strong><h2>"+lista.bevande[j].nome+"</h2></strong></h2><br>";
    s+="<strong>Costo</strong>: "+lista.bevande[j].costo;
    s+="<br><br><button type='submit' class='btn btn-success' onclick='addPiatto("+idris+",\"bevande\","+j;
    s+=");'> <span class=\"glyphicon glyphicon-plus\"></span> Aggiungi</button><br/>";
    s+="</div><div class='col-md-6'><img class='img-rounded' src='../foto/"+lista.bevande[j].foto+"'></div></div></div></div></div></div></div>";
    }
  }
  }else
  {
    s+="<h1>vuto</h1><p>Elimina un piatto!</p></h1> ";
  }

  document.getElementById("id4").innerHTML = s;
}


function subPiatto(ristorante,tipo,num){
  var risto=JSON.parse(localStorage.ristoranti);
  if(tipo=="primi")
  {
    risto[ristorante].primi.splice(num,1);
    
  }else if(tipo=="secondi")
  {
    risto[ristorante].secondi.splice(num,1);
    
  }else if(tipo=="dessert")
  {
    risto[ristorante].dessert.splice(num,1);
    
  }else if(tipo=="bevande")
  {
    risto[ristorante].bevande.splice(num,1);
    
  }
  localStorage.ristoranti = JSON.stringify(risto);
  printSubPrimi();
  ùprintSubSecondi();
  printSubDessert();
  printSubBevande();
  }


  function addPiatto(ristorante,tipo,num){
    var risto = JSON.parse(localStorage.ristoranti);
    var nextpos;
    var lista=JSON.parse(localStorage.lista);
    if(tipo=="primi")
    {
      nextpos = risto[ristorante].primi.length;
      risto[ristorante].primi[nextpos]=lista.primi[num];
      
    }else if(tipo=="secondi"){
      nextpos = risto[ristorante].secondi.length;
      risto[ristorante].secondi[nextpos]=lista.secondi[num];
      
    }else if(tipo=="dessert"){
      nextpos = risto[ristorante].dessert.length;
      risto[ristorante].dessert[nextpos]=lista.dessert[num];
      
    }else if(tipo=="bevande"){
      nextpos = risto[ristorante].bevande.length;
      risto[ristorante].bevande[nextpos]=lista.bevande[num];
      
    }
  localStorage.ristoranti = JSON.stringify(risto);
  printAddPrimi();
  printAddSecondi();
  printAddDessert();
  printAddBevande();
  }