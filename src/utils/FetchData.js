export default async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

