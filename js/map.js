// Map initialization
let map;
let trainMarkers = {};
let selectedTrain = null;

function initMap() {
  map = L.map("map").setView([62.2426, 25.7473], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.control.scale().addTo(map);
}

function createTrainIcon(trainType) {
  const iconColor =
    trainType === "LONG_DISTANCE"
      ? "red"
      : trainType === "COMMUTER"
      ? "blue"
      : "green";

  return L.divIcon({
    html: `<div class="train-marker" style="background-color: ${iconColor};"></div>`,
    className: "train-icon-container",
    iconSize: [15, 15],
  });
}

function updateTrainPositions(trains) {
  const activeTrainIds = new Set();

  trains.forEach((train) => {
    activeTrainIds.add(train.trainNumber.toString());

    const marker = trainMarkers[train.trainNumber];
    const position = [
      train.location.coordinates[1],
      train.location.coordinates[0],
    ];

    if (marker) {
      marker.setLatLng(position);
    } else {
      const trainIcon = createTrainIcon(train.trainType);
      const newMarker = L.marker(position, { icon: trainIcon })
        .addTo(map)
        .on("click", () => showTrainDetails(train));

      trainMarkers[train.trainNumber] = newMarker;
    }
  });

  Object.keys(trainMarkers).forEach((trainId) => {
    if (!activeTrainIds.has(trainId)) {
      map.removeLayer(trainMarkers[trainId]);
      delete trainMarkers[trainId];
    }
  });
}

function showTrainDetails(train) {
  selectedTrain = train;

  const detailsDiv = document.getElementById("train-details");

  let detailsHTML = `<h3>Train ${train.trainNumber}</h3>`;

  if (train.trainType && train.trainType !== "undefined") {
    detailsHTML += `<p><strong>Type:</strong> ${train.trainType}</p>`;
  }

  if (train.trainCategory && train.trainCategory !== "undefined") {
    detailsHTML += `<p><strong>Category:</strong> ${train.trainCategory}</p>`;
  }

  detailsHTML += `
    <p><strong>Speed:</strong> ${train.speed} km/h</p>
    <p><strong>Last updated:</strong> ${new Date(
      train.timestamp
    ).toLocaleString()}</p>
  `;

  detailsDiv.innerHTML = detailsHTML;

  Object.values(trainMarkers).forEach((marker) => {
    marker._icon.classList.remove("selected");
  });

  trainMarkers[train.trainNumber]._icon.classList.add("selected");
}
