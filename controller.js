// Initialize an empty array for jsonData
let jsonData = [];
let jsonBossData = [];
let jsonWeeklyBossData = [];
let timeRandom = 1000;
let randomEffect;

// Add event listener to the button
var generateButton;
var btnBoss;
var btnWeeklyBoss;

// Function to fetch JSON data from tableJson.json
function fetchJsonData() {
  fetch("tableCharJson.json")
    .then((response) => response.json())
    .then((data) => {
      jsonData = data;
    })
    .catch((error) => console.error("Error fetching JSON data:", error));
  // boss
  fetch("tableBossJson.json")
    .then((response) => response.json())
    .then((data) => {
      jsonBossData = data;
    })
    .catch((error) => console.error("Error fetching JSON data:", error));
	// weekly boss
	fetch("tableWeeklyBossJson.json")
	  .then((response) => response.json())
	  .then((data) => {
		jsonWeeklyBossData = data;
	  })
	  .catch((error) => console.error("Error fetching JSON data:", error));

  //listener
  generateButton = document.getElementById("generateButton");
  generateButton.addEventListener("click", updateRandomData);
  btnBoss = document.getElementById("randomBossButton");
  btnBoss.addEventListener("click", onClickButtonRandomBoss);
  btnWeeklyBoss = document.getElementById("randomWeeklyBossButton");
  btnWeeklyBoss.addEventListener("click", onClickButtonRandomWeeklyBoss);
}

// Call the function to fetch JSON data
fetchJsonData();

// Function to generate a random index
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

// Function to animate an element with a fade-in effect
function animateFadeIn(element) {
  element.style.opacity = 0; // Start with 0 opacity

  // Trigger the animation by adding a CSS class
  element.classList.add("fade-in");

  // Remove the CSS class and set opacity to 1 after a delay to reset the animation
  setTimeout(() => {
    element.style.opacity = 1; // Set opacity to 1
    element.classList.remove("fade-in");
  }, timeRandom);
}

// Function to update the random data with animation
function updateRandomData() {
  if (jsonData.length === 0) {
    console.error("JSON data is empty. Make sure to fetch it first.");
    return;
  }

  generateButton.disabled = true;
  setTimeout(() => {
    generateButton.disabled = false;
  }, timeRandom);

  randomEffect = setInterval(changeRandomImage, 10);

  setTimeout(() => {
    clearInterval(randomEffect);
    data = changeRandomImage();
    addCharacterToTable(data);
  }, timeRandom);

  const randomImageElement = document.getElementById("randomImage");
  const randomNameElement = document.getElementById("randomName");

  animateFadeIn(randomImageElement);
  animateFadeIn(randomNameElement);
}

function changeRandomImage() {
  const randomIndex = getRandomIndex(jsonData.length);
  const randomItem = jsonData[randomIndex];

  const randomImageElement = document.getElementById("randomImage");
  const randomNameElement = document.getElementById("randomName");
  const docIconElement = document.getElementById("icon_element");
  const docNameElement = document.getElementById("name_element");
  const docIconWeapon = document.getElementById("icon_weapon");
  const docNameWeapon = document.getElementById("name_weapon");
  const docIconStar = document.getElementById("icon_star");

  randomImageElement.src = randomItem.src; // Set the image source
  randomNameElement.textContent = randomItem.name; // Set the text content

  docIconElement.src = randomItem.ngtoUrl;
  docNameElement.textContent = randomItem.element;
  docIconWeapon.src = randomItem.weaponUrl;
  docNameWeapon.textContent = randomItem.weapon;
  docIconStar.src = randomItem.starUrl;

  return randomItem;
}

function addCharacterToTable(data) {
  const tableBody = document.querySelector("#characterTable tbody");

  const row = tableBody.insertRow(0);
  const iconCell = row.insertCell(0);
  const nameCell = row.insertCell(1);
  const starCell = row.insertCell(2);
  const elementCell = row.insertCell(3);
  const weaponCell = row.insertCell(4);

  iconCell.innerHTML = `<img src="${data.src}" alt="Character Icon" width="50" height="50">`;
  nameCell.textContent = data.name;
  starCell.textContent = data.star;
  elementCell.textContent = data.element;
  weaponCell.textContent = data.weapon;
}

function onClickButtonRandomBoss() {
  if (jsonBossData.length === 0) {
    console.error("JSON data is empty. Make sure to fetch it first.");
    return;
  }

  randomBossButton.disabled = true;
  setTimeout(() => {
    randomBossButton.disabled = false;
  }, timeRandom);

  let ranEff = setInterval(changeRandomBossImage, 10);

  setTimeout(() => {
    clearInterval(ranEff);
    data = changeRandomBossImage();
    addBossToTable(data);
  }, timeRandom);

  const randomImageElement = document.getElementById("randomBossImage");
  const randomNameElement = document.getElementById("randomBossName");

  animateFadeIn(randomImageElement);
  animateFadeIn(randomNameElement);
}

function changeRandomBossImage() {
  const randomIndex = getRandomIndex(jsonBossData.length);
  const randomItem = jsonBossData[randomIndex];

  const randomImageElement = document.getElementById("randomBossImage");
  const randomNameElement = document.getElementById("randomBossName");

  randomImageElement.src = randomItem.src; // Set the image source
  randomNameElement.textContent = randomItem.name; // Set the text content

  return randomItem;
}

function addBossToTable(data) {
  const tableBody = document.querySelector("#bossTable tbody");

  const row = tableBody.insertRow(0);
  const iconCell = row.insertCell(0);
  const nameCell = row.insertCell(1);

  iconCell.innerHTML = `<img src="${data.src}" alt="Boss Icon" width="50" height="50">`;
  nameCell.textContent = data.name;
}


function onClickButtonRandomWeeklyBoss() {
	if (jsonBossData.length === 0) {
	  console.error("JSON data is empty. Make sure to fetch it first.");
	  return;
	}
  
	randomBossButton.disabled = true;
	setTimeout(() => {
	  randomBossButton.disabled = false;
	}, timeRandom);
  
	let ranEff = setInterval(changeRandomWeeklyBossImage, 10);
  
	setTimeout(() => {
	  clearInterval(ranEff);
	  data = changeRandomWeeklyBossImage();
	  addBossToTable(data);
	}, timeRandom);
  
	const randomImageElement = document.getElementById("randomBossImage");
	const randomNameElement = document.getElementById("randomBossName");
  
	animateFadeIn(randomImageElement);
	animateFadeIn(randomNameElement);
  }

  function changeRandomWeeklyBossImage() {
	const randomIndex = getRandomIndex(jsonWeeklyBossData.length);
	const randomItem = jsonWeeklyBossData[randomIndex];
  
	const randomImageElement = document.getElementById("randomBossImage");
	const randomNameElement = document.getElementById("randomBossName");
  
	randomImageElement.src = randomItem.src; // Set the image source
	randomNameElement.textContent = randomItem.name; // Set the text content
  
	return randomItem;
  }