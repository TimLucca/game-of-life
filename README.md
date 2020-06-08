# Game of Life
A derivative of [this guide](https://rustwasm.github.io/book/game-of-life)

## Play now
[The live deployment can be accessed here ](https://timlucca.dev/game-of-life/)

## Building and Running
Follow this guid if you want to build and run it yourself.
Note: This project assumes you have [rust](https://www.rust-lang.org/tools/install) and [npm](https://www.npmjs.com/get-npm) installed already.

1. Install the [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
2. Use the command `wasm-pack build` in the root directory to build the Rust code
3. Navigate to the `www` folder (`cd www`) and use the command `npm install` to install the JavaScript dependencies
4. In the `www` folder, use the command `npm run start`.
5. In your browser, enter `localhost:8080` as the url
6. Play the game!