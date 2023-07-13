// portfolio variable
const projectList = document.querySelector("[data-project-list]");
const filterList = document.querySelector("[data-filter-list]");
const filterSelect = document.querySelector("[data-filter-select]");

// Load JSON data
fetch("../assets/data/projects.json")
  .then(response => response.json())
  .then(data => {

    // Create a set to store unique categories
    const uniqueCategories = new Set(); // dibujo, pintura, técnicas mixtas, escultura, grabado

    // Shuffle the projects array
    const shuffledProjects = shuffle(data.projects);

    // Generate the HTML elements for each project
    shuffledProjects.forEach(project => {
      const categories = project.category.split(", ");

      if(project.onSale === true) {
        categories.push("en venta");
      }
      if(project.awarded === true) {
        categories.push("premiadas");
      }

      categories.forEach(category => uniqueCategories.add(category));

      const listItem = document.createElement("li");
      listItem.classList.add("portfolio__project__item", "active");
      listItem.setAttribute("data-project-item", "");
      listItem.setAttribute("data-category", categories.join(", "));

      const image = document.createElement("img");
      image.src = project.image;
      image.alt = project.title;
      image.setAttribute("data-project-title", project.title);
      image.setAttribute("data-project-date", project.date);
      image.setAttribute("data-project-technique", project.technique);
      image.setAttribute("data-project-dimensions", project.dimensions);
      // image.setAttribute("data-project-description", project.description);
      image.setAttribute("data-project-on-sale", project.onSale);
      image.setAttribute("data-project-awarded", project.awarded);

      if(project.onSale === true) {
        const onSaleItem = document.createElement("span");
        onSaleItem.classList.add("portfolio__project__item--on-sale");
        listItem.appendChild(onSaleItem);
      }

      if(project.awarded === true) {
        const awardedItem = document.createElement("span");
        awardedItem.classList.add("portfolio__project__item--awarded");
        listItem.appendChild(awardedItem);
      }

      listItem.appendChild(image);
      projectList.appendChild(listItem);
    });

    // Convert uniqueCategories set to an array and sort alphabetically
    const sortedCategories = Array.from(uniqueCategories).sort();

    // Move the category "en venta" to position 0
    const indexEnVenta = sortedCategories.indexOf("en venta");
    if (indexEnVenta > -1) {
      sortedCategories.splice(indexEnVenta, 1);
      sortedCategories.unshift("en venta");
    }

    // Move the category "premiadas" to position 1
    const indexPremiadas = sortedCategories.indexOf("premiadas");
    if (indexPremiadas > -1) {
      sortedCategories.splice(indexPremiadas, 1);
      sortedCategories.splice(1, 0, "premiadas");
    }

    // Generate the HTML elements for category buttons
    sortedCategories.forEach(category => {
      const categoryItemList = document.createElement("li");
      categoryItemList.classList.add("portfolio__filter-list__item");
      const categoryBtnList = document.createElement("button");
      categoryBtnList.setAttribute("data-filter-btn", "");
      categoryBtnList.textContent = category;
      categoryItemList.appendChild(categoryBtnList);
      filterList.appendChild(categoryItemList);

      const categoryItemSelect = document.createElement("li");
      categoryItemSelect.classList.add("portfolio__filter-select__list__item");
      const categoryBtnSelect = document.createElement("button");
      categoryBtnSelect.setAttribute("data-select-item", "");
      categoryBtnSelect.textContent = category;
      categoryItemSelect.appendChild(categoryBtnSelect);
      filterSelect.appendChild(categoryItemSelect);
    });

    // Call a function to apply lazy loading after the elements have been added to the DOM
      applyLazyLoading();

  })
  .catch(error => {
    console.log("Error al cargar los proyectos:", error);
});

// Function to add loading lazy
function applyLazyLoading() {
  const images = document.querySelectorAll("[data-project-list] img");
  images.forEach(image => {
    image.setAttribute("loading", "lazy");
  });
}

// Function to shuffle an array
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
