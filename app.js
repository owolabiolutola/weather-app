const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');





const updateUI= (data) => {

   const cityDetails = data.cityDetails; 
   const weather = data.weather;



   //Update details template

   details.innerHTML = `
   <h5 class="my-3">${cityDetails.EnglishName}</h5>
   <div class="my-3">${weather.WeatherText}</div>
   <div class="display-4 my-4">
       <span>${weather.Temperature.Metric.Value}</span>
       <span>&deg;C</span>
   </div>`;

 // update the night/day & icon images
  


 let timeSrc = null;
 
 
   if (weather.IsDayTime) {

timeSrc ='img/day.svg';

 } 
 
 else {

  timeSrc = 'img/night.svg';

 }
 time.setAttribute('src', timeSrc);


   //remove the d-none class if present

   if(card.classList.contains('d-none')){
    card.classList.remove('d-none');

   }


};


 


const updateCity = async (city) =>  {

const cityDetails = await getCity(city);

const weather = await getWeather(cityDetails.Key);


return {

    cityDetails: cityDetails,
    weather: weather,  
};

}; 


cityForm.addEventListener('submit', e => {
//preventdefault
e.preventDefault();



//get City value

const city = cityForm.city.value.trim();
// cityForm.reset();



//update the ul with new city

updateCity(city)
.then(data => updateUI( data ))

.catch(err => console.log(err));



//set local storage
localStorage.setItem('city', city );

});

 if(localStorage.getItem('city')){
updateCity(localStorage.getItem('city'))

.then(data => updateUI(data))

.catch(err => console.log(err));

 }

 cityForm.city.value= localStorage.getItem('city');


 