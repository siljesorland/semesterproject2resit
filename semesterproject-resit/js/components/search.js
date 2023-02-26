
export function searchArticles(articles) {

    const searchBar = document.querySelector('.search');

    searchBar.onkeyup = function (event) {

        const searchValue = event.target.value.trim().toLowerCase();

        const filteredArticles = articles.filter(function (article) {
            if (article.title.rendered.toLowerCase().startsWith(searchValue)) {
                return true;
            }
        });

        getArticles(filteredArticles);
    }
}