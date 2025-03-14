///////////////////////// MODIFICA DATI
    
function modificaDati(){
  var utente = document.location.href.split("?");
  // caricamento dati dal localStorage
  var risto = JSON.parse(localStorage.ristoranti);
  var posizione = utente[1];
  var controllo=1;
  for(i=0;i<risto.length;i++){
    if (i != posizione) {
      if(risto[i].nometit==document.getElementById('titolare').value) {
        alert("ERRORE Questo nome e cognome non sono disponibili. Riprova!");
         controllo=0;
      }
    }
  }


 for(i=0;i<risto.length;i++){
    if (i != posizione) {
      if(risto[i].nome==document.getElementById('nomeazienda').value) {
        alert("ERRORE Questo nome non è disponibile. Riprova!");
         controllo=0;
      }
    }
  }
  for(i=0;i<risto.length;i++){
    if (i != posizione) {
      if(risto[i].luogo==document.getElementById('indirizzo').value) {
        alert("ERRORE Questa posizione non è disponibile. Riprova!");
        controllo=0;
      }
    }
  }
  for(i=0;i<risto.length;i++){
    if (i != posizione) {
      if(risto[i].telefono==document.getElementById('telefono').value) {
        alert("ERRORE Questo numero di telefono non è disponibile. Riprova!");
         controllo=0;
      }
    }
  }
  for(i=0;i<risto.length;i++){
    if (i != posizione) {
      if(risto[i].partitaiva==document.getElementById('piva').value) {
        alert("ERRORE In questa posizione è già registrato un altro ristorante. Riprova!");
        controllo=0;
      }
    }
  }
  
if(controllo==1){
 risto[posizione].nometit = document.getElementById('titolare').value;
  risto[posizione].stelle = document.getElementById('stelle').value;
  risto[posizione].prezzo = document.getElementById('prezzo').value;
risto[posizione].telefono = document.getElementById('telefono').value;
risto[posizione].tipo = document.getElementById('tipo').value;
risto[posizione].type = document.getElementById('tipo').value;
risto[posizione].luogo = document.getElementById('indirizzo').value;
risto[posizione].nome = document.getElementById('nomeazienda').value;
risto[posizione].pass = document.getElementById('titpass').value;
risto[posizione].partitaiva = document.getElementById('piva').value;
risto[posizione].foto = document.getElementById('foto').value;
risto[posizione].tempoattesa = document.getElementById('tempoattesa').value;
  // salvo i dati nel localStorage
  localStorage.ristoranti = JSON.stringify(risto);

  //alert("La tua modifica è stata effettuata! Vai al tuo account...");

  window.location.href = "login.html";
}
window.location.href = "register.html";
  return true;
  

}