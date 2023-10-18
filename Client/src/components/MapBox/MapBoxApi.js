import axios from "axios";

const mapboxAPI = axios.create({
  baseURL: "https://api.mapbox.com",
  params: {
    access_token:
      "pk.eyJ1IjoiYWZzYWw0NTYiLCJhIjoiY2xteWRtd2MzMWpsMzJpcGV2aHAybm1xaCJ9.o_CpCUnw2iXwQ2IlW_ZEjQ",
  },
});

export default mapboxAPI;

