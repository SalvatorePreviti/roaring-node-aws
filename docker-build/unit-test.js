/* eslint no-console:0 global-require:0 */

const chai = require('chai')

global.expect = chai.expect
global.assert = chai.assert

global.describe = function describe(title, action) {
  console.log(`${title}:`)
  action()
}

global.it = function it(title, action) {
  console.log(`  ${title}:`)
  action()
  console.log('    ok.')
}

const tests = ['./test/roaring.test', './test/RoaringBitmap32.test', './test/RoaringBitmap32Iterator.test.js']

function runTests() {
  delete require.cache[require.resolve('roaring')]
  delete require.cache[require.resolve('roaring/lib/getRoaring')]
  delete require.cache[require.resolve('roaring/lib/instructionSet')]
  delete require.cache[require.resolve('roaring/lib/moduleExists')]
  delete require.cache[require.resolve('roaring/RoaringBitmap32')]
  delete require.cache[require.resolve('roaring/RoaringBitmap32Iterator')]
  for (const test of tests) {
    delete require.cache[require.resolve(test)]
    require(test)
  }
}

const instructionSet = require('roaring/lib/instructionSet')

console.log('* PLAIN\n')
process.env.ROARING_DISABLE_SSE42 = 'true'
process.env.ROARING_DISABLE_AVX2 = 'true'
process.env.ROARING_TEST_EXPECTED_CPU = 'PLAIN'
runTests()

console.log()
if (instructionSet === 'AVX2') {
  console.log('* AVX2\n')
  process.env.ROARING_DISABLE_SSE42 = 'false'
  process.env.ROARING_DISABLE_AVX2 = 'false'
  process.env.ROARING_TEST_EXPECTED_CPU = 'AVX2'
  runTests()
} else {
  console.log('- AVX2 not supported. Skipped.')
}

console.log()
if (instructionSet === 'AVX2' || instructionSet === 'SSE42') {
  console.log('* SSE4\n')
  process.env.ROARING_DISABLE_SSE42 = 'false'
  process.env.ROARING_DISABLE_AVX2 = 'true'
  process.env.ROARING_TEST_EXPECTED_CPU = 'SSE42'
  runTests()
} else {
  console.log('- SSE4 not supported. Skipped.')
}

console.log()
console.log('* All test OK.\n')
