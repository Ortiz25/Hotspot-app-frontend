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
