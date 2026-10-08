/* Dashboard Mobile – Dyhrberg AG
   Schlanke Handy-Version: Kundenliste mit Entfernung, Karte, schlafende Kunden, Neukunden-Meldung.
   Liest data/data.js, data/geo-plz.js, data/geo-kunden.js (Adresskoordinaten), data/users.js, data/plz-ort.js. Nur lesen, es wird nichts gespeichert ausser Anmeldung/Sprache im Browser. */
(function(){
'use strict';

// ---------- Texte (Deutsch = Schlüssel) ----------
var FR={
'Name':'Nom','Anmelden':'Se connecter','Neu laden':'Recharger','Abmelden':'Se déconnecter','Gebiet':'Secteur','Alle Gebiete':'Tous les secteurs',
'Sortierung':'Tri','Nähe':'Proximité','Umsatz':'Chiffre d’affaires','Kunden':'Clients','Karte':'Carte','Schlafend':'Dormants','Neuer Kunde':'Nouveau client',
'Name, Ort, PLZ oder Nr.':'Nom, lieu, NPA ou n°','Alle':'Tous','Mit Umsatz 2026':'Avec CA 2026','Wachstum':'Croissance','stabil':'stable','Rückgang':'Recul','Neukunde':'Nouveau client','verloren':'perdu','ohne Umsatz':'sans CA',
'Falsche Anmeldung. Bitte Name und PIN prüfen.':'Connexion incorrecte. Vérifiez le nom et le PIN.',
'Standort bestimmen':'Déterminer la position','Standort wird bestimmt …':'Détermination de la position …','PLZ oder Ort':'NPA ou lieu','Los':'OK',
'Standort nicht verfügbar. Bitte PLZ oder Ort eingeben.':'Position indisponible. Saisissez un NPA ou un lieu.','PLZ oder Ort nicht gefunden.':'NPA ou lieu introuvable.',
'GPS-Standort':'Position GPS','Standort':'Position','Entfernung ab Ihrem Standort':'Distance depuis votre position',
'Ohne Standort ist die Liste nach Name sortiert. Standort bestimmen oder PLZ eingeben, dann erscheint die Entfernung.':'Sans position, la liste est triée par nom. Déterminez la position ou saisissez un NPA pour voir la distance.',
'Keine Kunden gefunden.':'Aucun client trouvé.','Mehr anzeigen':'Afficher plus','Zurück':'Retour','Kunden-Nr.':'N° client','Status':'Statut','Letzte Bestellung':'Dernière commande','keine':'aucune',
'Navigation':'Navigation','Google Maps':'Google Maps','Apple Karten':'Plans Apple','Umsatz':'Chiffre d’affaires','Differenz':'Différence','Total':'Total',
'Umsatzverlauf pro Monat':'CA par mois','Entfernung':'Distance','ungefähr (Strasse/PLZ)':'approximatif (rue/NPA)',
'Kunden ohne Bestellung seit mindestens 3 Monaten (früher aktiv, 2026 schon bestellt). Nach Entfernung sortiert, ideal für spontane Besuche.':'Clients sans commande depuis au moins 3 mois (actifs avant, déjà commandé en 2026). Triés par distance, idéal pour des visites spontanées.',
'Standort bestimmen oder PLZ eingeben, dann erscheint die Entfernung.':'Déterminez la position ou saisissez un NPA pour voir la distance.','Radius':'Rayon','Kein schlafender Kunde in diesem Umkreis.':'Aucun client dormant dans ce rayon.','Daten bis':'Données jusqu’à','Stand':'État',
'Kartenbibliothek konnte nicht geladen werden (Internet?). Die Kundenliste funktioniert weiter.':'La bibliothèque de carte n’a pas pu être chargée (Internet ?). La liste des clients fonctionne toujours.',
'Kartenhintergrund konnte nicht geladen werden (Internet). Die Kunden werden trotzdem angezeigt.':'Le fond de carte n’a pas pu être chargé (Internet). Les clients sont tout de même affichés.',
'Neuen Kunden melden. Die Meldung geht per E-Mail an den Innendienst (admin@dyhrberg.ch). Mit «E-Mail erstellen» öffnet sich das Mailprogramm mit dem fertigen Text, dort nur noch auf Senden tippen.':'Annoncer un nouveau client. L’annonce part par e-mail au service interne (admin@dyhrberg.ch). «Créer l’e-mail» ouvre la messagerie avec le texte prêt, il suffit d’appuyer sur Envoyer.',
'Name des Betriebes *':'Nom de l’établissement *','Rechtsform':'Forme juridique','– bitte wählen –':'– choisir –','Adresse (Strasse, Nr.) *':'Adresse (rue, n°) *','PLZ *':'NPA *','Ort *':'Lieu *',
'Telefonnummer':'Numéro de téléphone','Mobile':'Mobile','Direkt':'Direct','Hauptnummer':'Numéro principal','E-Mail-Adresse für Aktionen':'Adresse e-mail pour les actions','E-Mail-Adresse für Rechnung':'Adresse e-mail pour la facture',
'Zeiten':'Horaires','Öffnungszeiten':'Heures d’ouverture','Lieferzeiten':'Heures de livraison','Ansprechpersonen':'Personnes de contact',
'E-Mail erstellen':'Créer l’e-mail','Text kopieren':'Copier le texte','Formular leeren':'Vider le formulaire',
'Küchenchef/in':'Chef/fe de cuisine','Geschäftsführer/in':'Directeur/trice','Sous Chef/in':'Sous-chef/fe','Leiter Hotellerie':'Resp. hôtellerie','Leiter Gastronomie':'Resp. gastronomie','Direktor':'Directeur','F&B':'F&B',
'Bitte die rot markierten Felder prüfen (Pflichtfelder: Name, Adresse, PLZ, Ort; PLZ vierstellig; E-Mail gültig).':'Veuillez vérifier les champs en rouge (obligatoires : nom, adresse, NPA, lieu ; NPA à 4 chiffres ; e-mail valable).',
'Das Mailprogramm wird geöffnet. Bitte dort auf «Senden» tippen. Öffnet sich nichts, «Text kopieren» verwenden und per E-Mail an admin@dyhrberg.ch senden.':'La messagerie s’ouvre. Appuyez sur «Envoyer». Si rien ne s’ouvre, utilisez «Copier le texte» et envoyez-le à admin@dyhrberg.ch.',
'Text kopiert. Bitte in eine neue E-Mail an admin@dyhrberg.ch einfügen.':'Texte copié. Collez-le dans un nouvel e-mail à admin@dyhrberg.ch.',
'Achtung, in dieser PLZ gibt es bereits ähnliche Kunden':'Attention, il existe déjà des clients similaires dans ce NPA','Mehrere Orte zu dieser PLZ: bitte den richtigen wählen':'Plusieurs lieux pour ce NPA : choisissez le bon',
'Zu dieser PLZ ist kein Ort bekannt, bitte Ort von Hand eingeben.':'Aucun lieu connu pour ce NPA, saisissez-le à la main.',
'z. B. Mo–Fr 08–17, Sa 08–12':'p. ex. lu–ve 08–17, sa 08–12','z. B. Di und Fr bis 10 Uhr':'p. ex. ma et ve jusqu’à 10 h',
'Dashboard Mobile wird geladen …':'Chargement …','Zurücksetzen':'Réinitialiser','Interessent':'Prospect','Kontakt':'Contact','Telefon':'Téléphone','Weitere Nr. (Fax)':'Autre n° (fax)','E-Mail':'E-mail','Ansprechperson':'Personne de contact','Anrufen':'Appeler','E-Mail schreiben':'Écrire un e-mail','gesperrt':'bloqué','Daten laden':'Charger les données','Daten aktualisieren (Datei wählen)':'Mettre à jour les données (choisir le fichier)','Datei wählen':'Choisir le fichier','Diese Datei ist keine gültige Datei für Dashboard Mobile. Bitte «Daten Dashboard Mobile.json» aus dem eigenen Ordner wählen.':'Ce fichier n’est pas valable pour Dashboard Mobile. Choisissez «Daten Dashboard Mobile.json» dans votre dossier.','Daten konnten im Gerät nicht gespeichert werden (privater Modus?).':'Les données n’ont pas pu être enregistrées sur l’appareil (mode privé ?).','Datei konnte nicht gelesen werden.':'Le fichier n’a pas pu être lu.','Einmalig und dann bei jedem neuen Stand: in OneDrive die Datei «Daten Dashboard Mobile.json» aus dem eigenen Ordner wählen. Die Kundendaten bleiben auf diesem Gerät, sie liegen nicht im Internet.':'Une fois, puis à chaque nouvel état : choisissez dans OneDrive le fichier «Daten Dashboard Mobile.json» de votre dossier. Les données clients restent sur cet appareil, elles ne sont pas sur Internet.','Fehler':'Erreur'
};
var lang='de';
function t(s){ return lang==='fr'&&FR[s]?FR[s]:s; }
var MON={de:['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],fr:['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.']};
var STATUS={g:{l:'Wachstum',c:'#1D7A4F'},s:{l:'stabil',c:'#D9A21B'},r:{l:'Rückgang',c:'#C0392B'},n:{l:'Neukunde',c:'#2E75D6'},v:{l:'verloren',c:'#6B7280'},o:{l:'ohne Umsatz',c:'#F28C28'}};
var SLEEP_COL='#6b4fbb';
var KT_REGION={}; // nicht benötigt
var NK_TO='admin@dyhrberg.ch';
var NK_ROLES=['Küchenchef/in','Geschäftsführer/in','Sous Chef/in','Leiter Hotellerie','Leiter Gastronomie','Direktor','F&B'];

// ---------- Helfer ----------
var $=function(id){return document.getElementById(id);};
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function f(n){return String(Math.round(n||0)).replace(/\B(?=(\d{3})+(?!\d))/g,'’');}
function sum(a,from,to){var s=0;for(var i=from||0;i<(to===undefined?a.length:to);i++)s+=a[i]||0;return s;}
function lsGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function lsSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}
function lsDel(k){try{localStorage.removeItem(k);}catch(e){}}
function km(a,b,c,d){var R=6371,r=Math.PI/180,dl=(c-a)*r,dn=(d-b)*r,x=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a*r)*Math.cos(c*r)*Math.sin(dn/2)*Math.sin(dn/2);return 2*R*Math.asin(Math.min(1,Math.sqrt(x)));}
function fmtKm(k,approx){ if(k<0.1) return '< 100 m'; var s=k<1?Math.round(k*10)*100+' m':(k<10?k.toFixed(1):Math.round(k))+' km'; return (approx?'~ ':'')+s; }
function isIOS(){ return /iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1); }
function showFatal(msg){ var el=$('fatal'); el.textContent=msg; el.classList.remove('hid'); $('boot').classList.add('hid'); }
window.addEventListener('error',function(e){ if($('boot')&&!$('boot').classList.contains('hid')) showFatal('Fehler beim Laden: '+(e.message||'')+'\n'+(e.filename||'')+':'+(e.lineno||'')+'\nBrowser: '+navigator.userAgent); });

// ---------- Zustand ----------
var USER=null, C=[], D={}, pos=null, locMsg='', map=null, mapLayer=null, meMarker=null, mapDirty=true, mapFitted=false, tileErrs=0;
var F={q:'',chip:'',sort:'dist',ad:'',radius:25,shown:60,shownS:60};
var view='kunden';
var GEO=window.GEO_PLZ||{}, GK={}, WEB=false;

// ---------- Aufbereitung (gleiche Regeln wie das Dashboard am PC) ----------
function prepare(){
  D=window.DATA||{kunden:[],gebiete:[]}; GK=window.GEO_KUNDEN||{};
  var adLast={}; (D.gebiete||[]).forEach(function(g){adLast[g.name]=g.last;});
  C=(D.kunden||[]).map(function(k){
    var cut=adLast[k.ad]||0;
    var c={id:k.id,ad:k.ad,n:k.n||('Kunde '+k.id),s:k.s||'',plz:k.plz||'',o:k.o||'',m25:k.m25||[],m26:k.m26||[],y24:k.y24||0,sp:k.sp,ia:k.ia,tel:k.tel||'',mail:k.mail||'',t2:k.t2||'',kp:k.kp||'',cut:cut};
    c.ytd26=sum(c.m26,0,cut); c.ytd25=sum(c.m25,0,cut); c.full25=Math.max(k.y25||0,sum(c.m25));
    var older=(k.y21||0)+(k.y22||0)+(k.y23||0)+(k.y24||0)+c.full25;
    c.d=c.ytd26-c.ytd25;
    var st;
    if(cut===0) st='o';
    else if(c.ytd26>0 && older<=0) st='n';
    else if(c.ytd26<=0 && c.full25>0) st='v';
    else if(c.ytd26<=0) st='o';
    else { var ratio=c.ytd25>0?c.ytd26/c.ytd25:2; st=ratio>=1.1?'g':ratio<=0.9?'r':'s'; }
    c.st=st;
    c.sleep=(st!=='v'&&st!=='o'&&st!=='n'&&cut>=4&&c.ytd26>0&&sum(c.m26,cut-3,cut)<=0);
    // letzte Bestellung
    c.last=null; var i;
    for(i=Math.min(cut,12)-1;i>=0;i--){ if(c.m26[i]>0){ c.last={y:2026,m:i}; break; } }
    if(!c.last){ for(i=11;i>=0;i--){ if(c.m25[i]>0){ c.last={y:2025,m:i}; break; } } }
    c.since=c.last?((2026-c.last.y)*12+(cut-1-c.last.m)):null;
    // Koordinaten: Adresse (swisstopo) sonst PLZ-Mitte
    var g=GK[c.id], p=GEO[c.plz];
    if(g){ c.lat=g[0]; c.lon=g[1]; c.q=g[2]; }
    else if(p){ c.lat=p[0]; c.lon=p[1]; c.q=0; }
    return c;
  });
  var seen={};
  C.forEach(function(c){ if(c.lat===undefined||c.q>0) return; var i=seen[c.plz]=(seen[c.plz]||0)+1; if(i>1){var a=i*2.4,r=0.0022*Math.sqrt(i);c.lat+=r*Math.sin(a);c.lon+=r*1.4*Math.cos(a);} });
  recalcDist();
}
function recalcDist(){ C.forEach(function(c){ c.dist=(pos&&c.lat!==undefined)?km(pos.lat,pos.lon,c.lat,c.lon):null; }); }

// ---------- Filter ----------
function base(){ return F.ad?C.filter(function(c){return c.ad===F.ad;}):C; }
function matchChip(c,ch){
  if(!ch) return true; if(ch==='rev') return c.ytd26>0; if(ch==='sleep') return c.sleep; return c.st===ch;
}
function filtered(){
  var q=F.q.trim().toLowerCase(), ch=F.chip;
  var a=base().filter(function(c){ if(!matchChip(c,ch)) return false; if(q&&(c.n+' '+c.s+' '+c.plz+' '+c.o+' '+c.id).toLowerCase().indexOf(q)<0) return false; return true; });
  var s=F.sort; if(s==='dist'&&!pos) s='name';
  a.sort(function(x,y){
    if(s==='dist'){ var dx=x.dist===null?1e9:x.dist, dy=y.dist===null?1e9:y.dist; return dx-dy||x.n.localeCompare(y.n); }
    if(s==='rev') return y.ytd26-x.ytd26||x.n.localeCompare(y.n);
    return x.n.localeCompare(y.n,'de');
  });
  return a;
}
function stCol(c){ return c.sleep?SLEEP_COL:STATUS[c.st].c; }

// ---------- Standort ----------
function resolvePlz(v){
  v=(v||'').trim(); if(!v) return null;
  if(/^\d{4}$/.test(v)&&GEO[v]) return {lat:GEO[v][0],lon:GEO[v][1],label:(v+' '+(((window.PLZ_ORT||{})[v]||[''])[0])).trim()};
  var lv=v.toLowerCase(), PO=window.PLZ_ORT||{}, best=null, bo='';
  Object.keys(PO).forEach(function(p){ if(best||!GEO[p]) return; (PO[p]||[]).forEach(function(o){ if(!best&&o.toLowerCase()===lv){ best=p; bo=o; } }); });
  if(!best) Object.keys(PO).forEach(function(p){ if(best||!GEO[p]) return; (PO[p]||[]).forEach(function(o){ if(!best&&o.toLowerCase().indexOf(lv)===0){ best=p; bo=o; } }); });
  return best?{lat:GEO[best][0],lon:GEO[best][1],label:best+' '+bo}:null;
}
function getGeo(){
  if(!navigator.geolocation){ locMsg=t('Standort nicht verfügbar. Bitte PLZ oder Ort eingeben.'); renderLoc(); return; }
  locMsg=t('Standort wird bestimmt …'); renderLoc();
  navigator.geolocation.getCurrentPosition(function(p){
    pos={lat:p.coords.latitude,lon:p.coords.longitude,label:t('GPS-Standort'),src:'gps'}; locMsg=''; recalcDist(); mapFitted=false; refreshAll();
  },function(){ locMsg=t('Standort nicht verfügbar. Bitte PLZ oder Ort eingeben.'); renderLoc(); },{enableHighAccuracy:false,timeout:12000,maximumAge:120000});
}
function renderLoc(){
  var h;
  if(pos) h='<span class="grow locok">● '+esc(pos.label)+'</span><button type="button" data-act="gps">↻</button><input data-role="plz" placeholder="'+esc(t('PLZ oder Ort'))+'"><button type="button" data-act="plz">'+t('Los')+'</button>';
  else h='<button type="button" class="pri" data-act="gps">'+t('Standort bestimmen')+'</button><input data-role="plz" placeholder="'+esc(t('PLZ oder Ort'))+'"><button type="button" data-act="plz">'+t('Los')+'</button>'+(locMsg?'<div class="grow" style="flex-basis:100%;font-size:13px;color:#667085">'+esc(locMsg)+'</div>':'');
  if(pos&&locMsg) h+='<div style="flex-basis:100%;font-size:13px;color:#C0392B">'+esc(locMsg)+'</div>';
  ['locBar','locBar2'].forEach(function(id){ var el=$(id); if(el){ var keep=el.querySelector('input')?el.querySelector('input').value:''; el.innerHTML=h; if(keep&&el.querySelector('input')) el.querySelector('input').value=keep; } });
}
document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('[data-act]'); if(!b) return;
  var act=b.getAttribute('data-act');
  if(act==='gps') getGeo();
  if(act==='plz'){
    var inp=b.parentNode.querySelector('input[data-role=plz]'), r=resolvePlz(inp&&inp.value);
    if(r){ pos={lat:r.lat,lon:r.lon,label:t('Standort')+': '+r.label,src:'plz'}; lsSet('dashM_plz',inp.value); locMsg=''; recalcDist(); mapFitted=false; refreshAll(); }
    else { locMsg=t('PLZ oder Ort nicht gefunden.'); renderLoc(); }
  }
});
document.addEventListener('keydown',function(e){ if((e.key==='Enter'||e.keyCode===13)&&e.target&&e.target.getAttribute&&e.target.getAttribute('data-role')==='plz'){ var b=e.target.parentNode.querySelector('[data-act=plz]'); if(b) b.click(); } });

// ---------- Listen ----------
function chipDefs(){ return [['','Alle'],['rev','Mit Umsatz 2026'],['sleep','Schlafend'],['g','Wachstum'],['r','Rückgang'],['n','Neukunde'],['v','verloren'],['o','ohne Umsatz']]; }
function renderChips(){
  var h=chipDefs().map(function(d){ return '<button type="button" data-chip="'+d[0]+'" class="'+(F.chip===d[0]?'on':'')+'">'+esc(t(d[1]))+'</button>'; }).join('');
  $('chipsK').innerHTML=h; $('chipsM').innerHTML=h;
  var r=[10,25,50,100,0].map(function(v){ return '<button type="button" data-rad="'+v+'" class="'+(F.radius===v?'on':'')+'">'+(v?v+' km':esc(t('Alle')))+'</button>'; }).join('');
  $('chipsR').innerHTML=r;
}
function cardHtml(c,sl){
  var d=c.dist===null?'':'<span class="dist">'+fmtKm(c.dist,c.q<2)+'</span>';
  var sub=esc(c.s?c.s+', ':'')+esc(c.plz+' '+c.o);
  var line2='';
  if(sl){ line2='<div class="cs">'+esc(t('Letzte Bestellung'))+': '+(c.last?MON[lang][c.last.m]+' '+c.last.y:'–')+'</div>'; }
  else if(c.sleep) line2='<div class="cs" style="color:'+SLEEP_COL+'">'+esc(t('Schlafend'))+'</div>';
  var rev=sl?(c.full25>0?'CHF '+f(c.full25):'–'):(c.ytd26>0?'CHF '+f(c.ytd26):'–');
  return '<div class="card" data-id="'+esc(c.id)+'"><span class="dot" style="background:'+stCol(c)+'"></span><div class="cb"><div class="cn">'+esc(c.n)+'</div><div class="cs">'+sub+'</div>'+line2+'</div><div class="cr">'+d+'<b>'+rev+'</b></div></div>';
}
function renderK(){
  var a=filtered(), n=a.length, out=a.slice(0,F.shown);
  $('cntK').textContent=n+' '+t('Kunden');
  $('listK').innerHTML=out.length?out.map(function(c){return cardHtml(c,false);}).join('')+(n>out.length?'<button type="button" class="more" id="moreK">'+t('Mehr anzeigen')+' ('+(n-out.length)+')</button>':''):'<div class="empty">'+t('Keine Kunden gefunden.')+'</div>';
  document.querySelectorAll('[data-sort]').forEach(function(b){ b.classList.toggle('on',b.getAttribute('data-sort')===(F.sort==='dist'&&!pos?'name':F.sort)); });
  var m=$('moreK'); if(m) m.onclick=function(){ F.shown+=60; renderK(); };
}
function sleepList(){
  var a=base().filter(function(c){ return c.sleep&&(!F.radius||(c.dist!==null&&c.dist<=F.radius)||(!pos)); });
  a.sort(function(x,y){ if(pos){ var dx=x.dist===null?1e9:x.dist, dy=y.dist===null?1e9:y.dist; return dx-dy; } return (y.full25-x.full25)||x.n.localeCompare(y.n); });
  return a;
}
function renderS(){
  $('schlafNote').textContent=t('Kunden ohne Bestellung seit mindestens 3 Monaten (früher aktiv, 2026 schon bestellt). Nach Entfernung sortiert, ideal für spontane Besuche.')+(pos?'':' '+t('Standort bestimmen oder PLZ eingeben, dann erscheint die Entfernung.'));
  var a=sleepList(), n=a.length, out=a.slice(0,F.shownS);
  $('cntS').textContent=n+' '+t('Kunden');
  $('listS').innerHTML=out.length?out.map(function(c){return cardHtml(c,true);}).join('')+(n>out.length?'<button type="button" class="more" id="moreS">'+t('Mehr anzeigen')+' ('+(n-out.length)+')</button>':''):'<div class="empty">'+t('Kein schlafender Kunde in diesem Umkreis.')+'</div>';
  var m=$('moreS'); if(m) m.onclick=function(){ F.shownS+=60; renderS(); };
  document.querySelectorAll('[data-rad]').forEach(function(b){ b.classList.toggle('on',+b.getAttribute('data-rad')===F.radius); });
}

// ---------- Karte ----------
function ensureMap(){
  if(map) return true;
  if(typeof L==='undefined'){ var n=$('mapNote'); n.textContent=t('Kartenbibliothek konnte nicht geladen werden (Internet?). Die Kundenliste funktioniert weiter.'); n.classList.remove('hid'); return false; }
  map=L.map('map',{preferCanvas:true,zoomControl:false}).setView([46.8,8.2],8);
  L.control.zoom({position:'bottomright'}).addTo(map);
  var tl=L.tileLayer('https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-grau/default/current/3857/{z}/{x}/{y}.jpeg',{maxZoom:18,attribution:'© swisstopo'}).addTo(map);
  tl.on('tileerror',function(){ if(++tileErrs===6){ var n=$('mapNote'); n.textContent=t('Kartenhintergrund konnte nicht geladen werden (Internet). Die Kunden werden trotzdem angezeigt.'); n.classList.remove('hid'); } });
  mapLayer=L.layerGroup().addTo(map);
  return true;
}
function renderMap(){
  if(!ensureMap()) return;
  map.invalidateSize();
  mapLayer.clearLayers();
  var pts=[];
  filtered().forEach(function(c){
    if(c.lat===undefined) return;
    var m=L.circleMarker([c.lat,c.lon],{radius:8,weight:2,color:'#fff',fillColor:stCol(c),fillOpacity:.95});
    m.on('click',function(){ openDetail(c.id); });
    m.addTo(mapLayer); pts.push([c.lat,c.lon]);
  });
  if(meMarker){ map.removeLayer(meMarker); meMarker=null; }
  if(pos){ meMarker=L.circleMarker([pos.lat,pos.lon],{radius:10,weight:3,color:'#fff',fillColor:'#0E3A82',fillOpacity:1}).addTo(map); }
  if(!mapFitted){
    if(pos) map.setView([pos.lat,pos.lon],12);
    else if(pts.length) map.fitBounds(pts,{padding:[30,30],maxZoom:12});
    mapFitted=true;
  }
  mapDirty=false;
}
$('mapMe').onclick=function(){ if(!pos) getGeo(); else if(map){ map.setView([pos.lat,pos.lon],13); } };

// ---------- Kundendetail ----------
var detailOpen=false;
function navLinks(c){
  var dest=encodeURIComponent((c.s?c.s+', ':'')+c.plz+' '+c.o+', Schweiz');
  var g='https://www.google.com/maps/dir/?api=1&destination='+dest, a='https://maps.apple.com/?daddr='+dest+'&dirflg=d';
  var lg='<a href="'+g+'" target="_blank" rel="noopener">'+t('Google Maps')+'</a>', la='<a href="'+a+'" target="_blank" rel="noopener">'+t('Apple Karten')+'</a>';
  return isIOS()?la.replace('<a ','<a class="" ')+lg.replace('<a ','<a class="sec" '):lg+la.replace('<a ','<a class="sec" ');
}
function chart(c){
  var W=300,H=96,mx=1,i; for(i=0;i<12;i++){ mx=Math.max(mx,c.m25[i]||0,c.m26[i]||0); }
  var s='<svg viewBox="0 0 '+W+' '+(H+16)+'" width="100%" role="img" aria-label="'+esc(t('Umsatzverlauf pro Monat'))+'">', gw=W/12;
  for(i=0;i<12;i++){
    var h25=(c.m25[i]||0)/mx*H, h26=(i<c.cut?(c.m26[i]||0):0)/mx*H, x=i*gw+3;
    s+='<rect x="'+x+'" y="'+(H-h25)+'" width="9" height="'+h25+'" fill="#b8c2d6" rx="1.5"/>';
    s+='<rect x="'+(x+10)+'" y="'+(H-h26)+'" width="9" height="'+h26+'" fill="#0E3A82" rx="1.5"/>';
    s+='<text x="'+(x+10)+'" y="'+(H+12)+'" font-size="9" text-anchor="middle" fill="#667085">'+MON[lang][i].charAt(0).toUpperCase()+'</text>';
  }
  return s+'</svg><div class="legend"><span><i style="background:#b8c2d6"></i>2025</span><span><i style="background:#0E3A82"></i>2026</span></div>';
}
function contactCard(c){
  if(!(c.tel||c.mail||c.t2||c.kp)) return '';
  var telOk=(c.tel||'').replace(/\D/g,'').length>=7, h='<div class="dcard"><h4>'+esc(t('Kontakt'))+'</h4>';
  if(c.kp) h+='<div class="kv"><span>'+esc(t('Ansprechperson'))+'</span><b>'+esc(c.kp)+'</b></div>';
  if(c.tel) h+='<div class="kv"><span>'+esc(t('Telefon'))+'</span><b>'+esc(c.tel)+'</b></div>';
  if(c.t2) h+='<div class="kv"><span>'+esc(t('Weitere Nr. (Fax)'))+'</span><b>'+esc(c.t2)+'</b></div>';
  if(c.mail) h+='<div class="kv"><span>'+esc(t('E-Mail'))+'</span><b style="word-break:break-all">'+esc(c.mail)+'</b></div>';
  if(telOk||c.mail){ h+='<div class="navrow">'+(telOk?'<a href="tel:'+esc((c.tel||'').replace(/[^\d+]/g,''))+'">'+esc(t('Anrufen'))+'</a>':'')+(c.mail?'<a class="'+(telOk?'sec':'')+'" href="mailto:'+esc(c.mail)+'">'+esc(t('E-Mail schreiben'))+'</a>':'')+'</div>'; }
  return h+'</div>';
}
function openDetail(id){
  var c=C.filter(function(x){return x.id===id;})[0]; if(!c) return;
  var cut=c.cut, per=cut>1?MON[lang][0]+'–'+MON[lang][cut-1]:(cut?MON[lang][0]:'');
  var diffPct=c.ytd25>0?((c.ytd26/c.ytd25-1)*100):null;
  var cls=c.d>0?'up':c.d<0?'dn':'';
  var st='<span class="badge" style="background:'+STATUS[c.st].c+'">'+esc(t(STATUS[c.st].l))+'</span>'+(c.sleep?'<span class="badge sl">'+esc(t('Schlafend'))+'</span>':'')+(c.ia?'<span class="badge" style="background:#667085">'+esc(t('Interessent'))+'</span>':'')+(c.sp?'<span class="badge" style="background:#C0392B">'+esc(t('gesperrt'))+'</span>':'');
  var distLine=c.dist!==null?'<div class="kv"><span>'+esc(t('Entfernung'))+'</span><b>'+fmtKm(c.dist,c.q<2)+(c.q<2?' <span style="font-weight:400;color:#667085">('+esc(t('ungefähr (Strasse/PLZ)'))+')</span>':'')+'</b></div>':'';
  var h='<div class="dhead"><button type="button" id="dBack">‹ '+t('Zurück')+'</button><div class="t">'+esc(c.n)+'</div></div><div class="dbody">'+
   '<div class="dcard"><div class="addr">'+esc(c.s||'–')+'<br>'+esc(c.plz+' '+c.o)+'</div>'+distLine+'<div class="navrow">'+navLinks(c)+'</div></div>'+
   contactCard(c)+
   '<div class="dcard"><div class="kv"><span>'+esc(t('Status'))+'</span><span>'+st+'</span></div>'+
   '<div class="kv"><span>'+esc(t('Kunden-Nr.'))+'</span><b>'+esc(c.id)+'</b></div>'+
   (USER&&USER.role==='leitung'?'<div class="kv"><span>'+esc(t('Gebiet'))+'</span><b>'+esc(c.ad)+'</b></div>':'')+
   '<div class="kv"><span>'+esc(t('Letzte Bestellung'))+'</span><b>'+(c.last?MON[lang][c.last.m]+' '+c.last.y+(c.since!==null&&c.since>0?' ('+(lang==='fr'?'il y a ':'vor ')+c.since+(lang==='fr'?' mois':' Mt.')+')':''):esc(t('keine')))+'</b></div></div>'+
   '<div class="dcard"><h4>'+esc(t('Umsatz'))+' CHF</h4>'+
   '<div class="kv"><span>'+esc(per)+' 2026</span><b>'+f(c.ytd26)+'</b></div>'+
   '<div class="kv"><span>'+esc(per)+' 2025</span><b>'+f(c.ytd25)+'</b></div>'+
   '<div class="kv"><span>'+esc(t('Differenz'))+'</span><b class="'+cls+'">'+(c.d>0?'+':'')+f(c.d)+(diffPct!==null?' ('+(diffPct>=0?'+':'')+diffPct.toFixed(0)+' %)':'')+'</b></div>'+
   '<div class="kv"><span>'+esc(t('Total'))+' 2025</span><b>'+f(c.full25)+'</b></div>'+
   '<div class="kv"><span>'+esc(t('Total'))+' 2024</span><b>'+f(c.y24)+'</b></div></div>'+
   '<div class="dcard"><h4>'+esc(t('Umsatzverlauf pro Monat'))+'</h4>'+chart(c)+'</div></div>';
  var el=$('detail'); el.innerHTML=h; el.classList.remove('hid'); el.scrollTop=0;
  $('dBack').onclick=function(){ closeDetail(true); };
  if(!detailOpen){ detailOpen=true; try{ history.pushState({d:1},''); }catch(e){} }
}
function closeDetail(viaBtn){
  if(!detailOpen) return; detailOpen=false; $('detail').classList.add('hid');
  if(viaBtn){ try{ if(history.state&&history.state.d) history.back(); }catch(e){} }
}
window.addEventListener('popstate',function(){ if(detailOpen){ detailOpen=false; $('detail').classList.add('hid'); } });
document.addEventListener('click',function(e){ var c=e.target.closest&&e.target.closest('.card[data-id]'); if(c) openDetail(c.getAttribute('data-id')); });

// ---------- Neuer Kunde ----------
function nkv(id){ return ($(id).value||'').trim(); }
function nkText(){
  var L=[], v=function(x){return x||'–';};
  L.push('Neuer Kunde:','');
  L.push('Name des Betriebes: '+v(nkv('nkName')));
  L.push('Rechtsform: '+v(nkv('nkRf')));
  L.push('Adresse: '+v(nkv('nkAdr')));
  L.push('PLZ, Ort: '+v((nkv('nkPlz')+' '+nkv('nkOrt')).trim()));
  L.push('Telefonnummer Mobile: '+v(nkv('nkTelM')));
  L.push('Telefonnummer Direkt: '+v(nkv('nkTelD')));
  L.push('Telefonnummer Hauptnummer: '+v(nkv('nkTelH')));
  L.push('E-Mail-Adresse für Aktionen: '+v(nkv('nkMailA')));
  L.push('E-Mail-Adresse für Rechnung: '+v(nkv('nkMailR')));
  L.push('Öffnungszeiten: '+v(nkv('nkOeff')));
  L.push('Lieferzeiten: '+v(nkv('nkLief')));
  L.push('','Ansprechpersonen:');
  var any=false; NK_ROLES.forEach(function(r,i){ var x=nkv('nkRole'+i); if(x){ L.push('  '+r+': '+x); any=true; } });
  if(!any) L.push('  –');
  L.push('','Viele Grüsse und Danke',USER?USER.name:'');
  return L.join('\r\n');
}
function nkValid(){
  var ok=true;
  ['nkName','nkAdr','nkPlz','nkOrt'].forEach(function(id){ var bad=!nkv(id); $(id).classList.toggle('bad',bad); if(bad) ok=false; });
  var pz=nkv('nkPlz'); if(pz&&!/^\d{4}$/.test(pz)){ $('nkPlz').classList.add('bad'); ok=false; }
  ['nkMailA','nkMailR'].forEach(function(id){ var m=nkv(id), bad=m&&!/^\S+@\S+\.\S+$/.test(m); $(id).classList.toggle('bad',!!bad); if(bad) ok=false; });
  $('nkMsg').textContent=ok?'':t('Bitte die rot markierten Felder prüfen (Pflichtfelder: Name, Adresse, PLZ, Ort; PLZ vierstellig; E-Mail gültig).');
  return ok;
}
function nkDup(){
  var nm=nkv('nkName').toLowerCase().replace(/[^a-zäöüéèà0-9 ]/g,' ').split(/\s+/).filter(function(w){return w.length>=4;}), pz=nkv('nkPlz'), box=$('nkDup');
  if(!nm.length||pz.length<4){ box.classList.add('hid'); return; }
  var hit=C.filter(function(c){ if(c.plz!==pz) return false; var cn=c.n.toLowerCase(); return nm.some(function(w){return cn.indexOf(w)>=0;}); }).slice(0,5);
  if(hit.length){ box.classList.remove('hid'); box.innerHTML=esc(t('Achtung, in dieser PLZ gibt es bereits ähnliche Kunden'))+': '+hit.map(function(c){return '<b>'+esc(c.n)+'</b> (Nr. '+esc(c.id)+')';}).join(', '); }
  else box.classList.add('hid');
}
function nkOrtVorschlag(){
  var pz=nkv('nkPlz'), el=$('nkOrt'), dl=$('nkOrtList'), orte=(window.PLZ_ORT||{})[pz]||[];
  dl.innerHTML=orte.map(function(o){return '<option value="'+esc(o)+'">';}).join('');
  if(pz.length<4){ if(el.dataset.auto==='1'){ el.value=''; el.dataset.auto=''; } return; }
  if(orte.length&&(!el.value.trim()||el.dataset.auto==='1')){ el.value=orte[0]; el.dataset.auto='1'; el.classList.remove('bad'); }
  $('nkMsg').textContent=orte.length>1?t('Mehrere Orte zu dieser PLZ: bitte den richtigen wählen')+' ('+orte.slice(0,6).join(', ')+')':(orte.length?'':t('Zu dieser PLZ ist kein Ort bekannt, bitte Ort von Hand eingeben.'));
}
function nkFallbackCopy(s){ var ta=document.createElement('textarea'); ta.value=s; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy');}catch(e){} ta.remove(); }
function initNeukunde(){
  $('nkRoles').innerHTML=NK_ROLES.map(function(r,i){return '<label for="nkRole'+i+'" data-i="'+esc(r)+'">'+esc(r)+'</label><input id="nkRole'+i+'" placeholder="Name">';}).join('');
  ['nkName','nkPlz'].forEach(function(id){ $(id).addEventListener('input',nkDup); });
  $('nkPlz').addEventListener('input',nkOrtVorschlag);
  $('nkOrt').addEventListener('input',function(){ $('nkOrt').dataset.auto=''; });
  $('nkMail').onclick=function(){
    if(!nkValid()) return;
    var subj='Neuer Kunde: '+nkv('nkName')+', '+nkv('nkPlz')+' '+nkv('nkOrt');
    $('nkMsg').textContent=t('Das Mailprogramm wird geöffnet. Bitte dort auf «Senden» tippen. Öffnet sich nichts, «Text kopieren» verwenden und per E-Mail an admin@dyhrberg.ch senden.');
    location.href='mailto:'+NK_TO+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(nkText());
  };
  $('nkCopy').onclick=function(){
    if(!nkValid()) return; var s='An: '+NK_TO+'\r\nBetreff: Neuer Kunde: '+nkv('nkName')+', '+nkv('nkPlz')+' '+nkv('nkOrt')+'\r\n\r\n'+nkText();
    var done=function(){ $('nkMsg').textContent=t('Text kopiert. Bitte in eine neue E-Mail an admin@dyhrberg.ch einfügen.'); };
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(s).then(done,function(){ nkFallbackCopy(s); done(); }); else { nkFallbackCopy(s); done(); }
  };
  $('nkClear').onclick=function(){ $('nkForm').reset(); document.querySelectorAll('#nkForm .bad').forEach(function(e){e.classList.remove('bad');}); $('nkMsg').textContent=''; $('nkDup').classList.add('hid'); };
}

// ---------- Ansicht / Sprache ----------
function applyLang(){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i]').forEach(function(el){ var k=el.getAttribute('data-i'); if(el.tagName==='OPTION'||true){ el.textContent=t(k); } });
  $('q').placeholder=t('Name, Ort, PLZ oder Nr.');
  $('nkNote').textContent=t('Neuen Kunden melden. Die Meldung geht per E-Mail an den Innendienst (admin@dyhrberg.ch). Mit «E-Mail erstellen» öffnet sich das Mailprogramm mit dem fertigen Text, dort nur noch auf Senden tippen.');
  $('nkOeff').placeholder=t('z. B. Mo–Fr 08–17, Sa 08–12'); $('nkLief').placeholder=t('z. B. Di und Fr bis 10 Uhr');
  document.querySelectorAll('#langBox button').forEach(function(b){ b.classList.toggle('on',b.getAttribute('data-lang')===lang); });
  var opts=$('adSel'); if(opts&&opts.options.length) opts.options[0].textContent=t('Alle Gebiete');
  header(); refreshAll();
}
function header(){
  var st=(D.stand||''), m=st.match(/^(\d{4})-(\d\d)-(\d\d)\s+(\d\d:\d\d)/), s=m?m[3]+'.'+m[2]+'.'+m[1]+' '+m[4]:st;
  var last=0; (D.gebiete||[]).forEach(function(g){ last=Math.max(last,g.last||0); });
  $('topS').textContent=(USER?USER.name+' · ':'')+t('Daten bis')+' '+(last?MON[lang][last-1]+' '+(D.jahr||2026):'–')+' · '+t('Stand')+' '+s;
}
function showView(v){
  view=v; closeDetail(false);
  document.querySelectorAll('.view').forEach(function(el){ el.classList.toggle('hid',el.id!=='v-'+v); });
  document.querySelectorAll('#tabbar button').forEach(function(b){ b.classList.toggle('on',b.getAttribute('data-v')===v); });
  if(v==='karte'){ setTimeout(renderMap,30); }
  else if(v==='schlaf') renderS();
  else if(v==='kunden') renderK();
  $('main').scrollTop=0;
}
function refreshAll(){
  renderChips(); renderLoc();
  if(view==='kunden') renderK(); if(view==='schlaf') renderS(); if(view==='karte') renderMap();
}

// ---------- Anmeldung ----------
var HH=[],KK=[];(function(){var pc=0,isP=function(n){for(var i=2;i*i<=n;i++)if(n%i===0)return false;return true;};for(var c=2;pc<64;c++)if(isP(c)){if(pc<8)HH[pc]=(Math.pow(c,.5)%1)*4294967296|0;KK[pc]=(Math.pow(c,1/3)%1)*4294967296|0;pc++;}})();
function sha256(s){
  var u=unescape(encodeURIComponent(s)),l=u.length,w=[],i,j,n=(((l+8)>>6)+1)*16;
  for(i=0;i<n;i++)w[i]=0;
  for(i=0;i<l;i++)w[i>>2]|=u.charCodeAt(i)<<(24-(i%4)*8);
  w[l>>2]|=0x80<<(24-(l%4)*8); w[n-1]=l*8;
  var h=HH.slice(0);
  for(j=0;j<n;j+=16){
    var a=h.slice(0),x=w.slice(j,j+16);
    for(i=0;i<64;i++){
      if(i>=16){var g=x[i-15],t2=x[i-2];x[i]=(x[i-16]+(((g>>>7)|(g<<25))^((g>>>18)|(g<<14))^(g>>>3))+x[i-7]+(((t2>>>17)|(t2<<15))^((t2>>>19)|(t2<<13))^(t2>>>10)))|0;}
      var e=a[4],T1=(a[7]+(((e>>>6)|(e<<26))^((e>>>11)|(e<<21))^((e>>>25)|(e<<7)))+((e&a[5])^(~e&a[6]))+KK[i]+x[i])|0;
      var A=a[0],T2=((((A>>>2)|(A<<30))^((A>>>13)|(A<<19))^((A>>>22)|(A<<10)))+((A&a[1])^(A&a[2])^(a[1]&a[2])))|0;
      a=[(T1+T2)|0,a[0],a[1],a[2],(a[3]+T1)|0,a[4],a[5],a[6]];
    }
    for(i=0;i<8;i++)h[i]=(h[i]+a[i])|0;
  }
  return h.map(function(v){return ('00000000'+(v>>>0).toString(16)).slice(-8);}).join('');
}
// PIN-Sperre: nach 3 Fehlversuchen 15 Minuten warten (pro Gerät/Browser gespeichert)
var PIN_MAX=3, PIN_LOCK_MIN=15, pinTimer=null;
function pinState(){ var s=null; try{ s=JSON.parse(lsGet('dashM_pinfail')||'null'); }catch(e){} return s&&typeof s==='object'?s:{n:0,until:0}; }
function pinSave(s){ lsSet('dashM_pinfail',JSON.stringify(s)); }
function pinLeft(){ var s=pinState(), l=Math.ceil((s.until-Date.now())/1000); if(s.until&&l<=0){ pinSave({n:0,until:0}); return 0; } return l>0?l:0; }
function pinFail(){ var s=pinState(); s.n=(s.n||0)+1; if(s.n>=PIN_MAX){ s.until=Date.now()+PIN_LOCK_MIN*60000; s.n=0; } pinSave(s); }
function pinShowLock(){
  var el=$('lgMsg'); clearInterval(pinTimer);
  var tick=function(){ var l=pinLeft(); if(l<=0){ clearInterval(pinTimer); el.textContent=''; return; }
    var fr=$('lgName').value==='Sylvain Dalfollo', m=Math.floor(l/60), s=('0'+(l%60)).slice(-2);
    el.textContent=fr?'Trop de tentatives. Veuillez patienter '+m+':'+s+' minutes.':'Zu viele Fehlversuche. Bitte noch '+m+':'+s+' Minuten warten.'; };
  tick(); pinTimer=setInterval(tick,1000);
}
function auth(cb){
  var users=window.USERS||[];
  if(!users.length){ showFatal('Keine Benutzer in dieser Datei. Bitte die Datei neu vom Verkaufsleiter holen.'); return; }
  var saved=null; try{ saved=JSON.parse(lsGet('dashM_user')||'null'); }catch(e){}
  if(saved){ var su=users.filter(function(u){return u.name===saved.name&&u.hash===saved.hash;})[0]; if(su){ USER=su; cb(); return; } }
  $('boot').classList.add('hid');
  $('lgName').innerHTML=users.map(function(u){return '<option>'+esc(u.name)+'</option>';}).join('');
  $('login').classList.remove('hid');
  if(pinLeft()>0) pinShowLock();
  var done=false;
  function go(){
    if(done) return;
    if(pinLeft()>0){ pinShowLock(); $('lgPin').value=''; return; }
    var u=users.filter(function(x){return x.name===$('lgName').value;})[0];
    if(u&&sha256(u.salt+$('lgPin').value.trim())===u.hash){ pinSave({n:0,until:0}); done=true; USER=u; lsSet('dashM_user',JSON.stringify({name:u.name,hash:u.hash})); $('login').classList.add('hid'); $('lgPin').value=''; cb(); }
    else { pinFail(); $('lgPin').value=''; if(pinLeft()>0) pinShowLock(); else { $('lgMsg').textContent=($('lgName').value==='Sylvain Dalfollo'?FR['Falsche Anmeldung. Bitte Name und PIN prüfen.']:'Falsche Anmeldung. Bitte Name und PIN prüfen.'); $('lgPin').focus(); } }
  }
  $('lgGo').onclick=go;
  $('lgPin').onkeydown=function(ev){ if(ev.key==='Enter'||ev.keyCode===13) go(); };
}

// ---------- Start ----------
function start(){
  try{
    var sl=lsGet('dashM_lang');
    lang=sl||((USER&&USER.name==='Sylvain Dalfollo')?'fr':'de');
    prepare();
    $('boot').classList.add('hid'); $('app').classList.remove('hid');
    var isM=USER.role==='leitung';
    $('langBox').classList.toggle('hid',!(isM||USER.name==='Sylvain Dalfollo'));
    if(isM){
      $('adBar').classList.remove('hid');
      $('adSel').innerHTML='<option value="">'+esc(t('Alle Gebiete'))+'</option>'+(D.gebiete||[]).map(function(g){return '<option>'+esc(g.name)+'</option>';}).join('');
      $('adSel').onchange=function(){ F.ad=this.value; F.shown=60; F.shownS=60; mapFitted=false; refreshAll(); };
    } else { F.ad=''; }
    initNeukunde();
    document.querySelectorAll('#langBox button').forEach(function(b){ b.onclick=function(){ lang=b.getAttribute('data-lang'); lsSet('dashM_lang',lang); applyLang(); }; });
    $('q').oninput=function(){ F.q=this.value; F.shown=60; renderK(); };
    $('btnReset').onclick=function(){ F.q=''; F.chip=''; F.sort='dist'; F.radius=25; F.shown=60; F.shownS=60; $('q').value=''; mapFitted=false; refreshAll(); $('main').scrollTop=0; };
    document.addEventListener('click',function(e){
      var ch=e.target.closest&&e.target.closest('[data-chip]'); if(ch){ F.chip=ch.getAttribute('data-chip'); F.shown=60; refreshAll(); }
      var rd=e.target.closest&&e.target.closest('[data-rad]'); if(rd){ F.radius=+rd.getAttribute('data-rad'); F.shownS=60; refreshAll(); }
      var so=e.target.closest&&e.target.closest('[data-sort]'); if(so){ F.sort=so.getAttribute('data-sort'); F.shown=60; renderK(); }
      var tb=e.target.closest&&e.target.closest('#tabbar button'); if(tb) showView(tb.getAttribute('data-v'));
    });
    $('btnMenu').onclick=function(e){ e.stopPropagation(); $('menu').classList.toggle('hid'); };
    document.addEventListener('click',function(){ $('menu').classList.add('hid'); });
    $('mReload').onclick=function(){ location.reload(); };
    if(WEB){ $('mData').classList.remove('hid'); $('mData').onclick=function(){ $('fileIn').click(); }; }
    $('mLogout').onclick=function(){ lsDel('dashM_user'); location.reload(); };
    var pz=lsGet('dashM_plz'); if(pz){ var r=resolvePlz(pz); if(r){ pos={lat:r.lat,lon:r.lon,label:t('Standort')+': '+r.label,src:'plz'}; recalcDist(); } }
    applyLang(); showView('kunden');
    // Wenn der Browser den Standort schon erlaubt hat, gleich bestimmen
    try{ if(navigator.permissions&&navigator.permissions.query) navigator.permissions.query({name:'geolocation'}).then(function(p){ if(p.state==='granted') getGeo(); },function(){}); }catch(e){}
  }catch(e){ showFatal('Fehler beim Start: '+(e&&e.message)+'\n'+(e&&e.stack||'')+'\nBrowser: '+navigator.userAgent); }
}
// ---------- Web-Modus (installierbare Seite ohne Kundendaten): Daten kommen aus einer Datei (OneDrive) und bleiben nur im Gerät ----------
function idb(){ return new Promise(function(res,rej){ var r=indexedDB.open('dashMobile',1); r.onupgradeneeded=function(){r.result.createObjectStore('kv');}; r.onsuccess=function(){res(r.result);}; r.onerror=function(){rej(r.error);}; }); }
function idbGet(k){ return idb().then(function(db){ return new Promise(function(res){ var q=db.transaction('kv').objectStore('kv').get(k); q.onsuccess=function(){res(q.result);}; q.onerror=function(){res(null);}; }); }).catch(function(){return null;}); }
function idbPut(k,v){ return idb().then(function(db){ return new Promise(function(res,rej){ var tr=db.transaction('kv','readwrite'); tr.objectStore('kv').put(v,k); tr.oncomplete=function(){res();}; tr.onerror=function(){rej(tr.error);}; }); }); }
function applyData(o){
  if(!o||!o.data||!o.data.kunden||!o.users||!o.users.length) return false;
  window.DATA=o.data; window.GEO_KUNDEN=o.geo||{}; window.USERS=o.users; return true;
}
function showSetup(msg){
  $('boot').classList.add('hid'); $('setup').classList.remove('hid');
  document.querySelectorAll('#setup [data-i]').forEach(function(el){ el.textContent=t(el.getAttribute('data-i')); });
  $('setupMsg').textContent=msg||'';
}
function webBoot(){
  WEB=true;
  $('fileIn').onchange=function(){
    var fl=this.files&&this.files[0]; if(!fl) return;
    var rd=new FileReader();
    rd.onload=function(){
      var o=null; try{ o=JSON.parse(rd.result); }catch(e){}
      if(!applyData(o)){ showSetup(t('Diese Datei ist keine gültige Datei für Dashboard Mobile. Bitte «Daten Dashboard Mobile.json» aus dem eigenen Ordner wählen.')); return; }
      idbPut('mobdata',o).then(function(){ if($('app').classList.contains('hid')){ $('setup').classList.add('hid'); auth(start); } else location.reload(); },
        function(){ showSetup(t('Daten konnten im Gerät nicht gespeichert werden (privater Modus?).')); });
    };
    rd.onerror=function(){ showSetup(t('Datei konnte nicht gelesen werden.')); };
    rd.readAsText(fl); this.value='';
  };
  $('setupBtn').onclick=function(){ $('fileIn').click(); };
  idbGet('mobdata').then(function(o){ if(applyData(o)) auth(start); else showSetup(''); });
}
if(window.DATA&&window.USERS) auth(start); else webBoot();
})();
