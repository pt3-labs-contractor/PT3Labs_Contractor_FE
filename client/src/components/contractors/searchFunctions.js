import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export async function sortByDistance(zip, contractors, limit) {
  function isCenterOfUS(lat, long) {
    return (
      (lat === '39.495914459228516' && long === '-98.98998260498047') ||
      (lat === 39.495914459228516 && long === -98.98998260498047)
    );
  }
  function haversine(strLat1, strLong1, strLat2, strLong2) {
    const [lat1, long1, lat2, long2] = [
      Number(strLat1),
      Number(strLong1),
      Number(strLat2),
      Number(strLong2),
    ];
    const toRad = n => (n * Math.PI) / 180;
    const [dLat, dLong] = [toRad(lat2 - lat1), toRad(long2 - long1)];
    const R = 6371; // Earth's radius, in KM
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  const response = await axios.get(
    `https://dev.virtualearth.net/REST/v1/Locations?countryRegion=US&postalCode=${zip}&key=${
      process.env.REACT_APP_BING_MAPS_KEY
    }`
  );
  if (!response.data.resourceSets[0].resources.length) return null;
  const [
    lat,
    long,
  ] = response.data.resourceSets[0].resources[0].point.coordinates;
  if (isCenterOfUS(lat, long)) return null;
  const promises = contractors.map(async contractor => {
    if (
      !contractor.latitude ||
      isCenterOfUS(contractor.latitude, contractor.longitude)
    )
      return contractor;
    return {
      ...contractor,
      distance:
        haversine(lat, long, contractor.latitude, contractor.longitude) *
        0.621371, // Convert to miles
    };
  });
  const resolved = await Promise.all(promises);
  const sorted = resolved.sort((a, b) => {
    if (!a.distance) return 1;
    if (!b.distance) return -1;
    return a.distance - b.distance;
  });
  return limit
    ? sorted.filter(contractor => limit > contractor.distance)
    : sorted;
}
