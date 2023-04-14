// Check local storage for any saved date choices
document.addEventListener('DOMContentLoaded', function() {
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
  
    const clearBtn = document.querySelector('.clearBtn');
    const dateContainer = document.querySelector('.dateContainer');
  
    clearBtn.addEventListener('click', function() {
      localStorage.clear();
      while (dateContainer.firstChild) {
        dateContainer.removeChild(dateContainer.firstChild);
      }
    });
  
    savedDates();
  });
  