const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorInfo = await response.json().catch(() => ({}));
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorInfo.detail || response.statusText}`);
  }
  return response.json();
};

export default fetchData;

