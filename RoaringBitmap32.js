const isLambda = require('./lib/is-lambda')
module.exports = require(isLambda ? './lib/roaring-aws/RoaringBitmap32' : 'roaring/RoaringBitmap32')