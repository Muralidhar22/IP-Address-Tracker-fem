import displayInfo from "./lib/display.js"
import { searchBtn } from "./lib/elements.js";
// custom marker for the map
const customMarker = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [35, 45],
})
// onload of the window fetch the Map according to the viewer IP
window.addEventListener('load', getMap);
// search event listener
searchBtn.addEventListener('click',getMap)

// display Map
async function getMap(){
   searchBtn.classList.add("disabled")
   searchBtn.disabled=true
// get location
    const ipData = await getLoc()

    searchBtn.classList.remove("disabled")
    searchBtn.disabled=false
 if(ipData.code === 422){
    document.querySelector('input[type="search"]').value = ''
    document.querySelector('input[type="search"]').placeholder= ipData.messages
 }
else{
        // display the infomration on the page
        displayInfo(ipData)
        const latd = ipData.location.lat;
        const lngd = ipData.location.lng;
        const mapOptions = {
            center: [latd, lngd],
            zoom: 13,
        }
        // Map setup
        let container = L.DomUtil.get('map');

        if(container != null){
            container._leaflet_id = null;
        }
        let map = L.map('map').setView(mapOptions.center, mapOptions.zoom)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors and coded by <a href=""></a>'
        }).addTo(map);

        L.marker(mapOptions.center,{icon: customMarker}).addTo(map);
}
   

}

// fetch Geo-location
async function getLoc(){
    const inputIp = document.querySelector('input[type="search"]').value
    const inputValue = inputIp || await userIp()
   
    const endpoint = `https://geo.ipify.org/api/v2/country,city`
    const apiKey = `at_6cqSy2CpvjQ0xkfTvbnkFz4Zywo0k`
    const query = `?apiKey=${apiKey}&ipAddress=${inputValue}`
    try{
        const res = await fetch(`${endpoint}${query}`)
        return await res.json()
    }
  catch(e){
      console.log(e)
      document.querySelector('input[type="search"]').value = ''
      document.querySelector('input[type="search"]').placeholder= "Sorry, not found"
      
      return null;
  }
   
}
// fetch current viewer IP
async function userIp(){
    try{
        const res = await fetch('https://ipapi.co/ip/')
        return await res.text()
    }
    catch(e){
        console.log(e)

    }
}
