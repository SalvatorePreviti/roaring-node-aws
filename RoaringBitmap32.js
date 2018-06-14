const isAWS = require('./lib/is-aws')
module.exports = require(isAWS ? './lib/roaring-aws/RoaringBitmap32' : 'roaring/RoaringBitmap32')