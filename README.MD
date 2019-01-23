# Using Web3 1.x with React Native
A boilertemplate for using Web3 1.x with React Native

### Test Environment
```
node: v10.4.1
yarn: 1.12.3
react: 16.6.3
react-native: 0.57.8
web3: 1.0.0-beta.37

Operating System
iOS Simuator: iPhone X iOS 12.1
Android Simulator: AVD Nexus 5X API 27
```


## Setup
1. `git clone git@github.com:anakornk/web3WithReactNative.git`
2. `yarn install`
3. `ganache-cli`
4. `react-native run-ios` or `react-native run-android`

## Step By Step Guide
1. Create a new React Native Project
```
react-native init web3WithReactNative
```
2. Install Node core modules for React Native
```
yarn add node-libs-react-native
yarn add vm-browserify
```
3. In the project root directory, create `rn-cli.config.js`
```
const nodeLibs = require('node-libs-react-native');
nodeLibs.vm  = require.resolve('vm-browserify');

module.exports = {
  resolver: {
    extraNodeModules: nodeLibs
  },
};
```
4. In the project root directory, create `globals.js`  
```
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
```
5. At the top of `index.js`, import these modules
```
import 'node-libs-react-native/globals';
import './globals.js';
```
6. Install and Link `react-native-randombytes`
```
yarn add react-native-randombytes
react-native link
```
7. Install web3
```
yarn add web3
```
8. Import and Test web3  

In App.js, import web3.  
```
import Web3 from 'web3';
```
Add the following code inside your App React component. The code will print out information of the latest block and accounts
```
  componentWillMount() {
    this.web3  = new Web3('ws://localhost:8545');
    this.web3.eth.getBlock('latest').then(console.log).catch(console.log);
    this.web3.eth.getAccounts(function(error,res) {
      if(!error) {
        console.log(res);
      } else {
        console.log(error);
      }
    });
  }
```
9. Run
```
ganache-cli
react-native run-ios
```

## References
1. https://gist.github.com/dougbacelar/29e60920d8fa1982535247563eb63766
2. https://github.com/parshap/node-libs-react-native/issues/6
3. https://github.com/facebook/react-native/issues/16434

## Extra
1. The above code uses websocket provider, if you want to use http provider, you will need to edit a node_modules file since there's currently a problem with XMLHttpRequest. For more information, please see the link below:  
https://github.com/souldreamer/xhr2-cookies/issues/7
2. `vm-browserify` is not a RN-compatible polyfill for vm, but works for now. For more information, please see the link below:
https://github.com/parshap/node-libs-react-native/issues/6
