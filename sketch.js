let searchText = "transparent kawaii dance";
let gif, webcam, query, giphySearchInput, searchButton;
let offset = 1;
let result = false;
let dragging = false;
if (typeof giphyAPIKey === "undefined") {
  var giphyAPIKey = "no-key";
}
// if (giphyAPIKey === undefined) {
//   let giphyAPIKey = "";
// }

const newQuery = () => {
  searchText = giphySearchInput.value();
};

function setup() {
  createCanvas(400, 300);
  giphySearchInput = createInput("transparent ");
  giphySearchInput.position(5, height + 40);
  apiKeyInput = createInput("GIPHY api key");
  apiKeyInput.position(
    giphySearchInput.x,
    giphySearchInput.y + giphySearchInput.height + 5
  );

  searchButton = createButton("Search");
  searchButton.position(
    giphySearchInput.x + giphySearchInput.width,
    giphySearchInput.y
  );
  searchButton.mousePressed(newQuery);

  useApiKeyButton = createButton("Save API key");
  useApiKeyButton.position(
    giphySearchInput.x + apiKeyInput.width,
    giphySearchInput.y + giphySearchInput.height + 5
  );
  useApiKeyButton.mousePressed(() => {
    giphyAPIKey = apiKeyInput.value();
  });
  webcam = createCapture(VIDEO);
  webcam.hide();
  gif = createImg("https://media.giphy.com/media/IUu7swWWXfeyk/giphy.gif");
  query =
    "https://api.giphy.com/v1/gifs/search?api_key=" +
    giphyAPIKey +
    "&q=" +
    encodeURI(searchText) +
    "&limit=1";
  if (giphyAPIKey !== "no-key") {
    fetch(query)
      .then((response) => response.json())
      .then((data) => (result = data));
  }
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
