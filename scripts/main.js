const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
const HIDDEN_DETAIL_CLASS = 'hidden-detail';
const TINY_EFFECT_CLASS = 'is-tiny';
const ESC_KEY_CODE = 27;


// setting the image and title
function setDetails(imageUrl, titleText) {
  'use strict';
    let detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src' , imageUrl);

    let detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}
// returning thumbnail to .img
function imageFromThumb(thumbnail) {
  'use strict';  
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addthumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function(event) {
    event.preventDefault();
	  setDetailsFromThumb(thumb); // alows all pictures to show text
    showDetails(); // show the big detail Image
  }); // Using anonymous funcion to add event click
}

function getThumbnailIsArray() {
  'use Strict';
   let thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
   let thumbnailArray = [].slice.call(thumbnails); //convert to nodelist to an array
   return thumbnailArray;
}
function initializeEvents() {
  'use strict';
  let thumbnails = getThumbnailIsArray();
  thumbnails.forEach(addthumbClickHandler);
  addKeyPressHandler();
}
// add the CSS class to <body> to hide the detail image
function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}
//remove the CSS class form <body> to show the detail image
function showDetails() {
  'use strict';
  let frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function () {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function(event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode == ESC_KEY_CODE) {
      hideDetails();
    }
  });
}


// run all the functions to link the thumbnails to the callback
// that will help update the main detail image with the thumbnail's image and title

initializeEvents();
