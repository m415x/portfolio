// Include Lightbox 
import PhotoSwipeLightbox from '../../vendor/photoswipe/dist/photoswipe-lightbox.esm.js';


const lightbox = new PhotoSwipeLightbox({

  // may select multiple "galleries"
  gallery: '#gallery',

  // Elements within gallery (slides)
  children: 'a',

  // setup PhotoSwipe Core dynamic import
  pswpModule: () => import('../../vendor/photoswipe/dist/photoswipe.esm.js'),

  // Modifica este valor para ajustar el tamaño de la imagen dentro del visor
  fitRatio: 0.95, 
});

lightbox.init();
