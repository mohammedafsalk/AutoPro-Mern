import mapboxAPI from "../components/MapBox/MapBoxApi";

export async function validatePlace(place) {
  try {
    const url = `/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json`;
    const response = await mapboxAPI.get(url);

    const features = response.data.features;
    if (features.length > 0) {
      const [longitude, latitude] = features[0].center;

      return {
        isValid: true,
        latitude,
        longitude,
      };
    } else {
      return {
        isValid: false,
      };
    }
  } catch (error) {
    console.error("Error validating place:", error);
    return {
      isValid: false,
    };
  }
}

