export function populateGenreList(elementIds) {
  const genres = [
    {value: "all", text: "All Genres"},
    {value: "Action", text: "Action"},
    {value: "Comedy", text: "Comedy"},
    {value: "Drama", text: "Drama"},
    {value: "Sci-Fi", text: "Sci-Fi"},
    {value: "Thriller", text: "Thriller"},
    {value: "Horror", text: "Horror"},
  ]

  elementIds.forEach(id => {
    const selectElement = document.getElementById(id);

    if (selectElement) {
      genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre.value;
        option.textContent = genre.text;
        selectElement.appendChild(option);
      });
    } else {
      console.error(`Element with ID ${id} not found!`);
    }
  });
}