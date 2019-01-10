// Does not work for android, comment out for now.
// import { URL, URLSearchParams } from "whatwg-url";
// global.URL = URL;
// global.URLSearchParams = URLSearchParams;

import url from "url";
global.URL = class URL {
  constructor(inputUrl) {
    return url.parse(inputUrl);
  }
};


if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str, 'binary').toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString('binary');
  };
}