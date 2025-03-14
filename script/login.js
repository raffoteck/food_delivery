///////////////////////// CONTROLLA LOGIN

function checkLogin(){

  // caricamento dati dal localStorage
  var vutenti = JSON.parse(localStorage.utenti);

  for (i=0;i<vutenti.length;i++)
    if (vutenti[i].l==1)
      window.location.href = "account.html";

    var risto = JSON.parse(localStorage.ristoranti);

    for (i=0;i<risto.length;i++)
    if (risto[i].l==1)
      window.location.href = "ristoaccount.html";

}

///////////////////////// LOGIN UTENTE

function loginUtente() {

  // caricamento dati dal localStorage
  var vutenti = JSON.parse(localStorage.utenti);

  // dati inseriti
  var datiform = {
    nc:document.login.nomecognome.value,
    p:document.login.password.value
  };

  for (i=0;i<vutenti.length;i++) {

    // se i dati inseriti combaciano con un utente salvato nel local storage
    if((vutenti[i].nc==datiform.nc)&&(vutenti[i].p==datiform.p)) {

      vutenti[i].l = 1; // imposto il login a 1 cosi' so che e' dentro
      localStorage.utenti = JSON.stringify(vutenti); // trasformo e invio al local storage

      window.location.href = "account.html";

      return true;

    } // if
  } // for
  var risto = JSON.parse(localStorage.ristoranti);

    for (i=0;i<risto.length;i++){
    	if((risto[i].nome==datiform.nc)&&(risto[i].pass==datiform.p)) {

      risto[i].l = 1; // imposto il login a 1 cosi' so che e' dentro
      localStorage.ristoranti = JSON.stringify(risto); // trasformo e invio al local storage

      window.location.href = "ristoaccount.html";

      return true;

    }
    }
  alert("ERRORE! I dati inseriti NON sono corretti, riprova!");
  return false;

}