// Initialize an empty array for jsonData
let jsonData = [];

// Function to fetch JSON data from tableJson.json
function fetchJsonData() {
    fetch('tableJson.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            updateRandomData();
        })
        .catch(error => console.error('Error fetching JSON data:', error));
}

// Call the function to fetch JSON data
fetchJsonData();

// Function to generate a random index
function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

// Function to update the random data with animation
function updateRandomData() {
    if (jsonData.length === 0) {
        console.error('JSON data is empty. Make sure to fetch it first.');
        return;
    }

    // Disable the button for 1 second
    generateButton.disabled = true;
    setTimeout(() => {
        generateButton.disabled = false;
    }, 1000);

    // Get a random item from the JSON data
    const randomIndex = getRandomIndex(jsonData.length);
    const randomItem = jsonData[randomIndex];

    // Create a fade-in effect for the random image
    const randomImageElement = document.getElementById("randomImage");
    randomImageElement.style.opacity = 0; // Start with 0 opacity
    randomImageElement.src = randomItem.src;

    // Create a fade-in effect for the random name
    const randomNameElement = document.getElementById("randomName");
    randomNameElement.style.opacity = 0; // Start with 0 opacity
    randomNameElement.textContent = randomItem.name;

    // Trigger the animation by adding a CSS class
    randomImageElement.classList.add("fade-in");
    randomNameElement.classList.add("fade-in");

    // Remove the CSS class after a delay to reset the animation
    setTimeout(() => {
        randomImageElement.style.opacity = 1; // Set opacity to 1
        randomNameElement.style.opacity = 1; // Set opacity to 1
        randomImageElement.classList.remove("fade-in");
        randomNameElement.classList.remove("fade-in");
    }, 1000);
}

// Add event listener to the button
const generateButton = document.getElementById("generateButton");
generateButton.addEventListener("click", updateRandomData);
