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

export async function disconnectClient(mac, connection) {
  if (!connection) return;
  try {
    const users = await connection.write("/ip/hotspot/active/getall", { mac });
    console.log(users);
    const user = users.find((u) => u.mac === mac);
    console.log(user);

    if (user) {
      await connection.write("/ip/hotspot/active/disconnect", {
        ".id": user.id,
      });
      console.log(`Disconnected client ${mac}`);
    } else {
      console.log("Client not connected");
    }
  } catch (err) {
    console.error("Disconnect failed:", err);
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
