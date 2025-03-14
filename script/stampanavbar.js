function stampaNavbar(){
    var controllo = 0;//variabile utilizza per vedere se esistono account nel local storage e se c'è ne uno
    if (typeof(localStorage.utenti) != "undefined") {
    // caricamento dati dal localStorage
    var vutenti = JSON.parse(localStorage.getItem("utenti"));

    for(i=0;i<vutenti.length;i++) {
      if(vutenti[i].l==1) {
        document.getElementById("navbarstampa").innerHTML=vutenti[i].nc;
        controllo = 1;
      }
    }
  }
  if (typeof(localStorage.ristoranti) != "undefined") {
    var risto = JSON.parse(localStorage.getItem("ristoranti"));
    for(i=0;i<risto.length;i++) {
      if(risto[i].l==1) {
        document.getElementById("navbarstampa").innerHTML=risto[i].nome;
        controllo = 1;
      }
    }
  }
  if(controllo==0)
      document.getElementById("navbarstampa").innerHTML=" Accedi";
}