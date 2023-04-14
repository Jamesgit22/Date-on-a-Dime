// A  document .ready() block.

document.addEventListener("DOMContentLoaded", function () {
  let userInput = document.querySelector(`#location-input`);
  let locationContainer = document.querySelector(`#location-container`);
  let mainContainer = document.querySelector(`#main-container`);
  let startContainer = document.querySelector(`#start-container`);
  let dateData;
  let dateType;
  let userCity;
  let yelpData;
  let reviews;

  //  Arrays for Yelp Search categories
  let adventureDates = ["escapegames", "tours", "festivals"];
  let relaxedDates = ["parks"];
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
  let randomDates = [
    "escapegames",
    "tours",
    "festivals",
    "parks",
    "artsandcrafts",
    "petstores",
    "media",
    "movietheaters",
    "museums",
    "arts",
    "restaurants",
    "gourmet",
    "photographers",
    "tastingclasses",
  ];

  // check local storage for stored items
  // const storedDates = JSON.parse(localStorage.getItem("favorites")) || [];

  // Click event for Welcome button to hide first welcome card
  document.querySelector("#start-btn").addEventListener("click", function (e) {
    e.stopPropagation();
    const startCard = document.querySelector("#start-card");
    const bgColor = document.querySelector("#overlay");
    startCard.setAttribute("style", "display: none;");
    bgColor.setAttribute("style", "background-color: #452C34;");

    locationCard();
  });

  // Show main container to ask user location
  function locationCard() {
    let mainCont = document.querySelector(`#main-container`);
    mainCont.classList.remove(`hidden`);
    //Click event for clicking search button after inputting city
    document
      .querySelector(`#searchBtn`)
      .addEventListener("click", function (e) {
        e.stopPropagation();
        userCity = document.querySelector(`#location-input`).value;
        weatherCardFunc();
      });
  }

  function weatherCardFunc() {
    clearMainC();
    document.querySelector(
      "#main-card"
    ).innerHTML = ` <div class="card-content">
    <h1 id="cityName">Today's Forecast</h1>
    <div class="weatherDataContainer">
      <div class="hourBlock">
      <div class="weather1">
        <p class="hour">Hour</p>
        <img src="" alt="" id="icon">
        <p class="temp">Temp</p>
      </div>
      <div class="weather2">
        <p class="hour-1">Hour</p>
        <img src="" alt="" id="icon-1">
        <p class="temp-1">Temp</p>
      </div>
      <div class="weather3">
        <p class="hour-2">Hour</p>
        <img src="" alt="" id="icon-2">
        <p class="temp-2">Temp</p>
      </div>
      </div>
     </div> 
     <button id="outdoorBtn" class="button is-warning is-light">Outdoor</button>
      <button id="surpriseBtn" class="button is-warning is-light">Surprise Me!</button>
      <button id="indoorBtn" class="button is-warning is-light">Indoor</button>
  </div>`;
    weatherFetch();

    // Click event for choosing an outdoor date
    document
      .querySelector("#outdoorBtn")
      .addEventListener("click", function (e) {
        e.stopPropagation();
        clearMainC();
        outdoorCard();
      });

    // Click event for choosing an indoor date
    document
      .querySelector("#indoorBtn")
      .addEventListener("click", function (e) {
        e.stopPropagation();
        clearMainC();
        indoorCard();
      });

    // Click event for choosing a random date
    document.querySelector("#surpriseBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      clearMainC();
      dateData = "random";
      checkDateType();
      openModal();
    });
  }

  function weatherFetch() {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${userInput.value}&appid=a7a1b26928245e448876bae028d3ffe6&cnt=3&units=imperial`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Please enter a valid city name. Error " + response.status
          );
        }
        return response.json();
      })

      .then((data) => {
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
        hourEl.innerText = time;
        iconEl.src = iconUrl;
        cityName.innerText = location + `'s Forecast:`;
        tempEl.innerText = `Temp: ` + Math.round(temp) + ` °F`;

        for (let i = 1; i < data.list.length; i++) {
          let currHour = data.list[i];
          const Url = `https://openweathermap.org/img/wn/${currHour.weather[0].icon}@2x.png`;
          document.querySelector(`.hour-${i}`).innerHTML = `${dayjs
            .unix(currHour.dt)
            .format("h A")}`;
          document.querySelector(`.temp-${i}`).innerText =
            `Temp: ` + Math.round(currHour.main.temp) + ` °F`;
          document.querySelector(`#icon-${i}`).src = Url;
        }
      })
      .catch((error) => {
        alert(error.message);
        document.location.href = "./index.html";
      });
  }

  // Clear the html content in the main card
  function clearMainC() {
    document.querySelector("#main-card").innerHTML = ``;
  }

  // Create html content if user selects an outdoor date
  function outdoorCard() {
    document.querySelector("#main-card").innerHTML = `<div class="card-content">
    <div class="content">
      <h1 class="txt-dbrown">Would you prefer a relaxed outdoor date <br> or an adventurous one?</h1>
      <div>
        <button id="click-relax" class="button is-warning is-light" data-outdoor="relaxed">Relaxed</button>
        <button id="click-adven" class="button is-warning is-light">Adventure</button>
      </div>
    </div>`;

    // Click event for choosing Relaxing Outdoor date
    document
      .querySelector("#click-relax")
      .addEventListener("click", function (e) {
        e.stopPropagation();
        clearMainC();
        dateData = "relax";
        checkDateType();
        openModal();
      });

    // Click event for choosing Adventure Outdoor date
    document
      .querySelector("#click-adven")
      .addEventListener("click", function (e) {
        e.stopPropagation();
        clearMainC();
        dateData = "adven";
        checkDateType();
        openModal();
      });
  }

  // Create html content if user selects an indoor date
  function indoorCard() {
    document.querySelector("#main-card").innerHTML = `<div class="card-content">
    <div class="content">
      <h1 class="txt-dbrown">Would you prefer a light hearted indoor <br> date or a romantic one?</h1>
      <div>
        <button id="click-light" class="button is-warning is-light call-modal" data-indoor="lightheart">Light Hearted</button>
        <button id="click-roman" class="button is-warning is-light call-modal " data-indoor="romantic">Romantic</button>
      </div>
    </div>
  </div>`;

    // Click event for choosing lightheart Indoor date
    document
      .querySelector("#click-light")
      .addEventListener("click", function (e) {
        e.stopPropagation();
        dateData = "lightheart";
        clearMainC();
        checkDateType();
        openModal();
      });

    // Click event for choosing Romantic Indoor date
    document
      .querySelector("#click-roman")
      .addEventListener("click", function (e) {
        e.stopPropagation();
        dateData = "roman";
        clearMainC();
        checkDateType();
        openModal();
      });
  }

  // check what type of date the user choose
  function checkDateType() {
    if (dateData == "relax") {
      dateType = relaxedDates;
      pickCategory(dateType);
    } else if (dateData == "adven") {
      dateType = adventureDates;
      pickCategory(dateType);
    } else if (dateData == "lightheart") {
      dateType = lightHeartDates;
      pickCategory(dateType);
    } else if (dateData == "roman") {
      dateType = romanticDates;
      pickCategory(dateType);
    } else if (dateData == "random") {
      dateType = randomDates;
      pickCategory(dateType);
    }
  }

  // Fetch data from Yelp Fusion
  async function getYelpData(city, type) {
    const response = await fetch(
      `https://floating-headland-95050.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${city}&radius=20000&categories=${type}&sort_by=rating&limit=10`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer 6qR4_DRix9tgxR-wMhc5CZxksBaAi7-kad8A147whk73CqEO0g_2KhKnIyk8PkGGMuZAQIBF3VNetKKXTuqg1g0B-2dDLnu9FPV8-IA-j7W5fhsh5Jm_6-i-1S80ZHYx",
        },
      }
    );
    yelpData = await response.json();
    yourDatePicker(yelpData);
  }

  let pickCategory = (array) => {
    let i = Math.floor(Math.random() * array.length);
    const resultDateArray = array[i];
    getYelpData(userCity, resultDateArray);
  };

  // Choose final date result from Yelp JSON options
  let yourDatePicker = () => {
    console.log(yelpData);
    let i = Math.floor(Math.random() * 10);
    const finalDate = yelpData.businesses[i].name;
    const rating = yelpData.businesses[i].rating;
    const reviewObj = yelpData.businesses[i].id;
    const urlDate = yelpData.businesses[i].image_url;
    console.log(rating);
    console.log(finalDate);
    console.log(urlDate);
    document.querySelector("#yelp-img").src = urlDate;
    document.querySelector(
      "#date-name"
    ).textContent = `${finalDate} ${"- Rating:"} ${rating}`;
    getReviews(reviewObj);
    const favBtn = document.querySelector(`#modal-fav-btn`);

    favBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      let storage = JSON.parse(localStorage.getItem(`favorites`)) || [];
      storage.push(finalDate);
      localStorage.setItem(`favorites`, JSON.stringify(storage));
    });

    document
      .querySelector("#modal-reroll-btn")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        yourDatePicker();
      });
  };

  // Get reviews for the result date
  async function getReviews(id) {
    const response = await fetch(
      `https://floating-headland-95050.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews?limit=3&sort_by=yelp_sort`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer 6qR4_DRix9tgxR-wMhc5CZxksBaAi7-kad8A147whk73CqEO0g_2KhKnIyk8PkGGMuZAQIBF3VNetKKXTuqg1g0B-2dDLnu9FPV8-IA-j7W5fhsh5Jm_6-i-1S80ZHYx",
        },
      }
    );
    const reviewsData = await response.json();
    reviews = {
      reviewOne: reviewsData.reviews[0].text,
      reviewTwo: reviewsData.reviews[1].text,
    };
    document.querySelector("#review-one").textContent = reviews.reviewOne;
    document.querySelector("#review-two").textContent = reviews.reviewTwo;
  }

  function openModal() {
    let unhide = document.querySelector("#modal-real");
    unhide.classList.add("is-active");
  }
});

