document.querySelector("form").addEventListener("submit", (e)=> {
    e.preventDefault();
    
    addPlayer();

    sortScoreBoard();
    activateBtnEventListener();
});

function addPlayer() {
    // Take the user information.
    // console.log(document.getElementsByClassName("main_form")[0][0].value)
    let firstName = document.getElementsByClassName("main_form")[0][0].value;
    let lastName = document.getElementsByClassName("main_form")[0][1].value;
    let country = document.getElementsByClassName("main_form")[0][2].value;
    let score = document.getElementsByClassName("main_form")[0][3].value;
    console.log("firstName: "+firstName+", lastName: "+lastName+", country: "+country+", score: "+score)
    // Update the data on UI as well
    let wrapper = document.querySelector(".main_scoreboard-wrapper");

    let scoreboard = document.createElement("div");
    scoreboard.classList.add("main_scoreboard");
    // Player details container
    let playerDetails = document.createElement("div");    
    let playerName = document.createElement("p");
    playerName.classList.add("main_player-name");
    playerName.textContent = firstName+" "+lastName;
    let timeStamp = document.createElement("p");
    timeStamp.classList.add("main_time-stamp");
    timeStamp.textContent = generateDateAndTime();
    playerDetails.appendChild(playerName);
    playerDetails.appendChild(timeStamp);
    // Player Country
    let playerCountry = document.createElement("p");
    playerCountry.classList.add("main_player-country");
    playerCountry.textContent = country;
    // Player Score
    let playerScore = document.createElement("p");
    playerScore.classList.add("main_player-score");
    playerScore.textContent = score;
    // Delete, modify button container
    let btnContainer = document.createElement("div");
    btnContainer.classList.add("main_scoreboard-btn-container");
    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&#x1f5d1;";
    // +5 button
    let addFivebtn = document.createElement("button");
    addFivebtn.textContent = "+5";
    // -5 button
    let subFivebtn = document.createElement("button");
    subFivebtn.textContent = "-5";
    btnContainer.appendChild(deleteBtn);
    btnContainer.appendChild(addFivebtn);
    btnContainer.appendChild(subFivebtn);

    scoreboard.appendChild(playerDetails);
    scoreboard.appendChild(playerCountry);
    scoreboard.appendChild(playerScore);
    scoreboard.appendChild(btnContainer);
    wrapper.appendChild(scoreboard);

    activateBtnEventListener(); 
}

function activateBtnEventListener() {
    let scoreboards = document.getElementsByClassName("main_scoreboard");

    Array.from(scoreboards).forEach(scoreboard => {
        let buttons = scoreboard.querySelectorAll("button");
        let playerScore = scoreboard.querySelector(".main_player-score");

        buttons[0].addEventListener("click", function () {
            scoreboard.remove();
        });

        buttons[1].addEventListener("click", function () {
            playerScore.textContent = parseInt(playerScore.textContent) + 5;
        });

        buttons[2].addEventListener("click", function () {
            playerScore.textContent = parseInt(playerScore.textContent) - 5;
        });
    });
}

function sortScoreBoard() {
    // Sort the data
    let wrapper = document.querySelector(".main_scoreboard-wrapper");
    let scoreboards = Array.from(wrapper.getElementsByClassName("main_scoreboard"));

    // Sort based on the score (descending order)
    scoreboards.sort((a, b) => {
        let scoreA = parseInt(a.querySelector(".main_player-score").textContent);
        let scoreB = parseInt(b.querySelector(".main_player-score").textContent);
        return scoreB - scoreA;
    });

    // Re-append sorted elements to the wrapper
    wrapper.innerHTML = "";
    scoreboards.forEach(scoreboard => wrapper.appendChild(scoreboard));
        
}

function generateDateAndTime() {
    // Generate Date and Time
    let now = new Date();
    let month = now.toLocaleString('default', { month: 'short' }); // Get short month name (e.g., Mar)
    let year = now.getFullYear(); // Get full year (e.g., 2025)
    let hours = String(now.getHours()).padStart(2, '0'); // Ensure 2-digit format
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${month} ${year}: ${hours}:${minutes}:${seconds}`;
}
