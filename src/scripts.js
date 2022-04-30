window.addEventListener('load', getMap);


function getMap(){
    // MapId: cb763ab7aa613d55
    // getLoc()
    // const getLocDetails = getLoc()
    // console.log(`Map is being loaded`)
    // console.log(getLocDetails)
    let latitude = 37.40599;
    let longitude = -122.078514;
    let mapOptions = {
        center: [latitude, longitude],
        zoom: 13,
    }
    // Map setup
    var map = L.map('map').setView(mapOptions)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([latitude, longitude]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
}
async function getLoc(){
    const inputIp = document.querySelector('input[type="search"]').value
    const inputValue = inputIp || await userIp()
   
    // const endPoint = `https://geo.ipify.org/api/v2/country,city`
    // const apiKey = `at_6cqSy2CpvjQ0xkfTvbnkFz4Zywo0k`
    // const query = `?apiKey=${apiKey}&ipAddress=${inputValue}`
    // return `location details...`
}
async function userIp(){
    try{
        let res = await fetch('https://ipapi.co/ip/')
        return await res.text()
    }
    catch(e){
        console.log(e)
    }
}
