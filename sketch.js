const searchText = "transparent kawaii dance";
let gif;
let webcam;
let query;
let offset = 1;
let result = false;
let dragging = false;

function setup() {
  createCanvas(400, 300);
  webcam = createCapture(VIDEO);
  webcam.hide();
  gif = createImg("https://media.giphy.com/media/IUu7swWWXfeyk/giphy.gif");
  query =
    "https://api.giphy.com/v1/gifs/search?api_key=" +
    giphyAPIKey +
    "&q=" +
    encodeURI(searchText) +
    "&limit=1";
  fetch(query)
    .then((response) => response.json())
    .then((data) => (result = data));
  webcam.position(0, 0);
  webcam.size(400, 300);
  gif.size(130, 130);
  gif.position(230, 120);
}

function draw() {
  background(220);
  image(webcam, 0, 0);
  gif.mousePressed(() => (dragging = true));
  if (dragging) {
    gif.position(mouseX - 65, mouseY - 65);
  }
  showSource();
}

function mouseReleased() {
  dragging = false;
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    gif.hide();
    offset = Math.ceil(Math.random() * 100);
    query =
      "https://api.giphy.com/v1/gifs/search?api_key=" +
      giphyAPIKey +
      "&q=" +
      encodeURI(searchText) +
      "&limit=1&offset=" +
      offset;
    fetch(query)
      .then((response) => response.json())
      .then((data) => (result = data))
      .then((gif = createImg(result["data"][0]["images"]["original"].url)));

    //result = httpGet(query);
    gif.size(130, 130);
    gif.position(230, 120);
    gif.show();
  } else if (keyCode == DOWN_ARROW) {
    gif.hide();
  }
}

function showSource() {
  if (result != false) {
    // document.querySelector(".giphy-src").innerHTML = "Hei der!";
    // "<a href='" + result["data"][0].url + "'>Powered By GIPHY</a>";
    link = createA(result["data"][0].url, "Powered By GIPHY");
    link.position(5, height + 15);
  }
}
