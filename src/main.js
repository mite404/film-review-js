import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { reviews } from "./data/reviews.js";
import { renderReviews } from "./components/renderView.js";
import { populateGenreList } from "./components/populateGenreList.js";
import { v4 as uuidv4 } from "uuid";

const reviewForm = document.getElementById("review-form");
const movieGenre = document.getElementById("movie-genre");
const reviewStats = document.getElementById("review-stats");
const reviewList = document.getElementById("review-list");
const genreSelect = document.getElementById("genre-select");
const favoriteSort = document.getElementById("favorite-sort");

function loadReviews() {
  // Load reviews from local storage.

  const storedReviews = localStorage.getItem("user-reviews");

  if (storedReviews) {
    const parsedReviews = JSON.parse(storedReviews);
    console.log("Loaded reviews from local storage:", parsedReviews);

    return Array.isArray(parsedReviews) ? parsedReviews : [];
  } else {
    // If no reviews in local storage, use default reviews and save them to `localStorage`
    saveUserReviews(reviews);
    console.log("No reviews in local storage, using default reviews:", reviews);
    return reviews; // Default reviews list if nothing is in `localStorage`
  }
}

function saveUserReviews(reviews) {
  // Save reviews to local storage.
  localStorage.setItem("user-reviews", JSON.stringify(reviews));
  console.log("Saved reviews to local storage:", reviews);
}

// Initial render
let currentReviews = loadReviews();
filterReviewsGenre("all", currentReviews);

// Populate genre select elements
populateGenreList(["movie-genre", "genre-select"]);

// Comparing UUID of click to object in array via handleLikeClick func
document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
    console.log("handleLickClick called");
  }
});

function handleLikeClick(reviewId) {
  // Finds UUID of review's 'clicked liked icon' in reviews array and sets `isLiked` to true/false.

  if (!reviewId) {
    console.error("Invalid reviewId!");
    return;
  }

  const targetReviewObj = currentReviews.find(
    (review) => review.uuid === reviewId);

  if (!targetReviewObj) {
    console.error("Review not found!");
    return;
  }

  targetReviewObj.isLiked = !targetReviewObj.isLiked;

  // Re-render the reviews to update the heart icon's class
  const selectedGenre = genreSelect.value;
  filterReviewsGenre(selectedGenre);
}

// Event listeners
reviewForm.addEventListener("submit", createReview);
genreSelect.addEventListener("change", filterReviewsGenre);
favoriteSort.addEventListener("click", filterReviewsFav);

// if 'User Review Form' has been completed and submit button clicked, call `createReview`
if (reviewForm) {
  reviewForm.addEventListener("submit", createReview);

  console.log("reviewForm event listener attached");
} else {
  console.log("Review form NOT found");
}

function createReview(e) {
  // Creates a new review object and adds the values from the form to it.

  e.preventDefault();

  console.log("createReview called");

  // get form values
  let reviewTitle = document.getElementById("movie-title");
  let reviewGenre = document.getElementById("movie-genre");
  let reviewRating = document.getElementById("movie-rating");
  let reviewText = document.getElementById("movie-text");

  // init `newReview` object
  let newReview;

  if (reviewTitle && reviewGenre && reviewRating && reviewText) {
    // create `newReview`
    newReview = {
      title: reviewTitle.value,
      genre: reviewGenre.value,
      rating: reviewRating.value,
      review: reviewText.value,
      uuid: uuidv4(),
    };
  } else {
    console.error("One or more review form elements not found:");
    if (!reviewTitle) console.error("reviewTitle not found");
    if (!reviewGenre) console.error("reviewGenre not found");
    if (!reviewRating) console.error("reviewRating not found");
    if (!reviewText) console.error("reviewText not found");
    return;
  }

  console.log("newReview Object created:", newReview);

  addNewReview(newReview);

  reviewForm.reset();
}

function addNewReview(reviewObject) {
  // Adding `newReview` as an object to the reviews array.

  console.log("addNewReview called with:", reviewObject);

  currentReviews.unshift(reviewObject);

  saveUserReviews(currentReviews);

  filterReviewsGenre(genreSelect.value, currentReviews); // Re-render the reviews
}

function filterReviewsGenre(genre = "all", reviews = currentReviews) {
  // Filters the `reviewList` by genre then re-renders the view.

  if (!genreSelect) {
    console.error("Genre select element not found!");
    return;
  }

  const selectedGenre = genre === "all" ? "all" : genreSelect.value;
  const reviewsToDisplay =
    selectedGenre === "all"
      ? reviews
      : reviews.filter((review) => review.genre === selectedGenre);

  renderReviews(reviewsToDisplay, reviewList, reviewStats);
  console.log("Filtered reviews by genre:", selectedGenre, reviewsToDisplay);
}

function filterReviewsFav() {
  // Filters the `reviewList` by liked reviews then re-renders the view.

  const favoritesToDisplay = currentReviews.filter((review) => review.isLiked);

  if (favoritesToDisplay.length === 0) {
    console.log("No reviews have been liked!");
    reviewList.innerHTML = "<p>Error: No reviews have been liked!</p>";
    return;
  }

  renderReviews(favoritesToDisplay, reviewList, reviewStats);
}

// Vite & JS logos
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

// UUID creation for my mock review data
// create 10 uuids for the existing mock data
// const uuids = [];
//
// for (let i = 0; i < 10; i++) {
//   uuids.push(uuidv4());
// }
// console.log(uuids);
