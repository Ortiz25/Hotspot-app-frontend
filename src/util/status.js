const url = "https://jsonplaceholder.typicode.com/todos/1";

export const checkOnlineStatus = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false; // definitely offline
  }
};

export async function checkStatus(setOnline) {
  try {
    const urlStatus = "https://jsonplaceholder.typicode.com/todos/1";
    const responseStatus = await fetch(urlStatus);
    if (responseStatus.status === 200) {
      return setOnline(true);
    } else {
      return setOnline(false);
    }
  } catch (err) {
    return setOnline(false);
  }
}
