// console.log("hello world")




const weatherInput = document.querySelector('form');
const inputValue = document.querySelector('input');
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')
const msgThree = document.querySelector('#msg-3')
const msgFour = document.querySelector('#msg-4')
const msgFive = document.querySelector('#msg-5')
const msgSix = document.querySelector('#msg-6')
const msgSeven = document.querySelector('#msg-7')

weatherInput.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = inputValue.value;

    msgOne.textContent = 'Loading Data'
    msgTwo.textContent = ""
    msgThree.textContent = ""
    msgFour.textContent = ""
    msgFive.textContent = ""
    msgSix.textContent = ""

    fetch('/weather?search=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
            msgOne.textContent=data.error
            }
            else {
                msgOne.textContent = ''
                msgTwo.textContent = data.Location
                msgThree.textContent = data.Temperature
                msgFour.textContent = data.FeelsLike
                msgFive.textContent = data.Humidity
                msgSix.textContent = data.Weather
            }
        })
    })

})