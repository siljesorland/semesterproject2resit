import { authUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";


const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");



form.addEventListener('submit', submitForm);

function submitForm(event) {
    event.preventDefault();

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue.length === 0 || passwordValue.length === 0) {
        return displayMessage("warning", "Invalid values", ".message-container");
    }

    doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
    const url = authUrl;

    const data = JSON.stringify({ username: username, password: password });

    const options = {
        method: 'POST',
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.user_display_name) {

            console.log(json.user_display_name);

            saveToken(json.token);
            saveUser(json.user_display_name);

            location.href = "/loggedin.html";
        }

        if (json.code) {
            displayMessage("warning", "Invalid login details", ".message-container");
        }

        console.log(json);
    } catch (error) {
        console.log(error);
    }
}
