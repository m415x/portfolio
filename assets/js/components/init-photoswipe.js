// Include Lightbox 
import PhotoSwipeLightbox from '../../vendor/photoswipe/dist/photoswipe-lightbox.esm.js';


const options = {
  // may select multiple "galleries"
  gallery: '#gallery',

  // Elements within gallery (slides)
  children: 'a',

  // setup PhotoSwipe Core dynamic import
  pswpModule: () => import('../../vendor/photoswipe/dist/photoswipe.esm.js'),

  // Modify this value to adjust the size of the image within the viewer
  fitRatio: 0.95,

  // Background backdrop opacity
  bgOpacity: 0.8,

  // Slide area padding
  padding: { top: 20, bottom: 70, left: 20, right: 20 },

  // Used for slide count indicator
  indexIndicatorSep: ' de ',

  scaleMode: 'fit'
};

const lightbox = new PhotoSwipeLightbox(options);

lightbox.on('uiRegister', function() {

  lightbox.pswp.ui.registerElement({
    name: 'custom-caption',
    order: 9,
    isButton: false,
    appendTo: 'root',
    html: 'Caption text',
    onInit: (el, pswp) => {
      lightbox.pswp.on('change', () => {
        const currSlideElement = lightbox.pswp.currSlide.data.element;
        let captionHTML = '';

        if (currSlideElement) {
          const title = currSlideElement.dataset.projectTitle || '';
          const date = currSlideElement.dataset.projectDate || '';
          const technique = currSlideElement.dataset.projectTechnique || '';
          let dimensions = currSlideElement.dataset.projectDimensions || '';
          if(dimensions != "pequeño formato") {
            dimensions = `${dimensions.split(", ")[0]}x${dimensions.split(", ")[1]}cm`
          } else {
            dimensions = "Pequeño formato"
          }

          // Create the custom caption HTML
          captionHTML = `
            <div class="custom-caption">
              <p>« ${title} » · ${date}</p>
              <p>${technique} · ${dimensions}</p>
            </div>
          `;
        }
        el.innerHTML = captionHTML || '';
      });
    }
  });

});

lightbox.init();
