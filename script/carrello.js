function mostraCarrello(){

	var s = new String("");
	var vutenti = JSON.parse(localStorage.utenti);
	var u;
	var i;
	var controllo=0;
	var costototale=0;
	for(i=0;i<vutenti.length;i++){
  	if(vutenti[i].l==1)
  		{controllo=1;u=i;}
	}
	if(controllo==0)
	{
		alert("devi accedere");
		s+="<p>Sembra essere vuoto..</p><img src=\"../foto/cart.png\"><p><a href=\"index.html\">Torna alla home</a></p>";
	document.getElementById("emp").innerHTML = s;
	}
	else if(vutenti[u].prenotazione.length==0)
	{
		s+="<p>Sembra essere vuoto..</p><img src=\"../foto/cart.png\"><p><a href=\"index.html\">Torna alla home</a></p>";
	document.getElementById("emp").innerHTML = s;
	}
	else
	{
		for(i=0;i<vutenti[u].prenotazione.length;i++)
		{
		s+="<div class=\"panel panel-default\"><div class=\"panel-body\"><div class=\"row\"><div class=\"col-md-12\"><div class=\"col-md-2\">";
	    s+="<div class=\"setbg\" style=\"background-image: url(../foto/"+vutenti[u].prenotazione[i].foto+")\"></div></div><div class=\"col-md-6\">";
	    s+="<h2>"+vutenti[u].prenotazione[i].nome+"</h2></div><div class=\"col-md-2\"><div class=\"number-input\"><button onclick=\"this.parentNode.querySelector('input[type=number]').stepDown();sub("+u+","+i+")\" ></button>";
	    s+="<input class=\"quantity\" min=\"0\" name=\"quantity\" value="+vutenti[u].prenotazione[i].quantita+" type=\"number\"><button onclick=\"this.parentNode.querySelector('input[type=number]').stepUp();add("+u+","+i+")\" class=\"plus\"></button></div></div><div class=\"col-md-2 setprice\">";
	    s+="<p>"+vutenti[u].prenotazione[i].costo+"€</p></div></div></div></div></div>"
	    costototale=costototale+vutenti[u].prenotazione[i].costo*vutenti[u].prenotazione[i].quantita;
		}

	    s+="<h1 id=\"tot\">Totale: "+costototale+"€</h1><a href=\"account.html\"><button type=\"submit\" class=\"btn btn-success pull-right\" onclick=\"prenotaPiatti(0);\"><span class=\"glyphicon glyphicon-shopping-cart\"></span> Paga online</button></a><a href=\"account.html\"><button type=\"submit\" class=\"btn btn-success pull-right shopbtn\" onclick=\"prenotaPiatti(1);\"><span class=\"glyphicon glyphicon-tag\"></span> Paga in negozio</button></a>";
		document.getElementById("elenco").innerHTML = s;
	}
    

}

function rimuoviPiatto(u,el){
	var vutenti = JSON.parse(localStorage.utenti);
	vutenti[u].prenotazione.splice(el,1);
	localStorage.utenti = JSON.stringify(vutenti);
	mostraCarrello();
}

function add(u,i){

	var vutenti = JSON.parse(localStorage.utenti);
	vutenti[u].prenotazione[i].quantita=vutenti[u].prenotazione[i].quantita+1;
	localStorage.utenti = JSON.stringify(vutenti);
	riscriviTotale(u);
}

function sub(u,i){

	var vutenti = JSON.parse(localStorage.utenti);
	vutenti[u].prenotazione[i].quantita=vutenti[u].prenotazione[i].quantita-1;
	localStorage.utenti = JSON.stringify(vutenti);
	riscriviTotale(u);
}

function riscriviTotale(u){

	var s = new String("");
	var vutenti = JSON.parse(localStorage.utenti);
	var u;
	var i;
	var ct=0;
	 s+="<h1 id=\"tot\">Totale: ";
	 for(i=0;i<vutenti[u].prenotazione.length;i++)
	 {
	 	ct=ct+vutenti[u].prenotazione[i].quantita*vutenti[u].prenotazione[i].costo
	 }
	 s+=ct+"€</h1>";

	 document.getElementById("tot").innerHTML = s;
 }

function prenotaPiatti(x){
	var u,x,temp;
	var controllo;
	var i,k;
	var nextpos,tattesa=0;
	var vutenti = JSON.parse(localStorage.utenti);
	var risto = JSON.parse(localStorage.ristoranti);

	for(i=0;i<vutenti.length;i++){
  	if(vutenti[i].l==1)
  		{controllo=1;u=i;}
	}
	for(i=0;i<vutenti[u].prenotazione.length;i++)
	{
		if(vutenti[u].prenotazione[i].quantita==0)
		{
			rimuoviPiatto(u,i);
		}
	}
	controllo=0;
	for(i=0;i<vutenti[u].prenotazione.length;i++)
	{
		if(vutenti[u].prenotazione[i].quantita!=null)
		{
			controllo=1;
		}
	}
	if(controllo==1)
	{
vutenti[u].prenotazione[0].pagamento=x;
var piatto;
for(i=0;i<risto.length;i++)
{
	for(k=0;k<vutenti[u].prenotazione.length;k++)
	{
		if(vutenti[u].prenotazione[k].ris==i)
		{
			 nextpos = risto[i].prenotazioni.length;
			 piatto={
				nomePiatto:vutenti[u].prenotazione[k].nome,
				costo:vutenti[u].prenotazione[k].costo,
				foto:vutenti[u].prenotazione[k].foto,
				quantita:vutenti[u].prenotazione[k].quantita,
				pagamento:vutenti[u].prenotazione[k].pagamento,
				nome:vutenti[u].nc
				};
				risto[i].prenotazioni[nextpos]=piatto;
		}
	}
}

			for(i=0;i<vutenti[u].prenotazione.length;i++)
			{
			x=parseInt(vutenti[u].prenotazione[i].ris);
              temp=vutenti[u].prenotazione[i].quantita*risto[x].tempoattesa;
              risto[x].minutiattesa=temp+risto[x].minutiattesa;
              if(risto[x].minutiattesa>tattesa)
              {
                tattesa=risto[x].minutiattesa;
                vutenti[u].prenotazione[0].tempoattesa=tattesa;
              }
          }

	 nextpos = vutenti[u].storico.length;
	vutenti[u].storico[nextpos]=vutenti[u].prenotazione;
}
	vutenti[u].prenotazione=[];
	localStorage.utenti = JSON.stringify(vutenti);
	localStorage.ristoranti = JSON.stringify(risto);
	mostraCarrello();

}