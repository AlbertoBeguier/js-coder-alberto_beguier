document.addEventListener("DOMContentLoaded", function () {
  const accessKey = "gBhv814GnhJXF672b0RJZcAWbL-xaDS5yHViutsbfss";
  const query = "acuarela";
  fetch(
    `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
      query
    )}&orientation=landscape&client_id=${accessKey}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      if (data && data.urls && data.urls.full) {
        document.body.style.backgroundImage = `url(${data.urls.full})`;
      } else {
        throw new Error("Invalid data structure");
      }
    })
    .catch(error => console.error("Error:", error));
});
