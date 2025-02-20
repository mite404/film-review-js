// grabbing reviews data & rendering the view

export function getReviewsFeedHTML(reviews) {
  console.log("getReviewsFeedHTML called");

  let reviewHTML = ``;

  reviews.forEach((review) => {

    const likeIconClass = review.isLiked ? 'liked' : ''

    reviewHTML += `
      <div class="film-item">
          <img src="${review.image}" alt="">
          <h4 class="">${review.title}</h4>
          <p><i>${review.genre}</i></p>
          <p class="rating">Rating: ${review.rating}/5 ✨</p>
          <i class="fa-solid fa-heart ${likeIconClass}" data-like="${review.uuid}"></i>
          <p class="review-text">${review.review}</p>
      </div>`;
  })
  return reviewHTML;
}

export function getReviewsStats(reviews) {
  const totalReviews = reviews.length;
  const totalReviewScores = reviews.reduce(
    (total, review) => total + parseInt(review.rating),
    0,
  );
  const averageReviewScore = Math.floor(
    totalReviews > 0 ? totalReviewScores / totalReviews : 0,
  );

  return `
    <div>
        <p>Total Reviews: ${totalReviews}</p>
        <p>Average Rating: ${averageReviewScore}✨</p>
    </div>`;
}

export function renderReviews(reviews, reviewList, reviewStats) {
  reviewStats.innerHTML = getReviewsStats(reviews);
  reviewList.innerHTML = getReviewsFeedHTML(reviews);
  console.log("Reviews array after render:", reviews);
}
