const API_KEY = "e94faa5f";
const BASE_URL = "https://www.omdbapi.com/";
const page = 1;

// Waits for a specified delay before executing
const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

// Ensures execution only once within a given timeframe
const throttle = (func, limit) => {
    let lastCall = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            func(...args);
        }
    };
};

const autoSearch = debounce(async (e) => {
    console.log("AutoSearch called for:", e.target.value);
    displaySearchResults(e.target.value);
}, 300);

const displaySearchResults = throttle(async (searchQuery = "") => {
    console.log("Fetching results for:", searchQuery);
    
    const movieList = await getMovieList(searchQuery);

    if (!movieList || movieList.Response === "False") {
        console.log("No results found:", movieList?.Error);
        document.getElementById("search_result_container").innerHTML = "<p>No results found</p>";
        return;
    }

    console.log("Results:", movieList.Search);

    const parent = document.getElementById("search_result_container");
    parent.innerHTML = ""; // Clear previous results

    movieList.Search.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "no-image.png"}" alt="${movie.Title}" class="movie-poster">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
                <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">View on IMDb</a>
            </div>
        `;

        parent.appendChild(movieCard);
    });
}, 500);

// Fetch movies from API
async function getMovieList(searchQuery = "") {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${searchQuery}&page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// Attach event listener for search field with debounced function
document.getElementById("search_field").addEventListener("keyup", autoSearch);

// Initial empty search results on load
window.onload = () => displaySearchResults();



// // const API_KEY = 'e94faa5f'; 
// // const BASE_URL = 'https://www.omdbapi.com/';
// // const page=0;
// // // fetch(`${BASE_URL}?&apikey=${API_KEY}&s=${searchQuery}&page=${page}`)

// // const autoSearch = e => {
// //     console.log("Autosearch called ")
// //     displaySearchResults(e.target.value);
// // }

// // const displaySearchResults = (searchQuery = "") => {

// //     console.log("Display results called through: "+ searchQuery);
// //     // const movieList = fetch(`${BASE_URL}?&apikey=${API_KEY}&s=${searchQuery}&page=${page}`)
    
// //     // const filtered = movieList.filter(e => {
// //     //     return e.name.toLowerCase().includes(searchQuery.toLowerCase())
// //     // });
// //     const filtered = getMovieList(searchQuery);

// //     console.log(filtered);
// //     // const filtered = movieList;
// //     // const parent = document.getElementById("search_result_container");
// //     // parent.innerHTML = "";
    
// //     // if (filtered.length === 0) {
// //     //     parent.innerHTML = "<tr><td>No results found</td></tr>";
// //     //     return;
// //     // }
// //     // // Display the data here
// //     // filtered.forEach(e => {
// //     //     const row = document.createElement("tr");
// //     //     row.innerHTML = `<td>${e}</td>`;
// //     //     parent.appendChild(row);
// //     // });
   
// // }

// // async function getMovieList(searchQuery = "") {
// //     try {
// //         const response = await fetch(`${BASE_URL}?&apikey=${API_KEY}&s=${searchQuery}&page=${page}`);
// //         const data = await response.json();
// //         return data;
// //     } catch {
// //         console.error("Some Error Occured");
// //     }
// // }
// // document.getElementById("search_field").addEventListener("keyup", autoSearch);
// // window.onload = () => displaySearchResults();



// const API_KEY = "e94faa5f";
// const BASE_URL = "https://www.omdbapi.com/";
// const page = 1; // Ensure page starts from 1

// const autoSearch = async (e) => {
//     console.log("AutoSearch called for:", e.target.value);
//     await displaySearchResults(e.target.value);
// };

// const displaySearchResults = async (searchQuery = "") => {
//     console.log("Fetching results for:", searchQuery);
    
//     const movieList = await getMovieList(searchQuery);

//     if (!movieList || movieList.Response === "False") {
//         console.log("No results found:", movieList?.Error);
//         document.getElementById("search_result_container").innerHTML = "<p>No results found</p>";
//         return;
//     }

//     console.log("Results:", movieList.Search);

//     const parent = document.getElementById("search_result_container");
//     parent.innerHTML = ""; // Clear previous results

//     movieList.Search.forEach(movie => {
//         const movieCard = document.createElement("div");
//         movieCard.classList.add("movie-card");

//         movieCard.innerHTML = `
//             <img src="${movie.Poster !== "N/A" ? movie.Poster : "no-image.png"}" alt="${movie.Title}" class="movie-poster">
//             <div class="movie-info">
//                 <h3>${movie.Title}</h3>
//                 <p>Year: ${movie.Year}</p>
//                 <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">View on IMDb</a>
//             </div>
//         `;

//         parent.appendChild(movieCard);
//     });
// };

// // Fetch movies from API
// async function getMovieList(searchQuery = "") {
//     try {
//         const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${searchQuery}&page=${page}`);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error fetching movies:", error);
//     }
// }

// // Attach event listener for search field
// document.getElementById("search_field").addEventListener("keyup", autoSearch);

// // Initial empty search results on load
// window.onload = () => displaySearchResults();
