import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { reviews } from "./data/reviews.js";
import { renderReviews } from "./components/review-list.js";

const reviewForm = document.getElementById("review-form");
const reviewStats = document.getElementById("review-stats");
const reviewList = document.getElementById("review-list");
const genreSelect = document.getElementById("genre-select");

// Stretch Goals:
// Add local storage persistence

renderReviews(reviews, reviewList, reviewStats); // Initial render

reviewForm.addEventListener("submit", createReview);
genreSelect.addEventListener("change", handleGenreChange);

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
  const selectedGenre = genreSelect.value;
  const reviewsToDisplay =
    selectedGenre === "all"
      ? reviews
      : reviews.filter((review) => review.genre === selectedGenre);
  renderReviews(reviewsToDisplay, reviewList, reviewStats);

  renderReviews(selectedGenre);
}

// if User Review Form has been completed and submit button has been clicked, then call createReview
if (reviewForm) {
  reviewForm.addEventListener("submit", createReview);

  console.log("reviewForm event listener attached");
} else {
  console.log("Review form NOT found");
}

// rendering our reviewList according to a selected genre
function handleGenreChange() {
  const selectedGenre = genreSelect.value;
  const reviewsToDisplay =
    selectedGenre === "all"
      ? reviews
      : reviews.filter((review) => review.genre === selectedGenre);
  renderReviews(reviewsToDisplay, reviewList, reviewStats);
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
    </div>`;
