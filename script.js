const apiKey = `VXdQfznzMFbMFydjxA4Debd6GqVIu93rMXeZWPN9`;
const image = document.getElementById("image");
const infoTitle = document.getElementById("title");
const info = document.getElementById("info");
const heading = document.getElementById("heading");
const form = document.getElementById("search-form");
const list = document.getElementById("search-history");

localStorage.setItem("searches", JSON.stringify([]));

list.addEventListener("click", function (event) {
   if (event.target.nodeName === "LI") {
      getImageOfTheDay(event.target.textContent, true);
   }
});

form.addEventListener("submit", (e) => {
   e.preventDefault();
   getImageOfTheDay(e);
});

(async function getCurrentImageOfTheDay() {
   const currentDate = new Date().toISOString().split("T")[0];
   const promise = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`
   );
   const res = await promise.json();
   image.setAttribute("src", `${res.url}`);
   heading.innerText = "NASA Picture Of The Day";
   infoTitle.innerText = res.title;
   info.innerText = res.explanation;
})();

async function getImageOfTheDay(e, flag = false) {
   let date;
   if (flag === true) {
      date = e;
   } else {
      date = e.target[0].value;
   }
   const promise = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
   );
   const res = await promise.json();
   image.setAttribute("src", `${res.url}`);
   heading.innerText = `Picture on ${date}`;
   infoTitle.innerText = res.title;
   info.innerText = res.explanation;
   if (flag === false) {
      saveSearch(date);
   }
}

function saveSearch(date) {
   let searchArr = JSON.parse(localStorage.getItem("searches"));
   let dateSearch = {
      date,
   };
   searchArr.push(dateSearch);
   localStorage.setItem("searches", JSON.stringify(searchArr));
   addSearchToHistory(date);
}

function addSearchToHistory(date) {
   const li = document.createElement("li");
   li.innerText = date;
   list.appendChild(li);
}
