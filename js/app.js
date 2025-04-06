// API endpoint
const API_URL = "https://rata.digitraffic.fi/api/v1/train-locations/latest";

// Update interval in milliseconds (5 seconds)
const UPDATE_INTERVAL = 5000;

document.addEventListener("DOMContentLoaded", () => {
  initMap();

  fetchTrainData();

  setInterval(fetchTrainData, UPDATE_INTERVAL);

  const updateButton = document.getElementById("update-button");
  if (updateButton) {
    updateButton.addEventListener("click", fetchTrainData);
  }
});

// Fetch train location data from the API
async function fetchTrainData() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const trains = await response.json();

    updateTrainPositions(trains);

    updateStatusIndicator(true);

    if (selectedTrain) {
      const updatedTrain = trains.find(
        (train) => train.trainNumber === selectedTrain.trainNumber
      );
      if (updatedTrain) {
        showTrainDetails(updatedTrain);
      }
    }

    document.getElementById("last-update-time").textContent =
      new Date().toLocaleTimeString();
  } catch (error) {
    console.error("Error fetching train data:", error);
    updateStatusIndicator(false);
  }
}

function updateStatusIndicator(isSuccess) {
  const statusIndicator = document.getElementById("status-indicator");
  if (statusIndicator) {
    statusIndicator.className = isSuccess ? "status-success" : "status-error";
    statusIndicator.title = isSuccess
      ? "Data updated successfully"
      : "Error updating data";
  }
}
