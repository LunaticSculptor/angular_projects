const autoSearch = e => {
    console.log("Autosearch called ")
    displaySearchResults(e.target.value);
}

const displaySearchResults = (searchQuery = "") => {

    console.log("Display results called through: "+ searchQuery);

    const filtered = emojiList.filter(e => {
        return e.name.toLowerCase().includes(searchQuery.toLowerCase())
    });

    console.log(filtered);
    const parent = document.getElementById("search_result_container");
    parent.innerHTML = "";
    
    if (filtered.length === 0) {
        parent.innerHTML = "<tr><td>No results found</td></tr>";
        return;
    }
    // Display the data here
    filtered.forEach(e => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${e.emoji}</td><td>${e.name}</td>`;
        parent.appendChild(row);
    });
   
}

document.getElementById("search_field").addEventListener("keyup", autoSearch);
window.onload = () => displaySearchResults();
