

// Guardar  en el cache dinamico
function actualizarcacheDinamico( dynamicCache, req, res ) {

    if ( res.ok ) {

        return caches.open( dynamicCache ).then( cache => {

            cache.put( req, res.clone() );
            
            return res.clone();

        });

    } else {
        return res;
    }
}