import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { reviews } from "./reviews.js";

const reviewForm = document.getElementById("review-form");
const reviewStats = document.getElementById("review-stats");
const reviewList = document.getElementById("review-list");
const genreSelect = document.getElementById('genre-sort');


// Stretch Goals:
// Add local storage persistence


function getReviewsFeedHTML(genre) {
  console.log("getReviewsFeedHTML called");

  let reviewsToDisplay = reviews // DEFAULT display - *all* reviews

  if (genre !== 'all') {
    reviewsToDisplay = reviews.filter(review => review.genre === genre);
  }

  let reviewHTML = ``;

  reviewsToDisplay.forEach(review => {

    reviewHTML += `
            <div class="film-item">
                <img src="${review.image}" alt="">
                <h4 class="">${review.title}</h4>
                <p><i>${review.genre}</i></p>
                <p class="rating">Rating: ${review.rating}/5 ✨</p>
                <p class="review-text">${review.review}</p>
            </div>`;
  });
  return reviewHTML;
}

function getReviewsStats() {
  const totalReviews = reviews.length;
  const totalReviewScores = reviews.reduce(
    (total, review) => total + parseInt(review.rating), 0);
  const averageReviewScore =
    Math.floor(totalReviews > 0 ? totalReviewScores / totalReviews : 0);

  return `
    <div>
        <p>Total Reviews: ${totalReviews}</p>
        <p>Average Rating: ${averageReviewScore}✨</p>
    </div>`;
}


function renderReviews(genre) {
  reviewStats.innerHTML = getReviewsStats();
  reviewList.innerHTML = getReviewsFeedHTML(genre);
  console.log("Reviews array after render:", reviews);
}

function createReview(e) {
  e.preventDefault();

  console.log("createReview called");

  // get form values
  let reviewTitle = document.getElementById("movie-title");
  let reviewGenre = document.getElementById("movie-genre");
  let reviewRating = document.getElementById("movie-rating");
  let reviewText = document.getElementById("movie-text");

  // init newReview object
  let newReview;

  if (reviewTitle && reviewGenre && reviewRating && reviewText) {
    // create newReview
    newReview = {
      title: reviewTitle.value,
      genre: reviewGenre.value,
      rating: reviewRating.value,
      review: reviewText.value,
    };
  } else {
    console.error("One or more review form elements not found:");
    if (!reviewTitle) console.error("reviewTitle not found");
    if (!reviewGenre) console.error("reviewGenre not found");
    if (!reviewRating) console.error("reviewRating not found");
    if (!reviewText) console.error("reviewText not found");
    return;
  }
  console.log("New Review Object:", newReview);

  addNewReview(newReview);
  reviewForm.reset();
}

// adding newReview as an object to the array
function addNewReview(reviewObject) {
  console.log("addNewReview called with:", reviewObject);

  reviews.unshift(reviewObject);
  const selectedGenre = genreSelect.value

  renderReviews(selectedGenre);
}


// if User Review Form has been completed and submit button has been clicked, then call createReview
if (reviewForm) {
  reviewForm.addEventListener("submit", createReview);

  console.log("reviewForm event listener attached");
} else {
  console.log("Review form NOT found");
}

// initial render
renderReviews('all');

// rendering our reviewList according to a selected genre
genreSelect.addEventListener('change', () => {
  const selectedGenre = genreSelect.value;
  renderReviews(selectedGenre);
});

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
    </div>`;
