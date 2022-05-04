import { address, location , timezone, isp} from "./elements.js"

export default function displayInfo(data){
    if(data !== null && data.code !== 422){
        address.textContent = data.ip
        location.textContent = `${data.location.city}, ${data.location.region}`
        timezone.textContent = `UTC${data.location.timezone}`
        isp.textContent = data.isp
    }
}

