// Check local storage for any saved date choices
function savedDates (){
let storage = JSON.parse(localStorage.getItem(`favorites`))
console.log(storage);
let dateContainer = document.querySelector(`.dateContainer`)
for (let i = 0; i < storage.length; i++) {
    let date = storage[i]
    let liEl = document.createElement(`li`)
    liEl.textContent = date
    dateContainer.appendChild(liEl)
}
}
savedDates();