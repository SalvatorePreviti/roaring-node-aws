const roaring = require('roaring')

describe('roaring-require', () => {
  it('is an object', () => {
    expect(typeof roaring).to.equal('object')
  })

  it('exports itself with a "default" property', () => {
    expect(roaring === roaring.default).to.equal(true)
  })

  it('has RoaringBitmap32', () => {
    expect(typeof roaring.RoaringBitmap32).to.equal('function')
    expect(roaring.RoaringBitmap32 === require('roaring/RoaringBitmap32')).to.equal(true)
  })

  it('has RoaringBitmap32Iterator', () => {
    expect(typeof roaring.RoaringBitmap32Iterator).to.equal('function')
    expect(roaring.RoaringBitmap32Iterator === require('roaring/RoaringBitmap32Iterator')).to.equal(true)
  })

  it('has CRoaringVersion', () => {
    expect(typeof roaring.CRoaringVersion).to.equal('string')
    const values = roaring.CRoaringVersion.split('.')
    expect(values.length).to.equal(3)
    for (let i = 0; i < 3; ++i) {
      expect(Number.isInteger(Number.parseInt(values[i]))).to.equal(true)
    }
  })

  it('has roaring PackageVersion', () => {
    expect(typeof roaring.PackageVersion).to.equal('string')
    const values = roaring.CRoaringVersion.split('.')
    expect(values.length).to.equal(3)
    for (let i = 0; i < 3; ++i) {
      expect(Number.isInteger(Number.parseInt(values[i]))).to.equal(true)
    }
  })

  it('has AVX2 boolean property', () => {
    expect(typeof roaring.AVX2).to.equal('boolean')
  })

  it('has SSE42 boolean property', () => {
    expect(typeof roaring.SSE42).to.equal('boolean')
  })

  it('Active AVX2/SSE42 matches the expected value', () => {
    let architecture
    if (roaring.AVX2) {
      architecture = 'AVX2'
      expect(roaring.SSE42).to.equal(true)
    } else if (roaring.SSE42) {
      architecture = 'SSE42'
    } else {
      architecture = 'PLAIN'
    }

    if (process.env.ROARING_TEST_EXPECTED_CPU) {
      expect(architecture).to.equal(process.env.ROARING_TEST_EXPECTED_CPU)
    }
  })
})
