///////////////////////// MODIFICA DATI
    
function modificaDati(){
  var utente = document.location.href.split("?");
  // caricamento dati dal localStorage
  var vutenti = JSON.parse(localStorage.utenti);
  posizione = utente[1];

  if (vutenti[posizione].p==document.modifica.password.value) {
    alert("ERRORE La nuova password deve essere diversa da quella vecchia.");
    return false;
  }

  vutenti[posizione].p = document.modifica.password.value;

  // salvo i dati nel localStorage
  localStorage.utenti = JSON.stringify(vutenti);

  alert("La tua modifica è stata effettuata! Vai al tuo account...");

  window.location.href = "account.html";
  return false; // così non c'è refresh

}