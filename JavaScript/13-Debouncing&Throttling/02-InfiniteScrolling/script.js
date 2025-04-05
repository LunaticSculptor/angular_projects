// const apikey = "_DDIVJSgdK-GI1wA3aHOtxC9YTt8tCY6-4jMk7guznY";
// const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

// function displayPhotos() {
// 	// Display images on UI
// }


// async function getPhotos() {
//     //fetch images from Unslaph API
	
// }

// window.addEventListener("scroll", () =>{
// 	// Triggers the getPhotos() function, if scroll is at the end
// });

// getPhotos()


const apiKey = "_DDIVJSgdK-GI1wA3aHOtxC9YTt8tCY6-4jMk7guznY";
const count = 10; // Number of images to fetch per request
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

const demoData = [
    {
      alt_description: "A very dark and cloudy sky over some mountains",
      urls: { regular: "https://images.unsplash.com/photo-1737894214298-feb9d237cf63?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D" }
    },
    {
      alt_description: "A field of blue flowers",
      urls: { regular: "https://plus.unsplash.com/premium_photo-1719930222484-86600f8c74da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D" }
    },
    {
      alt_description: "A bunch of flowers",
      urls: { regular: "https://plus.unsplash.com/premium_photo-1676117275133-56553ab7bd58?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI5fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D" }
    },
    {
      alt_description: "Waterfall seen from bottom of mountain",
      urls: { regular: "https://images.unsplash.com/photo-1720734020504-8b5557750735?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQyfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D" }
    },
    {
      alt_description: "Ariel view of body of water",
      urls: { regular: "https://images.unsplash.com/photo-1740166260070-4d129541aa52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU0fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D" }
    }
  ];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.style.display = "none"; // Hide loader once images are loaded
    }
}

// Display Photos in the DOM
function displayPhotos(photosArray) {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        const imgElement = document.createElement("img");
        imgElement.src = photo.urls.regular;
        imgElement.alt = photo.alt_description;
        imgElement.loading = "lazy"; // Lazy loading for better performance
        imgElement.classList.add("image");

        imgElement.addEventListener("load", imageLoaded);
        imgContainer.appendChild(imgElement);
    });
}

// Fetch Photos from Unsplash API
async function getPhotos() {
    try {
        loader.style.display = "block"; // Show loader when fetching images
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos(photosArray);
    } catch (error) {
        console.error("Error fetching images:", error);
        displayPhotos(demoData);
    }
}

// Infinite Scroll - Load more images when user scrolls near the bottom
window.addEventListener("scroll", () => {
    if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && ready
    ) {
        ready = false;
        getPhotos();
    }
});

// Load initial set of images
getPhotos();
