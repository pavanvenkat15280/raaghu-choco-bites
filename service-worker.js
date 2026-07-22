const CACHE_NAME="raaghu-choco-v1";


const files=[

"/",
"/index.html",
"/style.css",
"/script.js",
"/images/logo.jpeg"

];



self.addEventListener("install",event=>{


event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>cache.addAll(files))

);


});




self.addEventListener("fetch",event=>{


event.respondWith(

caches.match(event.request)

.then(response=>response || fetch(event.request))

);


});