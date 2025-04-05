
const storedUserInfo = localStorage.getItem("userInformation");
// if we have something in local storage, show that, otherwise store in local storage
if (storedUserInfo) {
    // console.log("yes");
    // console.log(JSON.parse(storedUserInfo));
    // const info = JSON.parse(storedUserInfo);
    // let firstName = info["firstName"];
    // let lastName = info.lastName;
    // let country = info.country;
    // let phone = info.phone;
    // let state = info.state;
    // let city = info.city;
    // let village = info.village;
    // console.log(firstName, lastName, country, phone, state, city, village);

    // document.getElementById("first-name").textContent = info.firstName;
    // document.getElementById("last-name").textContent = info.lastName;
    // document.getElementById("country").textContent = info.country;
    // document.getElementById("phone-number").textContent = info.phone;
    // document.getElementById("state").textContent = info.state;
    // document.getElementById("city").textContent = info.city;
    // document.getElementById("village").textContent = info.village;

    displayInfo();
}else{
    alert("Please enter the details");
    storeUserInfo();
    displayInfo();
}

// Function to store user information in local storage
function storeUserInfo() {
    let userInformation = {
        firstName: prompt("Enter your First Name:", ""),
        lastName: prompt("Enter your Last Name:", ""),
        country: prompt("Enter your Country:", ""),
        phone: prompt("Enter your Phone Number:", ""),
        state: prompt("Enter your State:", ""),
        city: prompt("Enter your City:", ""),
        village: prompt("Enter your Village:", "")
    };

    // Store in localStorage
    // console.log("Hello "+ JSON.stringify(userInformation));
    localStorage.setItem("userInformation", JSON.stringify(userInformation));
}

function displayInfo() {
    const info = JSON.parse(storedUserInfo);
    document.getElementById("first-name").textContent = info.firstName;
    document.getElementById("last-name").textContent = info.lastName;
    document.getElementById("country").textContent = info.country;
    document.getElementById("phone-number").textContent = info.phone;
    document.getElementById("state").textContent = info.state;
    document.getElementById("city").textContent = info.city;
    document.getElementById("village").textContent = info.village;
}