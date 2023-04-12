// A $( document ).ready() block.
$(document).ready(function () {
  console.log("ready!");

  let userInput = document.querySelector(`#location-input`);
  let cityName = document.querySelector(`#cityName`);
  let iconEl = document.querySelector(`#icon`);
  let tempEl = document.querySelector(`.temp`);
  let hourEl = document.querySelector(`.hour`);
  let locationContainer = document.querySelector(`#location-container`);
  let mainContainer = document.querySelector(`#main-container`);
  let startContainer = document.querySelector(`#start-container`);

  //  Arrays for Yelp Search categories
  let outdoorDates = ["parks", "tours", "active"];
  let foodDates = ["restaurants", "gourmet", "tastingclasses"];
  let lightHeartDates = [
    "artsandcrafts",
    "petstores",
    "media",
    "movietheaters",
  ];
  let artsDates = ["museums", "arts", "photographers"];
  let nightLifeDates = ["bars", "nightlife"];

  // check local storage for stored items
  const storedDates = JSON.parse(localStorage.getItem("favorites")) || [];

  // Fetch data from Yelp Fusion
  async function getJSONData() {
    const response = await fetch(
      `https://floating-headland-95050.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${userCity}&radius=20000&categories=arts&sort_by=best_match&limit=10`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer 6qR4_DRix9tgxR-wMhc5CZxksBaAi7-kad8A147whk73CqEO0g_2KhKnIyk8PkGGMuZAQIBF3VNetKKXTuqg1g0B-2dDLnu9FPV8-IA-j7W5fhsh5Jm_6-i-1S80ZHYx",
        },
      }
    );
    const jsonData = await response.json();
    console.log(jsonData);
  }

  // Fetch data from Open Weather API
  $(`#searchBtn`).click(function (event) {
    startContainer.classList.add(`hidden`);
    mainContainer.classList.add(`hidden`);
    locationContainer.classList.remove(`hidden`);

    event.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${userInput.value}&appid=a7a1b26928245e448876bae028d3ffe6&cnt=2&units=imperial`)
      .then((response) => response.json())
      .then(data => {
        console.log(data)
        const { temp } = data.list[0].main
        const location = data.city.name
        const { icon } = data.weather[0]

        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

        iconEl.src = iconUrl;
        cityName.innerText = `${location}`
        tempEl.innerText = `Temperature: ` + temp + ` °F`

        for (let i = 0; i < data.length; i++) {
          let currDay = data.list[i];
          const Url = `https://openweathermap.org/img/wn/${currDay.weather[0].icon}@2x.png`
          console.log(temp);
          document.querySelector(`#icon-${i}`).src = Url
          document.querySelector(`.temp-${i}`).innerText = `Temperature: ` + currDay.temp + ` °F`
      }
    })

  });

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    // $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // Click event for Welcome button to hide first welcome card
  document.querySelector("#start-btn").addEventListener("click", function (e) {
    e.stopPropagation();
    const startCard = document.querySelector("#start-card");
    const bgColor = document.querySelector("#overlay");
    startCard.setAttribute("style", "display: none;");
    bgColor.setAttribute("style", "background-color: #452C34;");
    locationCard();
  });

  // Click event for choosing an outdoor date
  document.querySelector("#click-outdoor").addEventListener("click", function (e) {
    e.stopPropagation();
    clearMainC()
    outdoorCard();
  });

  // Click event for choosing an indoor date
  document.querySelector("#click-indoor").addEventListener("click", function (e) {
    e.stopPropagation();
    clearMainC();
    indoorCard();
  });

  // Click event for choosing Relaxing Outdoor date
  document.querySelector("#click-relax").addEventListener("click", function (e) {
    e.stopPropagation();
    clearMainC();
    // Call modal with result
  });

  // Click event for choosing Adventure Outdoor date
  document.querySelector("#click-adven").addEventListener("click", function (e) {
    e.stopPropagation();
    clearMainC();
    // Call modal with result
  });

  // Click event for choosing lightheart Indoor date
  document.querySelector("#click-lightheart").addEventListener("click", function (e) {
    e.stopPropagation();
    clearMainC();
    // Call modal with result
  });

  // Click event for choosing Romantic Indoor date
  document.querySelector("#click-roman").addEventListener("click", function (e) {
    e.stopPropagation();
    clearMainC();
    // Call modal with result
  });

  // Show main container to ask user location
  function locationCard() {
    const locationCardCont = document.querySelector("#main-container");
    locationCardCont.classList.remove("hidden");
  }

  function clearMainC() {
    document.querySelector("#main-card").innerHTML = ``;
  }

  function outdoorCard() {
    document.querySelector("#main-card").innerHTML = `<div class="card-content">
    <div class="content">
      <h1 class="txt-dbrown">For your outdoors date, would you like to<br> stay relaxed or go on an adventure? </h1>
      <div>
        <button id="click-relax" class="button is-warning is-light" data-outdoor="relaxed">Relaxed</button>
        <button id="click-adven" class="button is-warning is-light" data-outdoor="adventure">Adventure</button>
      </div>
    </div>
  </div>`;
  }

  function indoorCard() {
    document.querySelector("#main-card").innerHTML = `<div class="card-content">
    <div class="content">
      <h1 class="txt-dbrown">For your outdoors date, would you like to<br> stay relaxed or go on an adventure? </h1>
      <div>
        <button id="click-light" class="button is-warning is-light" data-indoor="lightheart">Light Hearted</button>
        <button id="click-roman" class="button is-warning is-light" data-indoor="romantic">Romantic</button>
      </div>
    </div>
  </div>`;
  }
});

