const isAWS = require('./lib/is-aws')
module.exports = require(isAWS ? './lib/roaring-aws/index' : 'roaring')
module.exports.isAWS = isAWS