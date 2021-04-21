const auth = config.api_key;
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const searchForm = document.querySelector('.search-form');
let searchValue;

//Event Listeners
searchInput.addEventListener('input', updateInput);
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchPhotos(searchValue);
});

//Functions
function updateInput(e) {
    searchValue = e.target.value;
}

async function curatedPhotos() {
    const dataFetch = await fetch("https://api.pexels.com/v1/curated?per_page=15&page=1", {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>`;
        gallery.appendChild(galleryImg);
    });
}

async function searchPhotos(query) {
    const dataFetch = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>`;
        gallery.appendChild(galleryImg);
    });
}

curatedPhotos();