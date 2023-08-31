import mapboxAPI from "../components/MapBox/MapBoxApi";
export async function validatePlace(place) {
  try {
    const url = `/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json`;
    const response = await mapboxAPI.get(url);
    if (response.data.features.length > 0) {
        console.log("true");
      return true;
    } else {
        console.log("false");
      return false;
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
}
