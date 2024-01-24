const BASE_PATH = "http://localhost";
const PORT = 4000;
const BASE_URL = `${BASE_PATH}:${PORT}`;

async function postForm(formData, endpoint) {
  const url = `${BASE_URL}/${endpoint}`;
  const headers = {
    "content-type": "application/json",
  };
  const options = {
    method: "POST",
    body: JSON.stringify(formData),
    headers,
  };
  const response = await fetch(url, options);

  const returnData = await response.json();
  returnData.status = response.status;

  return returnData;
}

export { postForm };
