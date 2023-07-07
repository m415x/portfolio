// about variable
const aboutTextSection = document.querySelector("[data-about-text]");

// Load JSON data
fetch("../assets/data/about.json")
  .then(response => response.json())
  .then(data => {
    // Render <p> elements from JSON
    data.paragraphs.forEach(paragraph => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      aboutTextSection.appendChild(p);
    });
  })
  .catch(error => {
    console.log("Error al cargar los datos del JSON:", error);
  });
