const accesskey = "U_-YwcqGWDnCHSyA0Pm0Ym_lywTFJCB-qYBOWXXOfNE";
const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const imagesContainer = document.querySelector(".images-container");
const loadMoreBtn = document.querySelector(".loadMoreBtn");

let page = 1;
//fucntion to fecth images using unsplash API

const fetchImages = async (query, pageNo) => {
  try {
    if (pageNo === 1) {
      imagesContainer.innerHTML = "";
    }
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accesskey}`;

    const response = await fetch(url); // for feteching image
    const data = await response.json(); // converting data into json file

    console.log(data);

    if (data.results.length > 0) {
      data.results.forEach((photo) => {
        //creating imagediv
        const imageElement = document.createElement("div");
        imageElement.classList.add("imageDiv");
        imageElement.innerHTML = `<img src="${photo.urls.regular}" />`;

        //creating overlay
        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");

        //creating overlay text
        const overlayText = document.createElement("h3");
        overlayText.innerHTML = `${photo.alt_description}`;

        overlayElement.appendChild(overlayText);

        imageElement.appendChild(overlayElement);

        imagesContainer.appendChild(imageElement);
      });

      if (data.total_pages === pageNo) {
        loadMoreBtn.style.display = "none";
      } else {
        loadMoreBtn.style.display = "block";
      }
    } else {
      imagesContainer.innerHTML = `<h2>NO IMAGE FOUND.</H2>`;
      if (loadMoreBtn.style.display === "block") {
        loadMoreBtn.style.display = "none";
      }
    }
  } catch (error) {
    imagesContainer.innerHTML = `<h2>Failed to fetch images please try agian later</h2>`;
  }
};

//aadding event listener to search form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = searchInput.value.trim();
  if (inputText !== "") {
    page = 1;
    fetchImages(inputText, page);
  } else {
    imagesContainer.innerHTML = `<h2>Please enter a query</h2>`;
    if (loadMoreBtn.style.display === "block") {
      loadMoreBtn.style.display = "none";
    }
  }
});

//aadding event listener to load more images

loadMoreBtn.addEventListener("click", () => {
  fetchImages(searchInput.value.trim(), ++page);
});
