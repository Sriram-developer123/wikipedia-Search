let searchInputEl = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function creatAndAppendSearchResult(result) {
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResults.appendChild(resultItemEl);

    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = result.title;
    resultTitleEl.href = result.link;
    resultTitleEl.target = "_blank";
    resultItemEl.appendChild(resultTitleEl)

    let titleBreak = document.createElement("br");
    resultItemEl.appendChild(titleBreak)

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = result.link
    urlEl.textContent = result.link;
    urlEl.target = "_blank";
    resultItemEl.appendChild(urlEl)

    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = result.description;
    resultItemEl.appendChild(descriptionEl)
}

function displayResults(search_results) {
    spinnerEl.classList.add("d-none");
    for (let result of search_results) {
        creatAndAppendSearchResult(result);
    }
}

function searchUserInput(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResults.textContent = "";
        let options = {
            method: "GET"
        };
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputEl.value;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                displayResults(jsonData.search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchUserInput);