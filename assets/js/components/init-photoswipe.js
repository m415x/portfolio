// Include Lightbox 
import PhotoSwipeLightbox from '../../vendor/photoswipe/dist/photoswipe-lightbox.esm.js';


const images = document.querySelectorAll('[data-project-item] img');
let loadedCount = 0;

function imageLoaded() {
  loadedCount++;
  if (loadedCount === images.length) {
    // Todas las imágenes han sido cargadas, inicializar PhotoSwipe
    const options = {
      // may select multiple "galleries"
      gallery: '#gallery',
    
      // Elements within gallery (slides)
      children: 'a',
    
      // setup PhotoSwipe Core dynamic import
      pswpModule: () => import('../../vendor/photoswipe/dist/photoswipe.esm.js'),
    
      // Modify this value to adjust the size of the image within the viewer
      // fitRatio: 0.75,
    
      // Background backdrop opacity
      bgOpacity: 0.8,
    
      // Slide area padding
      padding: { top: 20, bottom: 90, left: 20, right: 20 },
    
      // Used for slide count indicator
      indexIndicatorSep: ' de ',
    
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
              const onSale = currSlideElement.dataset.projectOnSale || '';
              const awarded = currSlideElement.dataset.projectAwarded || '';
              let dimensions = currSlideElement.dataset.projectDimensions || '';

              if(dimensions == "pequeño formato") {
                dimensions = "Pequeño formato";
              } else if (dimensions == "gran formato") {
                dimensions = "Gran formato";
              } else if (dimensions.includes(",")) {
                dimensions = `${dimensions.split(", ")[0]}x${dimensions.split(", ")[1]}cm`;
              }

              // Create the custom caption HTML
              captionHTML = `
                <div class="custom-caption">
                  <p>« ${title} » ${title != "undefined" && date != "undefined" ? " · " : ""} ${date != "undefined" ? date : ""}</p>
                  <p>${technique != "undefined" ? technique : ""} ${technique != "undefined" && dimensions != "undefined" ? " · " : ""} ${dimensions != "undefined" ? dimensions : ""}</p>
                  <p>${awarded != "false" ? awarded.replace(".", " -") : ""} ${awarded != "false" && onSale == "false" ? " · " : ""} ${onSale != "true" ? "VENDIDA" : ""}</p>
                </div>
              `;

            }
            el.innerHTML = captionHTML || '';
          });
        }
      });
    
    });
    
    lightbox.init();

    // Hide loader after 5 seconds
    // const loader = document.querySelector("[data-loader]");
    // setTimeout(() => {
    //   loader.style.display = "none";
    // }, 2000);

  }
  
}

images.forEach(image => {
  if (image.complete) {
    imageLoaded();
  } else {
    image.addEventListener('load', imageLoaded);
  }
});
