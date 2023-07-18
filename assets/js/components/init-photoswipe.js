// Include Lightbox 
import PhotoSwipeLightbox from '../../vendor/photoswipe/dist/photoswipe-lightbox.esm.js';


window.onload = () => {

  const lightbox = new PhotoSwipeLightbox({

    // may select multiple "galleries"
    gallery: '#my-gallery',

    // Elements within gallery (slides)
    children: 'a',

    // setup PhotoSwipe Core dynamic import
    pswpModule: () => import('../../vendor/photoswipe/dist/photoswipe.esm.js')
  });

  lightbox.init();

};
