const button = document.getElementById("search-button");
const input = document.getElementById("city-input");
const button2 = document.getElementById("get-location");

const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");

async function getData(lat, long) {
    const promise = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=d67b02a92e1f4b50807120922242701&q=${lat},${long}&aqi=yes`
    );
    return await promise.json();
}

button.addEventListener("click", async () => {
    const value = input.value;
    const result = await getData(value);
    updateCityInfo(result);
});

async function getLocation(position) {
    const result = await getData(position.coords.latitude, position.coords.longitude);
    updateCityInfo(result);
}

function failedloc() {
    console.log("failed to get your current location");
}

button2.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(getLocation, failedloc);
});

function updateCityInfo(result) {
    cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
    cityTime.innerText = result.location.localtime;
    cityTemp.innerText = result.current.temp_c;
}
