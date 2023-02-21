import createList from "./createList.js";

const input = document.getElementById("url-input");
const button = document.getElementById("btn");

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
}); 

button.addEventListener("click", async () => {
  const res = await fetch("http://localhost:3000/addUrl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "addurl": input.value,
    },
    mode: "same-origin",
    body: JSON.stringify({ url: input.value }),
  }).then((response) => response.json());

  if (res.error) {
    alert(res.error);
    return;
  }

  createList(res.url, res.shortenUrl);

  input.value = "";
});
