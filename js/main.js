let yourLocation = document.getElementById("yourLocation");
let locMsg = "Din lokation: ";

// success callback
const successCallback = (position) => {
  // fetch request til Nominatim (reverse)
  fetchAddress(position.coords.latitude, position.coords.longitude).then(
    (data) => {
      Object.entries(data.address).forEach(([key, value]) => {
        if (key === "town") {
          locMsg += `By: ${value}. `;
        }
        if (key === "road") {
          locMsg += `Vej: ${value}. `;
        }
      });
      yourLocation.innerText = locMsg;
    }
  );
};

// error callback
const errorCallback = (error) => {
  console.error(error);
};

async function fetchAddress(lat, lon) {
  let locationAPI = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`;

  await fetch(locationAPI).then((res) =>
    res.json().then((data) => {
      locationData = data;
    })
  );
  return locationData;
}

//let locationAPI = `https://nominatim.openstreetmap.org/reverse?lat=${latPos}&lon=${longPos}&zoom=[10]`;
// get location
navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
  enableHighAccuracy: true,
  timeout: 5000,
});
