const auth = config.api_key;
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const searchForm = document.querySelector('.search-form');
const downloadBtn = document.querySelectorAll('download-btn');
const more = document.querySelector('.more');
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

//Event Listeners
searchInput.addEventListener('input', updateInput);
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
});

gallery.addEventListener('click', (e) => {
    if (e.target.classList.contains("download-btn")) {
        downloadImage(e.target.href);
    }
});

more.addEventListener('click', loadMore);

//Functions
function updateInput(e) {
    searchValue = e.target.value;
}

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original} target="_blank" class="download-btn">Download</a>
        </div>
        <img src=${photo.src.large}></img>`;
        gallery.appendChild(galleryImg);
    });
}

async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

async function searchPhotos(query) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}

function toDataURL(url) {
    return fetch(url).then((response) => {
        return response.blob();
    }).then(blob => {
        return URL.createObjectURL(blob);
    });
}

async function downloadImage(url) {
    const a = document.createElement("a");
    a.href = await toDataURL(url);
    a.download = "photosorama_img.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

async function loadMore() {
    page++;
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }

    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

curatedPhotos();