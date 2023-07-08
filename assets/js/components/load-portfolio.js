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

    // Generate the HTML elements for each project
    data.projects.forEach(project => {
      uniqueCategories.add(project.category);

      const listItem = document.createElement("li");
      listItem.classList.add("portfolio__project__item", "active");
      listItem.setAttribute("data-filter-item", "");
      listItem.setAttribute("data-category", project.category);

      const link = document.createElement("a");
      link.href = project.link;

      const figure = document.createElement("figure");

      const iconDiv = document.createElement("div");
      const icon = document.createElement("ion-icon");
      icon.setAttribute("name", "eye-outline");
      iconDiv.appendChild(icon);

      const image = document.createElement("img");
      image.src = project.image;
      image.alt = project.title;
      image.setAttribute("loading", "lazy");

      const title = document.createElement("h3");
      title.textContent = project.title;

      const description = document.createElement("p");
      description.textContent = project.description;

      figure.appendChild(iconDiv);
      figure.appendChild(image);
      link.appendChild(figure);
      link.appendChild(title);
      link.appendChild(description);
      listItem.appendChild(link);
      projectList.appendChild(listItem);
    });

    // Create category options based on the unique categories in the set
    uniqueCategories.forEach(category => {
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
