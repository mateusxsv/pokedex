const CACHE_NAME = "pokedex-skaoz-v1";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json"
];


self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME).then(cache => {

            return cache.addAll(ARQUIVOS);

        })

    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request).then(resposta => {

            return resposta || fetch(event.request);

        })

    );

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(nomes => {

            return Promise.all(

                nomes
                    .filter(nome => nome !== CACHE_NAME)
                    .map(nome => caches.delete(nome))

            );

        })

    );

});