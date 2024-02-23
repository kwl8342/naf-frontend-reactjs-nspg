export const successResponses = [200, 201];

export async function handleResponse(response) {
  if (successResponses.includes(response.status)) {
    return response;
  } else {
    throw new Error('API Request Failed!');
  }
}
