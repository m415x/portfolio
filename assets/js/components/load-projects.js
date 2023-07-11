// portfolio variable
const projectList = document.querySelector("[data-project-list]");
const filterList = document.querySelector("[data-filter-list]");
const filterSelect = document.querySelector("[data-filter-select]");

// Load JSON data
fetch("../assets/data/projects.json")
  .then(response => response.json())
  .then(data => {

    // Create a set to store unique categories
    const uniqueCategories = new Set();

    // Shuffle the projects array
    const shuffledProjects = shuffle(data.projects);

    // Generate the HTML elements for each project
    shuffledProjects.forEach(project => {
      const categories = project.category.split(", ");
      categories.forEach(category => uniqueCategories.add(category));

      const listItem = document.createElement("li");
      listItem.classList.add("portfolio__project__item", "active");
      listItem.setAttribute("data-filter-item", "");
      listItem.setAttribute("data-category", project.category);

      const image = document.createElement("img");
      image.src = project.image;
      image.alt = project.title;
      image.setAttribute("data-project-title", project.title);
      image.setAttribute("data-project-date", project.date);
      image.setAttribute("data-project-type", project.type);
      image.setAttribute("data-project-dimensions", project.dimensions);
      image.setAttribute("data-project-description", project.description);
      image.setAttribute("loading", "lazy");

      listItem.appendChild(image);
      projectList.appendChild(listItem);
    });

    // Convert uniqueCategories set to an array and sort alphabetically
    const sortedCategories = Array.from(uniqueCategories).sort();

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

  })
  .catch(error => {
    console.log("Error al cargar los proyectos:", error);
});

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
