let offset = 0;
let input = "";

// 1. Grab the input value and trigger search on button click or enter key
document.querySelector(".js-go").addEventListener('click', function() {
    input = document.querySelector("input").value;
    offset = 0; // Reset the offset for new search
    clearContainer(); // Clear the previous GIFs
    searchGiphy(input);
});

document.querySelector(".js-userinput").addEventListener('keyup', function(e) {
    input = document.querySelector("input").value;

    // if the key ENTER is pressed...
    if (e.which === 13) {
        offset = 0; // Reset the offset for new search
        clearContainer(); // Clear the previous GIFs
        searchGiphy(input);
    }
});

// 2. Do the data stuff with the API
function searchGiphy(input) {
    var url = "https://api.giphy.com/v1/gifs/search?q=" + encodeURIComponent(input) + "&api_key=AicHRppAF00JFJzWdvLbMcqvnxkrOiC0&limit=10&offset=" + offset;

    // AJAX Request
    var GiphyAJAXCall = new XMLHttpRequest();
    GiphyAJAXCall.open('GET', url);
    GiphyAJAXCall.send();

    GiphyAJAXCall.addEventListener('load', function(e) {
        var data = e.target.response;
        pushToDOM(data);
        offset += 10; // Increase the offset for the next set of GIFs
    });
}

// 3. Show me the GIFs
function pushToDOM(input) {
    var response = JSON.parse(input);

    // Check if there are any results
    if (response.data.length > 0) {
        var container = document.querySelector(".js-container");

        response.data.forEach(function(gif) {
            var imageURL = gif.images.fixed_height.url;
            var img = document.createElement("img");
            img.src = imageURL;
            container.appendChild(img);
        });
    } else {
        var container = document.querySelector(".js-container");
        container.innerHTML = "<p>No GIFs found for \"" + document.querySelector("input").value + "\"</p>";
    }
}

// 4. Clear previous GIFs
function clearContainer() {
    var container = document.querySelector(".js-container");
    container.innerHTML = "";
}

// 5. Detect when user scrolls to the bottom of the page
window.addEventListener('scroll', function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        searchGiphy(input); // Load more GIFs when the user reaches the bottom
    }
});
