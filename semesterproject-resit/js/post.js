import { baseUrl } from "./settings/api.js";

const detailContainer = document.querySelector(".post-container");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

const url = baseUrl + "wp-json/wp/v2/posts/" + id;

console.log(url);

async function fetchPost() {

    try {
        const response = await fetch(url);
        const details = await response.json();

        console.log(details);

        createHtml(details);
    }

    catch (error) {
        console.log(error);
    }

}

fetchPost();

function createHtml(details) {
    detailContainer.innerHTML = `<h1>${details.title.rendered}</h1>
    <p>${details.content.rendered}</p>`
}