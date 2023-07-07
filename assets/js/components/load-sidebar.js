// sidebar variables
const sidebarAvatar = document.querySelector("[data-sidebar-avatar]");
const sidebarName = document.querySelector("[data-sidebar-name]");
const sidebarProfession = document.querySelector("[data-sidebar-profession]");
const sidebarContactList = document.querySelector("[data-sidebar-contact]");
const sidebarSocialList = document.querySelector("[data-sidebar-social]");

// Load JSON data
fetch("../assets/data/sidebar.json")
  .then(response => response.json())
  .then(data => {

    // Header data
    sidebarAvatar.src = data.header.avatar;
    sidebarAvatar.alt = data.header.name;
    sidebarName.textContent = data.header.name;
    sidebarName.title = data.header.name;
    sidebarProfession.textContent = data.header.profession;

    // Contact list data
    data.contacts.forEach(contact => {
      const listItem = document.createElement("li");
      listItem.classList.add("sidebar__content__list__item");

      const iconDiv = document.createElement("div");
      iconDiv.classList.add("sidebar__content__list__item__icon");
      const icon = document.createElement("ion-icon");
      icon.setAttribute("name", contact.icon);
      iconDiv.appendChild(icon);

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("sidebar__content__list__item__info");
      const title = document.createElement("p");
      title.textContent = contact.title;
      const link = document.createElement("a");
      link.href = contact.link;
      link.target = "_blank";
      link.textContent = contact.text;
      infoDiv.appendChild(title);
      infoDiv.appendChild(link);

      listItem.appendChild(iconDiv);
      listItem.appendChild(infoDiv);

      sidebarContactList.appendChild(listItem);
    });

    // Social list data
    data.socials.forEach(social => {
      const listItem = document.createElement("li");
      listItem.classList.add("sidebar__content__social__item");

      const itemA = document.createElement("a");
      itemA.target = "_blank";
      itemA.href = social.link;

      const icon = document.createElement("ion-icon");
      icon.setAttribute("name", social.icon);
      itemA.appendChild(icon);

      listItem.appendChild(itemA);

      sidebarSocialList.appendChild(listItem);
    });

  })
  .catch(error => {
    console.log("Error al cargar los datos del sidebar:", error);
});
