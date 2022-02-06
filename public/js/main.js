const socket = io.connect();

function sendProduct() {
  const title = document.querySelector("#title");
  const price = document.querySelector("#price");
  const thumbnail = document.querySelector("#thumbnail");

  socket.emit("newProduct", {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
  });
  return false;
}

function sendMessage() {
  const email = document.querySelector("#email");
  const date = new Date();
  const msg = document.querySelector("#msg");

  if (email.value) {
    socket.emit("newMsg", {
      email: email.value,
      date: date.toLocaleString(),
      msg: msg.value,
    });
  } else {
    alert("Debes ingresar un email");
  }
  return false;
}

socket.on("msgs", (msgs) => {
  let msgsHthml = "";

  msgs.forEach((msg) => {
    msgsHthml += `
    <div style="display: flex;">
      <p style="font-weight: bold; color: blue; padding: 2px;">${msg.email}</p>
      <p style="color: brown; padding: 2px;">[${msg.date}]</p>
      <p style="font-style: italic; color: green; padding: 2px;">${msg.msg}</p>
    </div>`;
  });

  document.getElementById("msgsContainer").innerHTML = msgsHthml;
});

socket.on("products", (products) => {
  let contProductHtml = "";

  products.forEach((product) => {
    contProductHtml += `
    <tr>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>
            <img src="${product.thumbnail}" width="60px" height="60px" />
        </td>
    </tr>`;
  });

  document.getElementById("productContainer").innerHTML = contProductHtml;
});
