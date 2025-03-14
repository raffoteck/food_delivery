function inizializzaStorageUtenti(){
  if (typeof(localStorage.utenti) == "undefined") {
    localStorage.utenti="[]";
  }
}