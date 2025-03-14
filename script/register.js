///////////////////////// CONTROLLA LOGIN
 var servizzi;

function checkLogin(){

  // caricamento dati dal localStorage
  var vutenti = JSON.parse(localStorage.utenti);
  var risto=JSON.parse(localStorage.ristoranti);

  for (i=0;i<vutenti.length;i++)
    if (vutenti[i].l==1)
      window.location.href = "account.html";
    for (i=0;i<risto.length;i++)
    if (risto[i].l==1)
      window.location.href = "ristoaccount.html";
servizzi=0;
}
function setServizzi(){
  servizzi=1;
}
///////////////////////// REGISTRAZIONE UTENTE

function registrazioneUtente() {

  // caricamento dati dal localStorage
  var vutenti = JSON.parse(localStorage.utenti);
  // dati form
  var datiform = {
    l:1, // quando si registra e' automaticamente loggato
    nc:document.getElementById('nomecognome1').value,
    p:document.getElementById('password1').value,
    prenotazione: [],
    storico: [],
    preferito: "undefined",
    metodopagamento: document.getElementById('metodopagamento1').value,
    servizzi:servizzi
  };

  // controllo se l'utente e' gia' inserito
  for (i=0;i<vutenti.length;i++) {
    if(vutenti[i].nc==datiform.nc) {
      alert("ERRORE Qualcuno ha già questo nome e cognome. Riprova!");
      return false;
    }
  }

  // metto i dati nell'ultima posizione
  vutenti[vutenti.length] = datiform;

  // salvo i dati nel localStorage
  localStorage.utenti = JSON.stringify(vutenti);

  window.location.href = "account.html";

  return true;

}
function registrazioneRistorante(){
  var risto = JSON.parse(localStorage.ristoranti);
  // dati form
  var datiform = {
    l:1, // quando si registra e' automaticamente loggato
    pass:document.getElementById('titpass').value,
    nometit:document.getElementById('titolare').value,
    nome:document.getElementById('nomeazienda').value,
    tipo:document.getElementById('tipo').value,
    type:document.getElementById('tipo').value,
    luogo:document.getElementById('indirizzo').value,
    telefono:document.getElementById('telefono').value,
    partitaiva:document.getElementById('piva').value,
    prezzo: document.getElementById('prezzo').value,
    stelle: document.getElementById('stelle').value,
    foto:document.getElementById('foto').value,
    tempoattesa: document.getElementById('tempoattesa').value,
    minutiattesa: 0,
    primi:[],
    secondi:[],
    dessert:[],
    bevande:[],
    prenotazioni:[]
  };

  for (i=0;i<risto.length;i++) {
    if(risto[i].nometit==datiform.nometit) {
      alert("ERRORE Qualcuno ha già questo nome e cognome. Riprova!");
      return false;
    }
    if(risto[i].nome==datiform.nome) {
      alert("ERRORE Qualcuno ha già questo nome di azienda. Riprova!");
      return false;
    }
    if(risto[i].luogo==datiform.luogo) {
      alert("ERRORE Qualcuno ha già scelto questo luogo Riprova!");
      return false;
    }
    if(risto[i].telefono==datiform.telefono) {
      alert("ERRORE Qualcuno ha già questo telefono. Riprova!");
      return false;
    }
    if(risto[i].partitaiva==datiform.partitaiva) {
      alert("ERRORE Qualcuno ha già questa pqerita iva. Riprova!");
      return false;
    }
  }

  // metto i dati nell'ultima posizione
  risto[risto.length] = datiform;

  // salvo i dati nel localStorage
  localStorage.ristoranti = JSON.stringify(risto);

  window.location.href = "ristoaccount.html";

  return true;
}