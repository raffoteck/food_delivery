///////////////////////// MODIFICA DATI
    
function modificaDati(){
  var utente = document.location.href.split("?");
  // caricamento dati dal localStorage
  var vutenti = JSON.parse(localStorage.utenti);
  posizione = utente[1];

  for(i=0;i<vutenti.length;i++){
    if (i != posizione) {
      if(vutenti[i].nc==document.modifica.nomecognome.value) {
        alert("ERRORE Questo nome e cognome non sono disponibili. Riprova!");
        return false;
      }
    }
  }

  if (vutenti[posizione].nc==document.modifica.nomecognome.value) {
    alert("ERRORE Nome e cognome devono essere diversi da quelli vecchi.");
    return false;
  }

  vutenti[posizione].nc = document.modifica.nomecognome.value;

  // salvo i dati nel localStorage
  localStorage.utenti = JSON.stringify(vutenti);

  alert("La tua modifica è stata effettuata! Vai al tuo account...");

  window.location.href = "account.html";
  return false; // così non c'è refresh

}