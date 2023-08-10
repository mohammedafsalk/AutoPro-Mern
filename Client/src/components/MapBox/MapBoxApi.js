import axios from "axios";

const mapboxAPI = axios.create({
  baseURL: "https://api.mapbox.com",
  params: {
    access_token:
      "pk.eyJ1IjoiYWZzYWw0NTYiLCJhIjoiY2xraHU0N3NoMDZmcjNxbzZpN3k3bThpYyJ9.-sQCN_GaOvYY-3Ho92UpOg", // Replace with your Mapbox access token
  },
});

export default mapboxAPI;
