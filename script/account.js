function stampaDatiUtente(){

  // caricamento dati dal localStorage
  var vutenti = JSON.parse(localStorage.utenti);

  var s = new String("");

  for (i=0;i<vutenti.length;i++){

    if (vutenti[i].l==1) {

      s+="<strong>Nome e cognome</strong>: "+vutenti[i].nc;
      s+=" <a href='modname.html?"+i+"'>modifica</a><br/><br/>";
      s+="<strong>Password</strong>: *****";
      s+=" <a href='modpwd.html?"+i+"'>modifica</a><br/><br/>";
      s+="<strong>Numero di carta</strong>: "+vutenti[i].metodopagamento;
      s+=" <br><a href='modmdp.html?"+i+"'>modifica dati di pagamento</a>";


    } // if

  } // for

  document.getElementById("vistaDatiUtente").innerHTML = s;

  return true;

}

///////////////////////// STAMPA PRENOTAZIONI UTENTE

function stampaPrenotazioniUtente(){

  var vutenti = JSON.parse(localStorage.utenti);
  var vristoranti = JSON.parse(localStorage.ristoranti);

  var s = new String("");
  var u;
  var nome = new String("");
  var costo;
  var qtot=0;
  var i;
  var j;
  var x;
  var q;
  var ris;
  var costototale=0;
  for(i=0;i<vristoranti.length;i++)
  {
    for(j=0;j<vristoranti[i].primi.length;j++)
    {
      vristoranti[i].primi[j].qt=0;
    }
    for(j=0;j<vristoranti[i].secondi.length;j++)
    {
      vristoranti[i].secondi[j].qt=0;
    }
    for(j=0;j<vristoranti[i].dessert.length;j++)
    {
      vristoranti[i].dessert[j].qt=0;
    }
    for(j=0;j<vristoranti[i].bevande.length;j++)
    {
      vristoranti[i].bevande[j].qt=0;
    }
  }
  for(i=0;i<vutenti.length;i++){
    if(vutenti[i].l==1)
      {u=i;}
  }
  if (vutenti[u].storico.length==0) {
    s+="<div class='alert alert-danger'>Nessuna prenotazione :( </div>";
    s+="<button onclick='prenotaOra();' class='btn btn-raised btn-success'><span class='glyphicon glyphicon-calendar'></span> Ordina</button>";
  }
  else{
      for(i=vutenti[u].storico.length-1;i>=0;i--)
      {
        costototale=0;
        tattesa=0;
        if(vutenti[u].storico[i].length>0)
        {
        	if(vutenti[u].storico[i][0].pagamento==0){
        		s+="<p class='pagamento'>Pagato online</p>";
        	}else{
        		s+="<p class='pagamento1'>Da pagare al ritiro</p>";
        	}
        }
        s+="<h1>Prenotazione "+(i+1)+" </h1><hr>";
          for(j=0;j<vutenti[u].storico[i].length;j++)
          {
            if(vutenti[u].storico[i][j].quantita!="undefined"&&vutenti[u].storico[i][j].quantita!=null)
      {
              s+="<div class=\"panel panel-default\"><div class=\"panel-body\"><div class=\"row\"><div class=\"col-md-12\"><div class=\"col-md-2\">";
            s+="<div class=\"setbg\" style=\"background-image: url(../foto/"+vutenti[u].storico[i][j].foto+")\"></div></div><div class=\"col-md-6 fixtop\">";
            s+="<h2>"+vutenti[u].storico[i][j].nome+"</h2></div><div class=\"col-md-2 fixtop\"><h3>Qt:";
            s+=vutenti[u].storico[i][j].quantita+"</h3></div><div class=\"col-md-2 setprice\">";
            s+="<p>"+vutenti[u].storico[i][j].costo+"€</p></div></div></div></div></div>"
            costototale=costototale+vutenti[u].storico[i][j].costo*vutenti[u].storico[i][j].quantita;
            x=parseInt(vutenti[u].storico[i][j].ris);
            
            for(q=0;q<vristoranti[x].primi.length;q++)
            { 
              if(vristoranti[x].primi[q].nome==vutenti[u].storico[i][j].nome&&vutenti[u].storico[i][j].costo==parseFloat(vristoranti[x].primi[q].costo))
              {
              vristoranti[x].primi[q].qt=vutenti[u].storico[i][j].quantita+vristoranti[x].primi[q].qt;
            }}
            for(q=0;q<vristoranti[x].secondi.length;q++)
            {
              if(vristoranti[x].secondi[q].nome==vutenti[u].storico[i][j].nome&&vutenti[u].storico[i][j].costo==parseFloat(vristoranti[x].secondi[q].costo))
              {
              vristoranti[x].secondi[q].qt=vutenti[u].storico[i][j].quantita+vristoranti[x].secondi[q].qt;
            }
            }
            for(q=0;q<vristoranti[x].dessert.length;q++)
            {
              if(vristoranti[x].dessert[q].nome==vutenti[u].storico[i][j].nome&&vutenti[u].storico[i][j].costo==parseFloat(vristoranti[x].dessert[q].costo))
              {
              vristoranti[x].dessert[q].qt=vutenti[u].storico[i][j].quantita+vristoranti[x].dessert[q].qt;
            }
            }
            for(q=0;q<vristoranti[x].bevande.length;q++)
            {
              if(vristoranti[x].bevande[q].nome==vutenti[u].storico[i][j].nome&&vutenti[u].storico[i][j].costo==parseFloat(vristoranti[x].bevande[q].costo))
              {
              vristoranti[x].bevande[q].qt=vutenti[u].storico[i][j].quantita+vristoranti[x].bevande[q].qt;
            }
            }
          }
        }

            s+="<h1 id=\"tot\">Totale: "+costototale+"€</h1><p class=\"attesa\"><span class=\"glyphicon glyphicon-time\"></span> Tempo di attesa: "+vutenti[u].storico[i][0].tempoattesa+" min.</p><hr>";
      }
    s+="<button onclick='prenotaOra();' class='btn btn-raised btn-success'><span class='glyphicon glyphicon-calendar'></span> Ordina</button>";
  if(vutenti[u].servizzi==1){
  for(i=0;i<vristoranti.length;i++)
  {
    for(j=0;j<vristoranti[i].primi.length;j++)
    {
      if(vristoranti[i].primi[j].qt>qtot)
      {
        nome=vristoranti[i].primi[j].nome;
        costo=vristoranti[i].primi[j].costo;
        qtot=vristoranti[i].primi[j].qt;
        ris=i;
      }
    }
    for(j=0;j<vristoranti[i].secondi.length;j++)
    {
      if(vristoranti[i].secondi[j].qt>qtot)
      {
        nome=vristoranti[i].secondi[j].nome;
        costo=vristoranti[i].secondi[j].costo;
        qtot=vristoranti[i].secondi[j].qt;
        ris=i;
      }
    }
    for(j=0;j<vristoranti[i].dessert.length;j++)
    {
      if(vristoranti[i].dessert[j].qt>qtot)
      {
        nome=vristoranti[i].dessert[j].nome;
        costo=vristoranti[i].dessert[j].costo;
        qtot=vristoranti[i].dessert[j].qt;
        ris=i;
      }
    }
    for(j=0;j<vristoranti[i].bevande.length;j++)
    {
      if(vristoranti[i].bevande[j].qt>qtot)
      {
        nome=vristoranti[i].bevande[j].nome;
        costo=vristoranti[i].bevande[j].costo;
        qtot=vristoranti[i].bevande[j].qt;
        ris=i;
      }
    }
  }
  var max={
    nome:nome,
    costo:costo,
    ris:ris
  }
  vutenti[u].preferito=max;
}
  localStorage.utenti = JSON.stringify(vutenti);
  localStorage.ristoranti = JSON.stringify(vristoranti);
  }
  
  document.getElementById("vistaPrenotazioniUtente").innerHTML = s;
}

function prenotaOra(){

  window.location.href = "index.html";

}

///////////////////////// ESCI ACCOUNT

function esciAccount(){
  
  // caricamento dati dal localStorage
  var vutenti = JSON.parse(localStorage.utenti);

  for (i=0;i<vutenti.length;i++){

    if (vutenti[i].l==1) {

      vutenti[i].l=0;
      localStorage.utenti = JSON.stringify(vutenti);
      alert("Logout avvenuto con successo");
      window.location.href = "index.html";
      return true;

    } // if

  } // for

}

///////////////////////// CANCELLA ACCOUNT

function cancellaAccount(){

  // caricamento dati dal localStorage
  var vutenti = JSON.parse(localStorage.utenti);

  // cerco utente loggato
  for(var i=0; i<vutenti.length;i++)
    if(vutenti[i].l==1)
      var nomeutente = new String(vutenti[i].nc);

  // rimuovo i valori con splice()
  for (var i=0; i<vutenti.length; i++)
    if (vutenti[i].nc == nomeutente)
      vutenti.splice(i, 1); // splice (index, howmany)

  // salvo i dati nel localStorage
  localStorage.utenti = JSON.stringify(vutenti);

  alert("Account cancellato con successo!");
  window.location.href = "index.html";
  return false;

}