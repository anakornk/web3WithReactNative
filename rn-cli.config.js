// rn-cli.config.js
const nodeLibs = require('node-libs-react-native');
nodeLibs.vm  = require.resolve('vm-browserify');

module.exports = {
  resolver: {
    extraNodeModules: nodeLibs
  },
};