let searchText = "transparent kawaii dance";
let gif, webcam, query, input, button;
let offset = 1;
let result = false;
let dragging = false;

function setup() {
  createCanvas(400, 300);
  input = createInput("transparent ");
  input.position(5, height + 40);
  button = createButton("Søk");
  button.position(input.x + input.width, input.y);
  button.mousePressed(newQuery);
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
  gif.size(130, AUTO);
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

const newQuery = () => {
  searchText = input.value();
};

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
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
      .then((gif = createImg(result["data"][0]["images"]["original"].url)))
      .then(
        gif.size(
          130,
          Math.floor(
            (result["data"][0]["images"]["original"].height /
              result["data"][0]["images"]["original"].width) *
              130
          )
        )
      );

    //result = httpGet(query);

    gif.size(130, 130);
    gif.position(250, 150);
    gif.show();
  }
  if (keyCode == UP_ARROW) {
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
