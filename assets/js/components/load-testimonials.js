// testimonials variable
const testimonialsList = document.querySelector("[data-testimonials-list]");

// Load JSON data
fetch("../assets/data/testimonials.json")
  .then(response => response.json())
  .then(data => {

    // Generate the HTML elements for each testimonial
    data.forEach(testimonial => {
      const li = document.createElement("li");
      li.classList.add("about__testimonials__list__item");

      const div = document.createElement("div");
      div.classList.add("about__testimonials__list__item__card");
      div.setAttribute("data-testimonials-item", "");

      const figure = document.createElement("figure");
      figure.classList.add("about__testimonials__list__item__card__avatar");
      const img = document.createElement("img");
      img.src = testimonial.avatar;
      img.alt = testimonial.name;
      img.setAttribute("data-testimonials-avatar", "");
      figure.appendChild(img);

      const h4 = document.createElement("h4");
      h4.classList.add("h4", "about__testimonials__list__item__card__title");
      h4.setAttribute("data-testimonials-title", "");
      h4.textContent = testimonial.name;

      // const time = document.createElement("time");
      // time.setAttribute("datetime", testimonial.date);
      // time.style.display = "none";
      // time.setAttribute("data-testimonials-date", "");
      // time.textContent = testimonial.date;

      const profession = document.createElement("h6");
      profession.style.display = "none";
      profession.setAttribute("data-testimonials-profession", "");
      profession.textContent = testimonial.profession;

      const divText = document.createElement("div");
      divText.classList.add("about__testimonials__list__item__card__text");
      divText.setAttribute("data-testimonials-text", "");
      testimonial.text.forEach(paragraph => {
        const p = document.createElement("p");
        p.textContent = paragraph;
        divText.appendChild(p);
      });



      div.appendChild(figure);
      div.appendChild(h4);
      // div.appendChild(time);
      div.appendChild(profession);
      div.appendChild(divText);

      li.appendChild(div);

      testimonialsList.appendChild(li);
    });
  })
  .catch(error => {
    console.log("Error al cargar las reseñas:", error);
});
