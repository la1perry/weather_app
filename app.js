
// let myLat=[];
// let myLng=[];

// function GetLocation(){
//     let geocoder=new google.maps.Geocoder();
// let address=document.getElementById("address").value;

// geocoder.geocode( { address:'address'}, function (results, status){
//     if (status == google.maps.GeocoderStatus.OK){
//         let latitude = results[0].geometry.location.lat();
//         let longitude = results[0].geometry.location.lng();
//         console.log(latitude, longitude);
//     myLat.push(latitude);
//     myLng.push(longitude);
//     alert(latitude+longitude);
//     } else {
//         alert("error"+status);}
        
//     });

// }





// let myLocation=[];
const myLatitude=[];
const myLongitude=[];

function getLocation(){

const city = document.getElementById('city');
const country = document.getElementById('country');

const url='https://locationiq.org/v1/search.php?key=';
const apiKey='b4f1a2a9d14fb5186eb9';

 fetch(`${url}${apiKey}&format=json&city=${city}&country=${country}`)
 .then((res)=>res.json())
 .then((data)=>{
     console.log(data);
     console.log(`latitude:${data[0].lat} longitude: ${data[0].lon}`);
     const lat=data[0].lat;
     const lon=data[0].lon;
     myLatitude.push(lat);
     myLongitude.push(lon);
})
.catch((e) => console.log(e,"error"));
}

console.log(myLatitude);
console.log(myLongitude);