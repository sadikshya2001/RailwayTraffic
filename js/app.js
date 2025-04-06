// API endpoint
const API_URL = "https://rata.digitraffic.fi/api/v1/train-locations/latest";

// Update interval in milliseconds (5 seconds)
const UPDATE_INTERVAL = 5000;

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the map
  initMap();

  // Load initial train data
  fetchTrainData();

  // Set up automatic updates
  setInterval(fetchTrainData, UPDATE_INTERVAL);

  // Add event listener for update button if you have one
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

    // Update the map with new train positions
    updateTrainPositions(trains);

    // Update the status indicator
    updateStatusIndicator(true);

    // If a train was selected, refresh its details
    if (selectedTrain) {
      const updatedTrain = trains.find(
        (train) => train.trainNumber === selectedTrain.trainNumber
      );
      if (updatedTrain) {
        showTrainDetails(updatedTrain);
      }
    }

    // Update last refresh time
    document.getElementById("last-update-time").textContent =
      new Date().toLocaleTimeString();
  } catch (error) {
    console.error("Error fetching train data:", error);
    updateStatusIndicator(false);
  }
}

// Update the status indicator
function updateStatusIndicator(isSuccess) {
  const statusIndicator = document.getElementById("status-indicator");
  if (statusIndicator) {
    statusIndicator.className = isSuccess ? "status-success" : "status-error";
    statusIndicator.title = isSuccess
      ? "Data updated successfully"
      : "Error updating data";
  }
}
