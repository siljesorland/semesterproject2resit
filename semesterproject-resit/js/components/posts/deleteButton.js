import { baseUrl } from "../../settings/api.js";
import { getToken } from "../../utils/storage.js";


const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
if (!id) {
    document.location.href = "/";
}


export default function deleteButton(id) {
    const container = document.querySelector(".delete-container");

    container.innerHTML = `<button type="button" class="delete">Delete</button>`;

    const button = document.querySelector("button.delete");

    button.onclick = async function () {
        console.log(id);

        const doDelete = confirm("Are you sure you want to delete this?");
        console.log(doDelete);

        if (doDelete) {
            const url = baseUrl + "wp-json/wp/v2/posts/" + id;

            const token = getToken();

            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await fetch(url, options);
                const json = await response.json();

                location.href = "/loggedin.html";

                console.log(json);
            } catch (error) {
                console.log(error);
            }
        }
    };
}