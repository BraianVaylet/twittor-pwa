'use strict'

// Guardar  en el cache dinamico
// imports js files.
importScripts('js/sw-utils.js');



// Caches.
const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic-v2';
const INMUTABLE_CACHE = 'inmutable-v1';


// App-shell -> necesario para el funcionamiento de la app (static)
const APP_SHELL = [
    // './',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js',
];


// todo lo que no se va a modificar jamas.
const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js',
];


// instalación
self.addEventListener('install', e => {

    // creamos promesa para almacenamos APP_SHELS en cache static.
    const cacheStatic = caches.open(STATIC_CACHE).then(cache => {
        cache.addAll(APP_SHELL)
    });

    // creamos promesa para almacenamos APP_SHELS_INMUTABLE en cache inmutable.
    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => {
        cache.addAll(APP_SHELL_INMUTABLE)
    });

    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

// activación
self.addEventListener('active', e => {

    // creamos promesa para verificar si la version de cache a instalar es diferente a la actual, eliminar la que ya no se utiliza.
    const respuesta = caches.keys().then(keys => {
        keys.forEach(keys => {
                                
            if(key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }

            if(key !== DYNAMIC_CACHE && key.includes('dynamic')) {
                return caches.delete(key);
            }
            
        })
    });
    
    e.waitUntil(resupesta);        
});

// estrategias
self.addEventListener('fetch', e => {

    // Cache only
    const respuesta = caches.match(e.request).then(res => {
        if (res){ 
            return res; 
        } else {

            // cache with network fallback.
            return fetch(e.request)
                .then(newRes =>{
                    return actualizarcacheDinamico(DYNAMIC_CACHE, e.request, newRes);
                })            
        }
    })

    e.respondWith(respuesta);
});