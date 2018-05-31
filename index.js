const isLambda = require('./lib/is-lambda')
module.exports = require(isLambda ? './lib/roaring-aws/index' : 'roaring')