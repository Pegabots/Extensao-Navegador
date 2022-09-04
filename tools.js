/**
 * Performs an API get to the given URL
 * Deals with possible errors and converts the result
 * 
 * @param url get request path 
 * @returns response as an javascript object
 */
export async function apiGet(url) {
  const pegaBotRequest = new Request(url);
  
  const response = await fetch(pegaBotRequest)
  
  if (!response.ok) {
    throw new Error('HTTP Error!');
  }

  return await response.json();
}
  