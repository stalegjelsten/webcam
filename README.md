# p5js GIPHY webcam feed

A p5.js site for showing your webcam feed with a Giphy GIF on top.

A [Giphy API Key](https://developers.giphy.com/docs/api/#quick-start-guide) is required to search GIPHY for a suitable GIFs.

## Setup

- Create a file named `secrets.js` in the root directory of the project
- Add the line `const giphyAPIKey = "REPLACE-ME-WITH-GIPHY-API-KEY";` to the file

## Usage

- Press 🔼 up to show GIF.
- Press 🔽 down to hide GIF
- Press ▶️ right to get new GIF
- Select what kinds of GIFs you want to show by entering a new search term in the input field (but it's probably good idea to include the keyword transparent)
- If you haven't provided your own `secrets.js` file, you can enter a Giphy API Key in the API key field.
