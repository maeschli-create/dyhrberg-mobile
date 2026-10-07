// Service Worker: Programmdateien (ohne Kundendaten) zwischenspeichern; online immer zuerst die neueste Version holen.
var V='dash-mobile-20261007104417';
self.addEventListener('install',function(e){ self.skipWaiting(); });
self.addEventListener('activate',function(e){ e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){return k!==V;}).map(function(k){return caches.delete(k);})); }).then(function(){ return self.clients.claim(); })); });
self.addEventListener('fetch',function(e){
  var r=e.request; if(r.method!=='GET') return;
  var u=new URL(r.url); if(u.origin!==location.origin) return;
  e.respondWith(fetch(r).then(function(res){ var cp=res.clone(); caches.open(V).then(function(c){ c.put(r,cp); }); return res; }).catch(function(){ return caches.match(r,{ignoreSearch:true}).then(function(m){ return m||caches.match('index.html'); }); }));
});