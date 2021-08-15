const objectToQueryString = (object) =>
  Object.entries(object)
    .map((e) => e.join("="))
    .join("&");

export const callAPI = async (url, query) => {
  try {
    const response = await fetch(`${url}?${objectToQueryString(query)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
