var userInput = document.querySelector(`#inputBox`);


$(`#btn`).click(function (event) {
    event.preventDefault()
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?appid=3be2b2b6acc21e3760901d15acf91f72&q=${userInput.value}&cnt=1&units=imperial`)
    .then(response => response.json())

})