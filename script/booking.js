var idris;

///////////////////////// STAMPA DATI RISTORANTE

function stampaDatiRistorante(){
	//capisco quale ristorante carico
	var v = document.location.href.split("?");
	a=v[1];
	idris=a;

	// caricamento dati dal localStorage
	var vristoranti = JSON.parse(localStorage.ristoranti);
	var vutenti = JSON.parse(localStorage.utenti);

	// variabili che mi serviranno durante la funzione
	var j; // variabile per ciclare il menu
	var k;
	var u=-1;
	var s = new String(""); // stringa da stampare
	var nome = new String("");
	var f = new String(""); // stringa da stampare
	var controllo = 0; // variabile per non far stampare il form di prenotazione
	for(i=0;i<vutenti.length;i++){
  	if(vutenti[i].l==1)
  		{controllo=1;u=i;}
	}
	
	// stampo i dati del ristorante
	s+="<div class='row'><div class='col-md-6'>";
	s+="<strong>Nome</strong>: "+vristoranti[idris].nome+"<br/>";
	s+="<strong>Cucina</strong>: "+vristoranti[idris].type+"<br/>";
	s+="<strong>Luogo</strong>: "+vristoranti[idris].luogo+"<br/>";
	s+="<strong>Prezzo</strong>: "+vristoranti[idris].prezzo+"<br/>";
	s+="<strong>Partita iva</strong>: "+vristoranti[idris].partitaiva+"<br/>";
	s+="<strong>Stelle</strong>: ";
	
	for(j=0;j<vristoranti[idris].stelle-1;j++) // stelline piene
		s+="<span class='glyphicon glyphicon-star' aria-hidden='true'></span>";
	for(;j<5;j++) // stelline vuote
		s+="<span class='glyphicon glyphicon-star-empty' aria-hidden='true'></span>";
  	
  	s+=" ("+vristoranti[idris].stelle+")<br/>";
  	s+="</div><div class='col-md-6'><img class='img-rounded' src='../foto/"+vristoranti[idris].foto+"'></div></div>";
  	s+="<hr><h1>Primi</h1>";

  	for (k=0;k<vristoranti[idris].primi.length;k++) {
  	nome=vristoranti[idris].primi[k].nome;
    s+="<hr><div class='row'> <div class='col-md-12 col-xs-12'>";
    s+="<div class='row'><div class='col-md-6'><h2 class='panel-title'><strong><h2>"+vristoranti[idris].primi[k].nome+"</h2></strong></h2><br><strong>ingredienti</strong><br> ";
    for (var z=0;z<vristoranti[idris].primi[k].ingredienti.length;z++) {
    s+="- "+vristoranti[idris].primi[k].ingredienti[z]+"<br/>"; }
    if(controllo!=0)
    if(vutenti[u].preferito.nome==vristoranti[idris].primi[k].nome&&vristoranti[idris].primi[k].costo==vutenti[u].preferito.costo&&idris==vutenti[u].preferito.ris)
	{
	s+="<h3 style=\"color:red\">OFFERTA SPECIALE!!!</h3>";
    s+="<strong>Il costo e'</strong>: "+(parseFloat(vristoranti[idris].primi[k].costo)-(parseFloat(vristoranti[idris].primi[k].costo)/100)*20)+" <strong>invece che </strong>"+vristoranti[idris].primi[k].costo;
    s+="<br><br><button type='submit' class='btn btn-success' onclick='prenotaPiatto("+u+",\""+nome+"\","+(parseFloat(vristoranti[idris].primi[k].costo)-(parseFloat(vristoranti[idris].primi[k].costo)/100)*20)+",\""+vristoranti[idris].primi[k].foto+"\","+idris+")'><span class='glyphicon glyphicon-shopping-cart'></span> Ordina</button><br/>";
	}else{
	s+="<strong>Costo</strong>: "+vristoranti[idris].primi[k].costo;
    s+="<br><br><button type='submit' class='btn btn-success' onclick='prenotaPiatto("+u+",\""+nome+"\","+vristoranti[idris].primi[k].costo+",\""+vristoranti[idris].primi[k].foto+"\","+idris+")'><span class='glyphicon glyphicon-shopping-cart'></span> Ordina</button><br/>";
	}

    s+="</div><div class='col-md-6'><img class='img-rounded' src='../foto/"+vristoranti[idris].primi[k].foto+"'></div></div></div></div></div></div></div>";}

    s+="<h1>Secondi</h1>";

  	for (k=0;k<vristoranti[idris].secondi.length;k++) {

    s+="<hr><div class='row'> <div class='col-md-12 col-xs-12'>";
    s+="<div class='row'><div class='col-md-6'><h2 class='panel-title'><strong><h2>"+vristoranti[idris].secondi[k].nome+"</h2></strong></h2><br><strong>ingredienti</strong><br> ";
    for (var z=0;z<vristoranti[idris].secondi[k].ingredienti.length;z++) {
    s+="- "+vristoranti[idris].secondi[k].ingredienti[z]+"<br/>"; }
    if(controllo!=0)
    if(vutenti[u].preferito.nome==vristoranti[idris].secondi[k].nome&&vristoranti[idris].secondi[k].costo==vutenti[u].preferito.costo&&idris==vutenti[u].preferito.ris)
	{
	s+="<h3 style=\"color:red\">OFFERTA SPECIALE!!!</h3>";
    s+="<strong>Il costo e'</strong>: "+(parseFloat(vristoranti[idris].secondi[k].costo)-(parseFloat(vristoranti[idris].secondi[k].costo)/100)*20)+" <strong>invece che </strong>"+vristoranti[idris].secondi[k].costo;
    s+="<br><br><button type='submit' class='btn btn-success' onclick='prenotaPiatto("+u+",\""+nome+"\","+(parseFloat(vristoranti[idris].secondi[k].costo)-(parseFloat(vristoranti[idris].secondi[k].costo)/100)*20)+",\""+vristoranti[idris].secondi[k].foto+"\","+idris+")'><span class='glyphicon glyphicon-shopping-cart'></span> Ordina</button><br/>";
	}else{
    s+="<strong>Costo</strong>: "+vristoranti[idris].secondi[k].costo+"<br><br><button type='submit' class='btn btn-success' onclick='prenotaPiatto("+u+",\""+vristoranti[idris].secondi[k].nome+"\","+vristoranti[idris].secondi[k].costo+",\""+vristoranti[idris].secondi[k].foto+"\","+idris+")'><span class='glyphicon glyphicon-shopping-cart'></span> Ordina</button><br/>";
    }
    s+="</div><div class='col-md-6'><img class='img-rounded' src='../foto/"+vristoranti[idris].secondi[k].foto+"'></div></div></div></div></div></div></div>";}
  	

  	s+="<h1>Dessert</h1>";

  	for (k=0;k<vristoranti[idris].dessert.length;k++) {

    s+="<hr><div class='row'> <div class='col-md-12 col-xs-12'>";
    s+="<div class='row'><div class='col-md-6'><h2 class='panel-title'><strong><h2>"+vristoranti[idris].dessert[k].nome+"</h2></strong></h2><br><strong>ingredienti</strong><br> ";
    for (var z=0;z<vristoranti[idris].dessert[k].ingredienti.length;z++) {
    s+="- "+vristoranti[idris].dessert[k].ingredienti[z]+"<br/>"; }
    if(controllo!=0)
    if(vutenti[u].preferito.nome==vristoranti[idris].dessert[k].nome&&vristoranti[idris].dessert[k].costo==vutenti[u].preferito.costo&&idris==vutenti[u].preferito.ris)
	{
	s+="<h3 style=\"color:red\">OFFERTA SPECIALE!!!</h3>";
    s+="<strong>Il costo e'</strong>: "+(parseFloat(vristoranti[idris].dessert[k].costo)-(parseFloat(vristoranti[idris].dessert[k].costo)/100)*20)+" <strong>invece che </strong>"+vristoranti[idris].dessert[k].costo;
    s+="<br><br><button type='submit' class='btn btn-success' onclick='prenotaPiatto("+u+",\""+nome+"\","+(parseFloat(vristoranti[idris].dessert[k].costo)-(parseFloat(vristoranti[idris].dessert[k].costo)/100)*20)+",\""+vristoranti[idris].dessert[k].foto+"\","+idris+")'><span class='glyphicon glyphicon-shopping-cart'></span> Ordina</button><br/>";
	}else{
    s+="<strong>Costo</strong>: "+vristoranti[idris].dessert[k].costo+"<br><br><button type='submit' class='btn btn-success' onclick='prenotaPiatto("+u+",\""+vristoranti[idris].dessert[k].nome+"\","+vristoranti[idris].dessert[k].costo+",\""+vristoranti[idris].dessert[k].foto+"\","+idris+")'><span class='glyphicon glyphicon-shopping-cart'></span> Ordina</button><br/>";
    
      }s+="</div><div class='col-md-6'><img class='img-rounded' src='../foto/"+vristoranti[idris].dessert[k].foto+"'></div></div></div></div></div></div></div>";}
  	

  	s+="<h1>Bevande</h1>";

  	for (k=0;k<vristoranti[idris].bevande.length;k++) {

    s+="<hr><div class='row'> <div class='col-md-12 col-xs-12'>";
    s+="<div class='row'><div class='col-md-6'><h2 class='panel-title'><strong><h2>"+vristoranti[idris].bevande[k].nome+"</h2></strong></h2><br><strong>ingredienti</strong><br> ";
    if(controllo!=0)
    if(vutenti[u].preferito.nome==vristoranti[idris].bevande[k].nome&&vristoranti[idris].bevande[k].costo==vutenti[u].preferito.costo&&idris==vutenti[u].preferito.ris)
	{
	s+="<h3 style=\"color:red\">OFFERTA SPECIALE!!!</h3>";
    s+="<strong>Il costo e'</strong>: "+(parseFloat(vristoranti[idris].bevande[k].costo)-(parseFloat(vristoranti[idris].bevande[k].costo)/100)*20)+" <strong>invece che </strong>"+vristoranti[idris].bevande[k].costo;
    s+="<br><br><button type='submit' class='btn btn-success' onclick='prenotaPiatto("+u+",\""+nome+"\","+(parseFloat(vristoranti[idris].bevande[k].costo)-(parseFloat(vristoranti[idris].bevande[k].costo)/100)*20)+",\""+vristoranti[idris].bevande[k].foto+"\","+idris+")'><span class='glyphicon glyphicon-shopping-cart'></span> Ordina</button><br/>";
	}else{
		s+="<strong>Costo</strong>: "+vristoranti[idris].bevande[k].costo+"<br><br><button type='submit' class='btn btn-success' onclick='prenotaPiatto("+u+",\""+vristoranti[idris].bevande[k].nome+"\","+vristoranti[idris].bevande[k].costo+",\""+vristoranti[idris].bevande[k].foto+"\","+idris+")'><span class='glyphicon glyphicon-shopping-cart'></span> Ordina</button><br/>";
    }s+="</div><div class='col-md-6'><img class='img-rounded' src='../foto/"+vristoranti[idris].bevande[k].foto+"'></div></div></div></div></div></div></div>";}
  	
    
	if(controllo == 0)
		{f+="Devi avere un account <br>se vuoi ordinare, <a href='register.html'>registrati ora</a>!<br/><br/>Oppure <a href='login.html'>accedi</a>.";}
	else
	{f+="<h1>Vuoto</h1>"}
	
	// mando le stringhe create nei rispettivi div di
	document.getElementById("vistaDatiRistorante").innerHTML = s;
	document.getElementById("formPrenotazione").innerHTML = f;
	aggiornaCarrello(u);
	return true;

}

function prenotaPiatto(u,nome,costo,foto,id) {

	var vutenti = JSON.parse(localStorage.utenti);
	var c=-1;
	var i;
	var quantita=1;
	var pag=0,t=0;
	for(i=0;i<vutenti[u].prenotazione.length;i++)
	{
		if(vutenti[u].prenotazione[i].nome==nome&&vutenti[u].prenotazione[i].costo==costo)
			{c=i;}
	}
	if(c!=-1)
	{
		vutenti[u].prenotazione[c].quantita=vutenti[u].prenotazione[c].quantita+1;
	}
	else{
		quantita=1;
	var piatto={
		nome:nome,
		costo:costo,
		foto:foto,
		quantita:quantita,
		ris:id,
		pagamento:pag,
		tempoattesa:t
	}
	var nextpos = vutenti[u].prenotazione.length;
	vutenti[u].prenotazione[nextpos]=piatto;}

	localStorage.utenti = JSON.stringify(vutenti);
	aggiornaCarrello(u);
}

function aggiornaCarrello(u) {
	var vutenti = JSON.parse(localStorage.utenti);
	var s = new String("");
	var i;
	if(u!=-1)
	{
	for(i=0;i<vutenti[u].prenotazione.length;i++)
	{
		s+="<pre>-"+vutenti[u].prenotazione[i].nome+" : "+vutenti[u].prenotazione[i].costo+"  Qt: "+vutenti[u].prenotazione[i].quantita+"</pre>";
	}
	if(vutenti[u].prenotazione.length!=0)
	{
	s+="<a href=\"carrello.html\"><button type='submit' class='btn btn-success btn-block' ><span class='glyphicon glyphicon-ok'></span> ORDINA</button></form></a>";
	document.getElementById("formPrenotazione").innerHTML = s;}
}
}
///////////////////////// FORM PRENOTAZIONE

