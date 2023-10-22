export async function validatePlace(place) {
  const access_token =
    "pk.eyJ1IjoiYWZzYWw0NTYiLCJhIjoiY2xteWRtd2MzMWpsMzJpcGV2aHAybm1xaCJ9.o_CpCUnw2iXwQ2IlW_ZEjQ";
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      place
    )}.json?access_token=${access_token}`;
    const response = await fetch(url);
    const data = await response.json();
    const features = data.features;
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
