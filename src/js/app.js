window.addEventListener("load", function (event) {
  ("use strict");
  /*************VARIABLES *************/
  /**HOME PAGE**/
  let containerBtnNavigation = document.querySelector(
    "#container-btn-navigation"
  );
  let btnRight = document.querySelector("#btn-right");
  let btnLeft = document.querySelector("#btn-left");
  let btnSelect = document.querySelector(".select");
  const btnContinent = document.querySelector(".btn-continent");
  const dropdown = document.querySelector(".dropdown");
  const options = document.querySelectorAll(".option");
  const selectContinent = document.querySelector(".select-continent");
  const selectItems = document.querySelectorAll(".select-item");
  const spanIcons = document.querySelectorAll(".span-like, .span-collection");
  const buttonSearch = document.querySelector("#button-search");
  const inputSearch = document.querySelector("#input-search");
  const dropdownMenuSearch = document.querySelector("#section3-dropdown__menu");

  /**
   * Horizontal menu of home page
   */

  /**
   * Change color when icon is clicked
   */
  spanIcons.forEach((spanIcon) => {
    spanIcon.addEventListener("click", () => {
      spanIcon.classList.toggle("clicked");
    });
  });

  /**
   * show up the search bar dropdown menu
   */
  buttonSearch.addEventListener("click", (e) => {
    dropdownMenuSearch.classList.add("active");
  });
  inputSearch.addEventListener("click", () => {
    dropdownMenuSearch.classList.add("active");
  });
  /*Hide when clicking outsite dropdown menu*/
  window.addEventListener("click", (e) => {
    if (
      !dropdownMenuSearch.contains(e.target) &&
      !buttonSearch.contains(e.target) &&
      !inputSearch.contains(e.target)
    ) {
      dropdownMenuSearch.classList.remove("active");
    }
  });
});
