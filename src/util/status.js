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

export async function disconnectClient(userId, axios, getHotspotUsers) {
  try {
    await axios.get("http://192.168.88.1/rest/ip/hotspot/active/disconnect", {
      params: {
        id: userId,
      },
      auth: {
        username: "admin",
        password: "m0t0m0t0",
      },
    });

    getHotspotUsers(); // refresh user list
  } catch (error) {
    console.log(error);
  }
}

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

export async function fetchData(setDataBalance, userData) {
  try {
    const url = "https://livecribauth.com/balance";
    const user = { userName: userData.userNumber };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    // console.log(data);
    if (data.message === "limit does not exist") {
      return;
    }

    const balance = data.bundleBalance / 1000000;
    setDataBalance(balance.toFixed(0));
  } catch (err) {
    console.log(err);
    return setDataBalance(0);
  }
}
