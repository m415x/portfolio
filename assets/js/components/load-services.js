// service variable
const serviceList = document.querySelector("[data-service-list]");

// Load JSON data
fetch("../assets/data/services.json")
  .then(response => response.json())
  .then(data => {

    // Generate the HTML elements for each service
    data.forEach(activity => {
      const li = document.createElement("li");
      li.classList.add("about__service__list__item");

      const iconDiv = document.createElement("div");
      iconDiv.classList.add("about__service__list__item__icon");
      const iconImg = document.createElement("img");
      iconImg.src = activity.icon;
      iconImg.alt = activity.title;
      iconDiv.appendChild(iconImg);

      const contentDiv = document.createElement("div");
      contentDiv.classList.add("about__service__list__item__content");
      const titleH4 = document.createElement("h4");
      titleH4.classList.add("h4");
      titleH4.textContent = activity.title;
      const descriptionP = document.createElement("p");
      descriptionP.textContent = activity.description;
      const readMoreBtn = document.createElement("button");
      readMoreBtn.textContent = "leer más";
      
      contentDiv.appendChild(titleH4);
      contentDiv.appendChild(descriptionP);
      contentDiv.appendChild(readMoreBtn);

      li.appendChild(iconDiv);
      li.appendChild(contentDiv);

      serviceList.appendChild(li);
    });
  })
  .catch(error => {
    console.log("Error al cargar las actividades:", error);
  });
