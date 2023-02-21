const list = document.getElementById("list");

const createList = (url, shorten) => {
  const li = document.createElement("li");
  li.innerHTML = `<p>${url} : ${shorten}</p>`;
  list.appendChild(li);
};

export default createList;
