
const url='https://locationiq.org/v1/search.php?key=';
const apiKey='APIKEY';
const btn=document.getElementById("btn");

btn.addEventListener('click',(e)=>{
e.preventDefault();

const cit = document.getElementById('city').value;
const con = document.getElementById('country').value;

getLocation(cit, con);
});


function getLocation(cit, con) {
    
  fetch(`${url}${apiKey}&format=json&city=${cit}&country=${con}`)
    .then((res) => res.json())
    .then((data) => {     
        console.log(data);
         const lat=(data[0].lat);
         const long=(data[0].lon);
          
          const x= JSON.stringify(lat);
         localStorage.setItem('lat', x);
        const y = JSON.stringify(long);
         localStorage.setItem('long', y);
         
        getWeather();
    })
.catch((e) => {
    console.log(e,"error");
    alert('We could not find the location you requested, is it spelled correctly?');
});
}




function getWeather (){


const Lat= localStorage.getItem('lat');
const Latitude=JSON.parse(Lat);
const Long = localStorage.getItem('long');
const Longitude = JSON.parse(Long);
const urlz='https://api.wunderground.com/api/APIKEY/conditions/q/'+Latitude+','+Longitude+'.json';
let temperature=document.getElementById("temp");
let describe=document.getElementById("desc");
         
  function createNode(element){
         return document.createElement(element);
     }
     function append(parent, el){
         return parent.appendChild(el);
     }
     
 fetch(`${urlz}`)
 .then((res)=>res.json())
 .then((results)=>{
         console.log(results);
         let temp=(results.current_observation.temp_c);
         let weather=(results.current_observation.weather);
         let time=(results.current_observation.observation_time);
         console.log(temp);
         console.log(weather);

         let p=createNode('p');
         let span=createNode('span');
         
             describe.innerHTML=' ';
             temperature.innerHTML=' ';

         span.innerHTML=temp;
         append(temperature, span);
         p.innerHTML=weather; 
         append(describe, p);
         
          if (weather===""){
            let txt="Sorry this data is not available";
            p.innerHTML=txt;
            append(describe,p);
          }
          
          let description=JSON.stringify(weather);
         localStorage.setItem('description', description);
         let main=JSON.stringify(temp);
         localStorage.setItem('temp', main);
         let timestamp=JSON.stringify(time);
         localStorage.setItem('time', timestamp);
         
         appendImg();
})
.catch((e) => { console.log(e,"error");
alert('No weather data found');
});
}
 



function appendImg () {
    
    const cit = document.getElementById('city').value;
    const con = document.getElementById('country').value;

  cit.value=' ';
  con.value=' ';
  
    const pic=document.getElementById("imgdiv"); 
    let img=document.createElement("img");
    
  pic.innerHTML=' ';
   
   
   const timestamp=localStorage.getItem('time');
    let time=JSON.parse(timestamp);
    const space = ' ';
    const localTime = time.split(space);
    console.log(localTime);
    const x=':';
    const hour=localTime[5].split(x);
    console.log(hour[0]);
    
 
    const description=localStorage.getItem('description');
    let weather=JSON.parse(description);


  if (weather.indexOf('Rain'||'Drizzle') >= 0) {
      pic.appendChild(img);
      img.src="imgs/rain.svg";
  } 
  else if (weather.indexOf('Clear'||'Sunny') >= 0) {
      if (localTime[6]=='AM' & hour[0]>=7){
          pic.appendChild(img);
      img.src="imgs/sunny.svg";
      } else if (localTime[6]=='PM' & hour[0]<=8) {
          pic.appendChild(img);
      img.src="imgs/sunny.svg";
      } 
      else {
      pic.appendChild(img);
      img.src="imgs/clearnight.svg";
  }
 } 
 else if (weather.indexOf('Overcast'||'Cloudy'||'Partly Cloudy'||'Clouds') >= 0) {
      if (localTime[6]=='AM' & hour[0]>=7 ){ 
          pic.appendChild(img);
      img.src="imgs/cloudy.svg";
      }else if (localTime[6]=='PM' & hour[0]<=8){ 
          pic.appendChild(img);
      img.src="imgs/cloudy.svg";
      }  else {
 pic.appendChild(img);
      img.src="imgs/night.svg";
  }
 } else if (weather.indexOf('Snow') >= 0) {
    pic.appendChild(img);
      img.src="imgs/snow.svg";
  } else {
      if (localTime[6]=='AM' & hour[0]>=7 ){
          pic.appendChild(img);
      img.src="imgs/overcast.svg";
      }else if (localTime[6]=='PM' & hour[0]<=8){
         pic.appendChild(img);
      img.src="imgs/overcast.svg";
      }else{
      pic.appendChild(img);
      img.src="imgs/night.svg";
      }
  }
  localStorage.clear();
}



