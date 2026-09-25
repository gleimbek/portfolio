/* ==========================================================================
   Descarga de recursos con registro de nombre y correo (Formspree)
   Lo usan la versión en español y la versión en inglés del portfolio.
   ========================================================================== */
(function () {
    // Reemplaza TU_ID_DESCARGAS por el ID del formulario que crees en formspree.io
    const FORMSPREE_URL = 'https://formspree.io/f/xaenblwb';

     const enIngles = document.documentElement.lang.toLowerCase().startsWith('en');
    const textos = enIngles ? {
        listo: 'Your download has started. If it didn\'t, ',
        enlace: 'download it here',
        datosInvalidos: 'Please enter your name and a valid email address.'
    } : {
        listo: 'Tu descarga comenzó. Si no empezó, ',
        enlace: 'descárgalo aquí',
        datosInvalidos: 'Escribe tu nombre y un correo electrónico válido.'
    };
 
    document.querySelectorAll('.formulario-descarga').forEach(function (formulario) {
        formulario.addEventListener('submit', function (evento) {
            evento.preventDefault();
 
            const aviso = formulario.querySelector('.aviso-descarga');
            const archivo = formulario.dataset.archivo;
            const campoInvalido = formulario.querySelector('input:invalid');
 
            if (campoInvalido) {
                aviso.textContent = textos.datosInvalidos;
                campoInvalido.focus();
                return;
            }
 
            // La descarga se inicia primero, dentro del clic, para que Chrome
            // no la bloquee por haber pasado tiempo desde que la persona hizo clic.
            descargar(archivo);
            mostrarAviso(aviso, archivo);
 
            // El registro en Formspree se envía después, en segundo plano.
            const datos = new FormData(formulario);
            formulario.reset();
 
            fetch(FORMSPREE_URL, {
                method: 'POST',
                body: datos,
                headers: { Accept: 'application/json' },
                keepalive: true
            }).then(function (respuesta) {
                if (!respuesta.ok) {
                    console.warn('Formspree respondió con estado', respuesta.status);
                }
            }).catch(function (error) {
                console.warn('No se pudo registrar la descarga:', error);
            });
        });
    });
 
    function descargar(url) {
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = url.split('/').pop();
        document.body.appendChild(enlace);
        enlace.click();
        enlace.remove();
    }
 
    function mostrarAviso(aviso, url) {
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = url.split('/').pop();
        enlace.textContent = textos.enlace;
        aviso.textContent = textos.listo;
        aviso.appendChild(enlace);
        aviso.append('.');
    }
})();