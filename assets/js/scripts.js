
    

// A $( document ).ready() block.
$(document).ready(function () {
  console.log("ready!");
  
  let userInput = document.querySelector(`#inputBox`);

//  Arrays for Yelp Search categories
  let outdoorDates = ["parks", "tours", "active"];
  let foodDates = ["restaurants", "gourmet", "tastingclasses"];
  let lightHeartDates = ["artsandcrafts", "petstores", "media", "movietheaters"];
  let artsDates = ["museums", "arts", "photographers"];
  let nightLifeDates = ["bars", "nightlife"];

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
  $(`#btn`).click(function (event) {
    event.preventDefault()
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?appid=3be2b2b6acc21e3760901d15acf91f72&q=${userInput.value}&cnt=1&units=imperial`)
    .then(response => response.json())

  })
  
  // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        // $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
  
    });


  // Click event for Welcome button to hide first welcome card
  document.querySelector("#start-btn").addEventListener("click", function(e) {
    e.stopPropagation();
    const startCard = document.querySelector("#start-card");
    const startContainer = document.querySelector("#start-container");
    startCard.setAttribute("style", "display: none;");
    startContainer.setAttribute("style", "background-image: none;");
    locationCard();
  })

  // Show main container to ask user location
  function locationCard() {
    const locationCardCont = document.querySelector("#main-container");
    locationCardCont.classList.remove("hidden");
  }


});


