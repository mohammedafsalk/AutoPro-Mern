import mapboxAPI from "./MapBox/MapBoxApi";
export async function validatePlace(place) {
  try {
    const url = `/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json`;
    const response = await mapboxAPI.get(url);
    if (response.data.features.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
