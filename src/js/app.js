window.addEventListener("DOMContentLoaded", function (event) {
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
  const popupUploadMain = document.querySelector("#popup-upload_main");
  const popupUploadIcon = document.querySelector(".popup-upload_icon");
  /**
   * HOME PAGE VARIABLES
   */
  const btnSubmitVr = document.querySelectorAll(".btn-submit_vr");
  // Close button of home popup
  const homePopupClosebtn = document.querySelectorAll(".home-popup_closebtn");
  // Home popup container
  const popupContainer = document.querySelector("#popup-container");
  // Home popup
  const popup = document.querySelectorAll(".popup");
  // popup submit button terms
  const submitPopup1 = document.querySelector("#submit-popup1");
  // select file label
  const popupUploadBtn = document.querySelector("#popup-upload_btn");
  // Thumbnail file label
  const thumbnailUploadBtn = document.querySelector("#thumbnail-upload_btn");
  // Thumbnail Area
  const thumbnailArea = document.querySelector(".thumbnailArea");
  // Source video
  const sourceVideo = document.querySelector("#source-video");
  // Scrolled navigation menu
  const scrolledNavigationMenu = document.querySelector(".div-navigation");
  const btnScrollRight = document.querySelector(".fas.fa-chevron-right");
  const btnScrollLeft = document.querySelector(".fas.fa-chevron-left");
  // Mobile menu variables
  const mobileMenuBtn = document.querySelector("#mobile-menu_btn");
  const mobileMenuContent = document.querySelector(".mobile-menu_content");
  const contentLaplaceLegend = document.querySelectorAll(
    ".content-laplace_legend"
  );
  const contentLaplaceSubmenu = document.querySelectorAll(
    ".content-laplace_submenu"
  );
  // File uploaded by the user
  let file;
  let fileThumbnail;
  let filename;
  let fileVideo;

  /**
   * Change placeholder navigation content when is more then 750px
   */
  var media = "screen and (min-width: 720px)",
    placeholderShort = "Search videos",
    placeholderLong = "Search high-resolution 360° videos";
  var changeSearchInputContent = function (event) {
    if (window.matchMedia(media).matches) {
      document
        .querySelector(".search-input")
        .setAttribute("placeholder", placeholderLong);
    } else {
      document
        .querySelector(".search-input")
        .setAttribute("placeholder", placeholderShort);
    }
  };
  window.addEventListener("resize", changeSearchInputContent, true);
  window.addEventListener("load", changeSearchInputContent, true);
  /**
   *
   * Test select countries
   */

  // Load countries
  function loadCountries() {
    fetch("https://restcountries.com/v2/all")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((country) => {
          if (country.region == "Asia") {
            if (document.querySelector("#country")) {
              document.querySelector(
                "#country"
              ).innerHTML += `<option value="${country.name}">${country.name}</option>`;
            }
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  loadCountries();

  if (document.querySelector("#continent")) {
    document.querySelector("#continent").addEventListener("change", (e) => {
      document.querySelector("#country").innerHTML = "";
      fetch("https://restcountries.com/v2/all")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          switch (document.querySelector("#continent").value) {
            case "asia":
              data.forEach((country) => {
                if (country.region == "Asia") {
                  insertCountries(country);
                }
              });
              break;
            case "africa":
              data.forEach((country) => {
                if (country.region == "Africa") {
                  insertCountries(country);
                }
              });
              break;
            case "europe":
              data.forEach((country) => {
                if (country.region == "Europe") {
                  insertCountries(country);
                }
              });
              break;
            case "americas":
              data.forEach((country) => {
                if (country.region == "Americas") {
                  insertCountries(country);
                }
              });
              break;
            case "oceania":
              data.forEach((country) => {
                if (country.region == "Oceania") {
                  insertCountries(country);
                }
              });
              break;
            case "antarctica":
              data.forEach((country) => {
                if (country.region == "Polar") {
                  insertCountries(country);
                }
              });
              break;
            default:
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  // insert countries in select option function
  function insertCountries(country) {
    if (document.querySelector("#country")) {
      document.querySelector(
        "#country"
      ).innerHTML += `<option value="${country.name}">${country.name}</option>`;
    }
  }
  // Load Date
  function loadDate() {
    var nowYear = new Date().getFullYear();
    var options;
    for (var y = nowYear; y >= 1970; y--) {
      options += `<option value=${y}> ${y} </option>`;
    }
    if (document.querySelector("#year")) {
      document.querySelector("#year").innerHTML = options;
    }
  }
  loadDate();

  // Load Mounth
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  function loadMonth() {
    var options;
    for (var i = 0; i < monthNames.length; i++) {
      options += `<option value=${monthNames[i]}> ${monthNames[i]} </option>`;
    }
    if (document.querySelector("#month")) {
      document.querySelector("#month").innerHTML = options;
    }
  }
  loadMonth();
  /**
   * Horizontal menu of home page
   */
  if (btnScrollRight) {
    btnScrollRight.addEventListener("click", function () {
      let scrollAmount = 0;
      let exscrollLeft = [];
      var slideTimer = setInterval(function () {
        scrolledNavigationMenu.scrollLeft += 20;
        exscrollLeft.push(scrolledNavigationMenu.scrollLeft);
        scrollAmount += 10;
        if (scrollAmount >= 100) {
          window.clearInterval(slideTimer);
        }
        exscrollLeft.forEach((number, i, arr) => {
          if (arr[i] == arr[i + 1]) {
            btnScrollRight.parentNode.classList.add("hide");
          } else {
            btnScrollLeft.parentNode.classList.add("active");
          }
        });
      }, 25);
    });
  }
  if (btnScrollLeft) {
    btnScrollLeft.addEventListener("click", function () {
      let scrollAmount = 0;
      let exscrollLeft = [];
      var slideTimer = setInterval(function () {
        scrolledNavigationMenu.scrollLeft -= 20;
        scrollAmount += 10;
        if (scrollAmount >= 100) {
          window.clearInterval(slideTimer);
        }
        if (scrolledNavigationMenu.scrollLeft == 0) {
          btnScrollLeft.parentNode.classList.remove("active");
        } else {
          btnScrollRight.parentNode.classList.remove("hide");
        }
        exscrollLeft.forEach((number, i, arr) => {
          if (arr[i] == arr[i + 1]) {
            btnScrollLeft.parentNode.classList.add("active");
          } else {
            btnScrollRight.parentNode.classList.remove("hidee");
          }
        });
      }, 25);
    });
  }

  /**
   * Change color when icon is clicked
   */
  if (spanIcons) {
    spanIcons.forEach((spanIcon) => {
      spanIcon.addEventListener("click", () => {
        spanIcon.classList.toggle("clicked");
      });
    });
  }

  /**
   * show up the search bar dropdown menu
   */
  if (buttonSearch) {
    buttonSearch.addEventListener("click", (e) => {
      dropdownMenuSearch.classList.add("active");
    });
  }
  if (inputSearch) {
    inputSearch.addEventListener("click", () => {
      dropdownMenuSearch.classList.add("active");
    });
  }

  /**
   * Mobile menu
   */
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuContent.classList.toggle("active");
    });
  }

  // Show Laplace & Legal submenu
  contentLaplaceLegend.forEach((title) => {
    title.addEventListener("click", (e) => {
      if (contentLaplaceLegend[0] == title) {
        contentLaplaceSubmenu[0].classList.toggle("active");
        document.querySelectorAll(".triangle")[0].classList.toggle("flipped");
      } else {
        contentLaplaceSubmenu[1].classList.toggle("active");
        document.querySelectorAll(".triangle")[1].classList.toggle("flipped");
      }
    });
  });
  /**
   * Hide when clicking outsite dropdown menu
   */
  window.addEventListener("click", (e) => {
    if (
      !dropdownMenuSearch.contains(e.target) &&
      !buttonSearch.contains(e.target) &&
      !inputSearch.contains(e.target)
    ) {
      dropdownMenuSearch.classList.remove("active");
    }
  });
  /**
   * HOME POPUP SCRIPTS
   */

  /* Showing second popup when terms input checked */
  if (submitPopup1) {
    submitPopup1.addEventListener("click", (e) => {
      e.preventDefault();
      if (document.querySelector("#popup1-cbox1").checked) {
        popup[0].classList.remove("active");
        popup[1].classList.add("active");
      }
    });
  }

  /* cancel the default drop and dragover actions . */
  document.addEventListener("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
  });
  document.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
  });

  /* add drop and change action to upload container */
  if (popupUploadMain) {
    popupUploadMain.addEventListener("drop", (event) => {
      file = event.dataTransfer.files[0];
      getFileName(file);
    });
  }
  if (popupUploadBtn) {
    popupUploadBtn.addEventListener("click", () => {
      popupUploadBtn.nextElementSibling.onchange = function (event) {
        file = event.target.files[0];
        getFileName(file);
      };
    });
  }
  function getFileName(file) {
    if (file.type.match("video.*")) {
      document
        .querySelector(".popup-upload-warning")
        .classList.remove("active");
      filename = file.name;
      /** Go to the next popup content */
      popup[1].classList.remove("active");
      popup[2].classList.add("active");
      /** Showing file name */
      document.querySelector(".media-side_filename > span").textContent =
        filename;

      // can't edit when video uploading
      let VideoFileReader = new FileReader();
      VideoFileReader.onload = function (e) {
        let sourceTag = `<source src="${URL.createObjectURL(file)}" type="${
          file.type
        }" controls/>`;
        sourceVideo.innerHTML = sourceTag;
      };
      //
      VideoFileReader.readAsDataURL(file);
    } else {
      document.querySelector(".popup-upload-warning").classList.add("active");
    }
  }

  /* add Upload progress bar */
  /* Add thumbnail picture for the video */
  if (thumbnailUploadBtn) {
    thumbnailUploadBtn.addEventListener("click", () => {
      thumbnailUploadBtn.nextElementSibling.onchange = function (event) {
        fileThumbnail = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = () => {
          let fileURL = fileReader.result;
          let imgTag = `<img src="${fileURL}" alt="">`;
          thumbnailArea.innerHTML = imgTag;
          thumbnailArea.classList.add("active");
        };
        fileReader.readAsDataURL(fileThumbnail);
      };
    });
  }
  /* close home popup */
  if (homePopupClosebtn) {
    homePopupClosebtn.forEach((closebtn) => {
      closebtn.addEventListener("click", () => {
        popup.forEach((popup) => {
          popup.classList.remove("active");
        });
        document.body.classList.remove("no-scroll");
        popupContainer.classList.remove("active");
      });
    });
  }
  /**
   * Desactivate body scrolling when clicking on submit a vr button
   */
  if (btnSubmitVr) {
    btnSubmitVr.forEach((btn) => {
      btn.addEventListener("click", () => {
        popup[0].classList.add("active");
        document.body.classList.add("no-scroll");
        popupContainer.classList.add("active");
      });
    });
  }

  /***********************  SEARCH PAGE ***********************/
  // Posibilites contents
  const searchContainerVr = document.querySelector(".search-container_vr");
  const searchContainerUsers = document.querySelector(
    ".search-container_users"
  );
  const searchContainerNoResults = document.querySelector(
    ".search-container_noresults"
  );
  // Navigation buttons
  const navigationSearchItem = document.querySelectorAll(
    ".navigation-search_item > a"
  );
  // Add border to navigation menu item when is clicked and show the appropriate content
  if (navigationSearchItem) {
    navigationSearchItem.forEach((item) => {
      item.addEventListener("click", (event) => {
        for (let i = 0; i < navigationSearchItem.length; i++) {
          navigationSearchItem[i].classList.remove("active");
        }
        item.classList.add("active");
      });
    });
  }

  /**
   *  ******************************************** USER PAGE *****************************************************
   */
  /*******Variables *********/
  const uspage = document.getElementById("uspage");

  // Activate contents depends to submenu
  const horizontalSidenavElement = document.querySelectorAll(
    ".horizontal-sidenav li a"
  );
  const uspageMain = document.querySelectorAll(".container-home_uspage");

  // Activate sub menu element when is clicked
  horizontalSidenavElement.forEach((li, index) => {
    if (horizontalSidenavElement) {
      li.addEventListener("click", function () {
        removeActiveClass(horizontalSidenavElement);
        removeActiveClass(uspageMain);
        uspageMain[index].classList.add("active");
        li.classList.add("active");
      });
    }
  });
  // Stats submenu content
  if (uspage) {
    var viewsChartElement = document
      .getElementById("views-chart")
      .getContext("2d");
    var likesChartElement = document
      .getElementById("likes-chart")
      .getContext("2d");

    // Disable data in column and row
    Chart.defaults.scale.ticks.display = false;

    // Enable Chart for views
    let last30Days = [];
    let dateNow;
    let j;
    for (let i = 0; i < 30; i++) {
      if (new Date().getDate() - i <= 0) {
        j = i - 30;
        dateNow = new Date().getDate() - j;
        last30Days.push(dateNow);
      } else {
        dateNow = new Date().getDate() - i;
        last30Days.push(dateNow);
      }
    }
    let viewsNumberData = [];
    for (let i = 0; i < 30; i++) {
      viewsNumberData.push(Math.random() * 1000);
    }

    // Add data to views chart
    let viewsChart = new Chart(viewsChartElement, {
      type: "line",
      data: {
        labels: last30Days.reverse(),
        datasets: [
          {
            label: "",
            data: viewsNumberData,
            tension: 0.5,
            pointHoverBackgroundColor: "rgb(255, 255, 255)",
            pointHoverBorderColor: "rgb(0, 218, 187)",
            pointBackgroundColor: "rgba(255, 255 , 255, 0)",
            pointBorderColor: "rgba(255, 255 , 255, 0)",
            borderColor: "#171717",
            hoverBorderColor: "rgb(0, 218, 187)",
            borderWidth: 1.5,
          },
        ],
      },
      options: {
        hover: { mode: "dataset", intersect: true },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    // Add data to likes chart
    let likesChart = new Chart(likesChartElement, {
      type: "line",
      data: {
        labels: last30Days.reverse(),
        datasets: [
          {
            label: "",
            data: viewsNumberData,
            tension: 0.5,
            pointHoverBackgroundColor: "rgb(255, 255, 255)",
            pointHoverBorderColor: "rgb(0, 218, 187)",
            pointBackgroundColor: "rgba(255, 255 , 255, 0)",
            pointBorderColor: "rgba(255, 255 , 255, 0)",
            borderColor: "#171717",
            hoverBorderColor: "rgb(0, 218, 187)",
            borderWidth: 1.5,
          },
        ],
      },
      options: {
        hover: { mode: "dataset", intersect: true },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  /**
   * *************************************************USER PAGE SETTINGS**********************************************************
   */
  const verticalSidenavElement = document.querySelectorAll(
    ".vertical-sidenav li"
  );
  const uspageSettings = document.getElementById("uspage-settings");
  let uspageSettingsmain;
  if (uspageSettings) {
    uspageSettingsmain = document.querySelectorAll(".main");
  }
  // Activate sub menu element when is clicked
  verticalSidenavElement.forEach((li, index) => {
    if (verticalSidenavElement) {
      li.addEventListener("click", function () {
        removeActiveClass(verticalSidenavElement);
        removeActiveClass(uspageSettingsmain);
        uspageSettingsmain[index].classList.add("active");
        li.classList.add("active");
      });
    }
  });
  const removeActiveClass = function (elements) {
    elements.forEach((element) => {
      element.classList.remove("active");
    });
  };
});
