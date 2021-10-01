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
  const btnSubmitVr = document.querySelector("#btn-submit_vr");
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
  // File uploaded by the user
  let file;
  let fileThumbnail;
  let filename;
  let fileVideo;

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
  spanIcons.forEach((spanIcon) => {
    spanIcon.addEventListener("click", () => {
      spanIcon.classList.toggle("clicked");
    });
  });

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
    btnSubmitVr.addEventListener("click", () => {
      document.body.classList.add("no-scroll");
      popup[0].classList.add("active");
      popupContainer.classList.add("active");
    });
  }

  /***********************  SEARCH PAGE SCRIPTS ***********************/
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
});
