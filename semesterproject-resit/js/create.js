import displayMessage from "./components/displayMessage.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";

const token = getToken();

if (!token) {
    location.href = "/";
}

const form = document.querySelector('form');
const postTitle = document.querySelector('#post-title');
const excerpt = document.querySelector('#excerpt');
const content = document.querySelector('#content');
const message = document.querySelector('.message-container');

form.addEventListener('submit', submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = '';

    const titleValue = postTitle.value.trim();
    const excerptValue = excerpt.value.trim();
    const contentValue = content.value.trim();
    const status = 'publish';

    if (titleValue.length === 0 || excerptValue.length === 0 || contentValue.length === 0) {
        displayMessage('warning', 'Please enter content to all inputs to post.', '.message-container');
    }

    addPost(titleValue, excerptValue, contentValue, status);
}

async function addPost(title, excerpt, content, status) {
    const url = baseUrl + 'wp-json/wp/v2/posts';

    const data = JSON.stringify({ title: title, excerpt: excerpt, content: content, status: status });



    const options = {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        console.log(json);

        if (json.id) {
            displayMessage('success', 'Your post has successfully been created!', '.message-container');
            form.reset();
        };
    }
    catch (error) {
        console.log(error);
    }
}