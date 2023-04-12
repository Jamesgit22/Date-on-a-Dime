// A $( document ).ready() block.
const now = dayjs();
$(document).ready(function () {
  console.log("ready!");

  let userInput = document.querySelector(`#location-input`);
  let locationContainer = document.querySelector(`#location-container`);
  let mainContainer = document.querySelector(`#main-container`);
  let startContainer = document.querySelector(`#start-container`);
  let dateData;
  let dateType;

  //  Arrays for Yelp Search categories
  let adventureDates = ["escapegames", "tours", "active", "festivals"];
  let relaxedDates = ["parks", "tours"];
  let lightHeartDates = [
    "artsandcrafts",
    "petstores",
    "media",
    "movietheaters",
    "museums",
    "arts",
  ];
  let romanticDates = [
    "restaurants",
    "gourmet",
    "photographers",
    "tastingclasses",
  ];

  // check local storage for stored items
  const storedDates = JSON.parse(localStorage.getItem("favorites")) || [];

  // Fetch data from Yelp Fusion
  async function getYelpData(city, type) {
    city = cityName;
    type = dateType;

    const response = await fetch(
      `https://floating-headland-95050.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${city}&radius=20000&categories=${type}&sort_by=best_match&limit=10`,
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

  // Click event for Welcome button to hide first welcome card
  document.querySelector("#start-btn").addEventListener("click", function (e) {
    e.stopPropagation();
    const startCard = document.querySelector("#start-card");
    const bgColor = document.querySelector("#overlay");
    startCard.setAttribute("style", "display: none;");
    bgColor.setAttribute("style", "background-color: #452C34;");

    locationCard();
  });

  //Click event for clicking search button after inputting city
  $(`#searchBtn`).click(function (e) {
    e.stopPropagation();
    weatherCardFunc();
  });

  // Show main container to ask user location
  function locationCard() {
    let mainCont = document.querySelector(`#main-container`);
    mainCont.classList.remove(`hidden`);
  }

  function weatherCardFunc() {
    clearMainC();
    document.querySelector(
      "#main-card"
    ).innerHTML = ` <div class="card-content">
    <div class="weatherDataContainer">
      <h2 id="cityName">Today's Forecast</h2>
      <div class="row hourBlock">
      <div>
        <br>
        <img src="" alt="" id="icon">
        <p class="hour">Hour</p>
        <p class="temp">Temp</p>
      </div>
      <div>
        <img src="" alt="" id="icon-1">
        <p class="hour-1">Hour</p>
        <p class="temp-1">Temp</p>
      </div>
      <div>
        <img src="" alt="" id="icon-2">
        <p class="hour-2">Hour</p>
        <p class="temp-2">Temp</p>
      </div>
      </div>
      <button id="outdoorBtn" class="button is-warning is-light">Outdoor</button>
      <button id="supriseBtn" class="button is-warning is-light">Suprise Me!</button>
      <button id="indoorBtn" class="button is-warning is-light">Indoor</button>
    </div>
  </div>`;
    weatherFetch();

    // Click event for choosing an outdoor date
    $("#outdoorBtn").on("click", function (e) {
      e.stopPropagation();
      clearMainC();
      outdoorCard();
    });

    // Click event for choosing an indoor date
    $("#indoorBtn").click(function (e) {
      e.stopPropagation();
      clearMainC();
      indoorCard();
    });
}  

  function weatherFetch() {
    
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${userInput.value}&appid=a7a1b26928245e448876bae028d3ffe6&cnt=3&units=imperial`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const { temp } = data.list[0].main;
        const location = data.city.name;
        const { icon } = data.list[0].weather[0];
        const { dt } = data.list[0];

        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        const hourEl = document.querySelector(`.hour`);
        const iconEl = document.querySelector(`#icon`); 
        const cityName = document.querySelector(`#cityName`);
        const tempEl = document.querySelector(`.temp`);
        const time = dayjs.unix(dt).format("h A");
        console.log(time);
        hourEl.innerText = time;
        iconEl.src = iconUrl;
        cityName.innerText = `Todays Forecast in ` + location + `:`;
        tempEl.innerText = `Temp: ` + temp + ` °F`;

        for (let i = 1; i < data.list.length; i++) {
          let currHour = data.list[i];
          const Url = `https://openweathermap.org/img/wn/${currHour.weather[0].icon}@2x.png`;
          console.log(temp);
          console.log(currHour);
          document.querySelector(`.hour-${i}`).innerHTML = `${dayjs
            .unix(currHour.dt)
            .format("h A")}`;
          document.querySelector(`.temp-${i}`).innerText =
            `Temp: ` + currHour.main.temp + ` °F`;
          document.querySelector(`#icon-${i}`).src = Url;
        }
      });
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

    // Click event for choosing Relaxing Outdoor date
    $("#click-relax").click(function (e) {
      e.stopPropagation();
      clearMainC();
      dateData = "relax";
      checkDateType();
    });

    // Click event for choosing Adventure Outdoor date
    $("#click-adven").click(function (e) {
      e.stopPropagation();
      clearMainC();
      dateData = "adven";
      checkDateType();
    });
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

    // Click event for choosing lightheart Indoor date
    $("#click-lightheart").click(function (e) {
      e.stopPropagation();
      clearMainC();
      dateData = "lightheart";
      checkDateType();
    });

    // Click event for choosing Romantic Indoor date
    $("#click-roman").click(function (e) {
      e.stopPropagation();
      clearMainC();
      dateData = "roman";
      checkDateType();
    });
  }

  // check what type of date the user choose
  function checkDateType() {
    if ((dateData = "relax")) {
      dateType = relaxedDates;
      pickCategory(dateType);
    } else if ((dateData = "adven")) {
      dateType = adventureDates;
      pickCategory(dateType);
    } else if ((dateData = "lightheart")) {
      dateType = lightHeartDates;
      pickCategory(dateType);
    } else if ((dateData = "roman")) {
      dateType = romanticDates;
      pickCategory(dateType);
    }
  }

  let pickCategory = (array) => {
    let i = Math.floor(Math.random() * array.length);
    const resultDate = array[i];
    getYelpData(cityName, resultDate);
  };
});
