console.log("Client side js file is loaded");

// fetch('http://puzzle.mead.io/puzzle').then( (response) => {

//     response.json().then( (data) => {
//         console.log(data);
//     })
// })



const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#msg1');
const messageTwo = document.querySelector('#msg2');
const messageThree = document.querySelector('#msg3');


// add an event listener 
weatherForm.addEventListener('submit', (e) => {
    
    e.preventDefault();

    const location = searchElement.value;

    messageOne.textContent = "Loading " + location;
    messageTwo.textContent = "";
    messageThree.textContent = "";

    //console.log(location);

    fetch('http://localhost:3000/weather?address=' + location).then( (response) => {

    response.json().then( (data) => {

        if ('error' in data) {
            console.log("Error: ", data.error);
            messageOne.textContent = data.error;
        }
        else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.description;
            messageThree.textContent = data.temperature;
            console.log(data.description);
            console.log(data.temperature);
            console.log(data.location);
        }
        
    })
})

});