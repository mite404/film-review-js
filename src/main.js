import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { reviews } from "./reviews.js";

const submitBtn = document.getElementById("submit");
const reviewInput = document.getElementById("review-input");


// TODO 1: add review form w/ fields
// title, genre, rating, review text
// submit review button

// TODO 2: display film reviews
// tap into array and display:
// title, genre, rating, review text
// possible stretch goal display as review 'cards'

// TODO 3: filter by genre
// could display total # of reviews submitted
// display average rating of all reviews

function getReviewsFeedHTML() {
  let reviewHTML = ``;

  reviews.forEach(review => {

      reviewHTML += `
        <p>${review.title}</p>
        <p>${review.genre}</p>
        <p>${review.rating}</p>
        <p>${review.review}</p>
      `
  })

  return reviewHTML
}

document.getElementById("logos").innerHTML = `
  <div>
    <div class="container">
        <a href="https://vite.dev" target="_blank">
          <img src="${viteLogo}" class="logo" alt="Vite logo" />
        </a>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
          <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
        </a>
        <h1>Review.it</h1>
        <h3>User Submitted Film Reviews</h3>
    </div>
  </div>
`;

function render() {
  document.getElementById("reviews-feed").innerHTML = getReviewsFeedHTML();
}

render()