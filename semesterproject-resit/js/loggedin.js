import { baseUrl } from "./settings/api.js";
import logoutButton from "./components/logoutButton.js";

logoutButton();

const postsUrl = baseUrl + "wp-json/wp/v2/posts?per_page=20";


(async function () {
    const container = document.querySelector(".post-container");

    try {
        const response = await fetch(postsUrl);
        const json = await response.json();

        console.log(json);
        container.innerHTML = "";
        json.forEach(function (post) {
            container.innerHTML += `
            <img src="./images/logo.png" alt="Logo" width="30" height="30"
            class="d-inline-block align-text-top"><h4>${post.title.rendered}</h4>
            <p>${post.excerpt.rendered}</p>
            <p>${post.content.rendered}</p>
            <a href="edit.html?id=${post.id}"><p>Read more and update post<i class="bi bi-arrow-right"></i></p></a>`;
        });

    }
    catch (error) {
        console.log(error);
    }
})();
