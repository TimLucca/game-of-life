(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/rust_gol.js":
/*!**************************!*\
  !*** ../pkg/rust_gol.js ***!
  \**************************/
/*! exports provided: greet, Cell, Universe, __wbg_alert_98a08724cf60f0ba, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"greet\", function() { return greet; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Cell\", function() { return Cell; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Universe\", function() { return Universe; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_alert_98a08724cf60f0ba\", function() { return __wbg_alert_98a08724cf60f0ba; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _rust_gol_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rust_gol_bg.wasm */ \"../pkg/rust_gol_bg.wasm\");\n\n\nlet cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachegetUint8Memory0 = null;\nfunction getUint8Memory0() {\n    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _rust_gol_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory0 = new Uint8Array(_rust_gol_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nlet WASM_VECTOR_LEN = 0;\n\nlet cachedTextEncoder = new TextEncoder('utf-8');\n\nconst encodeString = (typeof cachedTextEncoder.encodeInto === 'function'\n    ? function (arg, view) {\n    return cachedTextEncoder.encodeInto(arg, view);\n}\n    : function (arg, view) {\n    const buf = cachedTextEncoder.encode(arg);\n    view.set(buf);\n    return {\n        read: arg.length,\n        written: buf.length\n    };\n});\n\nfunction passStringToWasm0(arg, malloc, realloc) {\n\n    if (realloc === undefined) {\n        const buf = cachedTextEncoder.encode(arg);\n        const ptr = malloc(buf.length);\n        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);\n        WASM_VECTOR_LEN = buf.length;\n        return ptr;\n    }\n\n    let len = arg.length;\n    let ptr = malloc(len);\n\n    const mem = getUint8Memory0();\n\n    let offset = 0;\n\n    for (; offset < len; offset++) {\n        const code = arg.charCodeAt(offset);\n        if (code > 0x7F) break;\n        mem[ptr + offset] = code;\n    }\n\n    if (offset !== len) {\n        if (offset !== 0) {\n            arg = arg.slice(offset);\n        }\n        ptr = realloc(ptr, len, len = offset + arg.length * 3);\n        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);\n        const ret = encodeString(arg, view);\n\n        offset += ret.written;\n    }\n\n    WASM_VECTOR_LEN = offset;\n    return ptr;\n}\n/**\n* @param {string} s\n*/\nfunction greet(s) {\n    var ptr0 = passStringToWasm0(s, _rust_gol_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"], _rust_gol_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"]);\n    var len0 = WASM_VECTOR_LEN;\n    _rust_gol_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"greet\"](ptr0, len0);\n}\n\n/**\n*/\nconst Cell = Object.freeze({ Dead:0,Alive:1, });\n/**\n*/\nclass Universe {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Universe.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        _rust_gol_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_universe_free\"](ptr);\n    }\n    /**\n    */\n    tick() {\n        _rust_gol_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_tick\"](this.ptr);\n    }\n    /**\n    * @returns {Universe}\n    */\n    static new() {\n        var ret = _rust_gol_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_new\"]();\n        return Universe.__wrap(ret);\n    }\n    /**\n    * @returns {number}\n    */\n    width() {\n        var ret = _rust_gol_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_width\"](this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    height() {\n        var ret = _rust_gol_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_height\"](this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @param {number} width\n    */\n    set_width(width) {\n        _rust_gol_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_set_width\"](this.ptr, width);\n    }\n    /**\n    * @param {number} height\n    */\n    set_height(height) {\n        _rust_gol_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_set_height\"](this.ptr, height);\n    }\n    /**\n    * @param {number} row\n    * @param {number} column\n    */\n    toggle_cell(row, column) {\n        _rust_gol_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_toggle_cell\"](this.ptr, row, column);\n    }\n    /**\n    * @returns {number}\n    */\n    cells() {\n        var ret = _rust_gol_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_cells\"](this.ptr);\n        return ret;\n    }\n}\n\nconst __wbg_alert_98a08724cf60f0ba = function(arg0, arg1) {\n    alert(getStringFromWasm0(arg0, arg1));\n};\n\nconst __wbindgen_throw = function(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n\n//# sourceURL=webpack:///../pkg/rust_gol.js?");

/***/ }),

/***/ "../pkg/rust_gol_bg.wasm":
/*!*******************************!*\
  !*** ../pkg/rust_gol_bg.wasm ***!
  \*******************************/
/*! exports provided: memory, greet, __wbg_universe_free, universe_tick, universe_new, universe_width, universe_height, universe_set_width, universe_set_height, universe_toggle_cell, universe_cells, __wbindgen_malloc, __wbindgen_realloc */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./rust_gol.js */ \"../pkg/rust_gol.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/rust_gol_bg.wasm?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rust_gol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rust-gol */ \"../pkg/rust_gol.js\");\n/* harmony import */ var rust_gol_rust_gol_bg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rust-gol/rust_gol_bg */ \"../pkg/rust_gol_bg.wasm\");\n\r\n\r\n\r\n// greet(\"Play the game\");\r\nconst toggle = document.getElementById(\"toggle\")\r\nconst canvas = document.getElementById(\"game-of-life-canvas\");\r\nconst universe = rust_gol__WEBPACK_IMPORTED_MODULE_0__[\"Universe\"].new();\r\nconst width = universe.width();\r\nconst height = universe.height();\r\n\r\nconst CELL_SIZE = 35; // px\r\nconst GRID_COLOR = \"#CCCCCC\";\r\nconst DEAD_COLOR = \"#FFFFFF\";\r\nconst ALIVE_COLOR = \"#000000\";\r\n\r\ncanvas.height = (CELL_SIZE + 1) * height + 1;\r\ncanvas.width = (CELL_SIZE + 1) * width + 1;\r\n\r\nconst ctx = canvas.getContext('2d');\r\n\r\nvar run = false;\r\n\r\nconst slider = document.getElementById(\"speed\");\r\nconst output = document.getElementById(\"fps\");\r\noutput.innerHTML = slider.value;\r\n\r\nslider.oninput = () => {\r\n  output.innerHTML = slider.value;\r\n}\r\n\r\nconst getIndex = (row, column) => {\r\n  return row * width + column;\r\n};\r\n\r\nconst renderLoop = () => {\r\n  if (run == false) {\r\n    return;\r\n  }\r\n  universe.tick();\r\n  drawGrid();\r\n  drawCells();\r\n  sleep(1000 / slider.value).then(() => {\r\n    requestAnimationFrame(renderLoop);\r\n  });\r\n};\r\n\r\nconst bitIsSet = (n, arr) => {\r\n  const byte = Math.floor(n / 8);\r\n  const mask = 1 << (n % 8);\r\n  return (arr[byte] & mask) === mask;\r\n};\r\n\r\nconst drawGrid = () => {\r\n  ctx.beginPath();\r\n  ctx.strokeStyle = GRID_COLOR;\r\n\r\n  for (let i = 0; i <= width; i++) {\r\n    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);\r\n    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);\r\n  }\r\n\r\n  for (let j = 0; j <= height; j++) {\r\n    ctx.moveTo(0, j* (CELL_SIZE + 1) + 1);\r\n    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);\r\n  }\r\n\r\n  ctx.stroke();\r\n};\r\n\r\nconst drawCells = () => {\r\n  const cellsPtr = universe.cells();\r\n  const cells = new Uint8Array(rust_gol_rust_gol_bg__WEBPACK_IMPORTED_MODULE_1__[\"memory\"].buffer, cellsPtr, width * height / 8);\r\n\r\n  ctx.beginPath();\r\n\r\n  for (let row = 0; row < height; row++) {\r\n    for (let col = 0; col < width; col++) {\r\n      const index = getIndex(row, col);\r\n\r\n      ctx.fillStyle = bitIsSet(index, cells) ? ALIVE_COLOR : DEAD_COLOR;\r\n\r\n      ctx.fillRect(\r\n        col * (CELL_SIZE + 1) + 1,\r\n        row * (CELL_SIZE + 1) + 1,\r\n        CELL_SIZE,\r\n        CELL_SIZE\r\n      );\r\n    }\r\n  }\r\n  ctx.stroke();\r\n};\r\n\r\ndrawGrid();\r\n\r\ntoggle.onclick = () => {\r\n  if(run===false) {\r\n    run = true;\r\n    requestAnimationFrame(renderLoop);\r\n    toggle.textContent = \"Stop\";\r\n  } else {\r\n    run = false;\r\n    toggle.textContent = \"Start\";\r\n  }\r\n};\r\n\r\ncanvas.addEventListener(\"click\", e => {\r\n  const boundingRect = canvas.getBoundingClientRect();\r\n  const scaleX = canvas.width / boundingRect.width;\r\n  const scaleY = canvas.height / boundingRect.height;\r\n  const canvasLeft = (e.clientX - boundingRect.left) * scaleX;\r\n  const canvasTop = (e.clientY - boundingRect.top) * scaleY;\r\n  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);\r\n  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);\r\n\r\n  universe.toggle_cell(row, col);\r\n\r\n  drawGrid();\r\n  drawCells();\r\n})\r\n\r\nconst sleep = (milliseconds) => {\r\n  return new Promise(resolve => setTimeout(resolve, milliseconds))\r\n};\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

}]);