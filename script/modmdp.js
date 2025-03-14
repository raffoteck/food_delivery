///////////////////////// MODIFICA DATI
    
function modificaDati(){
  var utente = document.location.href.split("?");
  // caricamento dati dal localStorage
  var vutenti = JSON.parse(localStorage.utenti);
  posizione = utente[1];

  if (vutenti[posizione].p==document.modifica.metodopagamento.value) {
    alert("ERRORE Il nuovo metodo di pagamento deve essere diverso dal vecchio.");
    return false;
  }

  vutenti[posizione].metodopagamento = document.modifica.metodopagamento.value;
  // salvo i dati nel localStorage
  localStorage.utenti = JSON.stringify(vutenti);

  alert("La tua modifica è stata effettuata! Vai al tuo account...");

  window.location.href = "account.html";
  return false; // così non c'è refresh

}