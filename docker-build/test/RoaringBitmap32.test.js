const RoaringBitmap32 = require('roaring/RoaringBitmap32')

describe('RoaringBitmap32 import', () => {
  it('exports itself correctly with a "default" property', () => {
    expect(RoaringBitmap32 === require('roaring').RoaringBitmap32).to.equal(true)
    expect(RoaringBitmap32 === RoaringBitmap32.default).to.equal(true)
  })

  it('is a class', () => {
    expect(typeof RoaringBitmap32).to.equal('function')
    expect(RoaringBitmap32.prototype.constructor === RoaringBitmap32).to.equal(true)
  })

  it('can be called as a normal function', () => {
    const bitmap = RoaringBitmap32()
    expect(bitmap instanceof RoaringBitmap32).to.equal(true)
  })
})

describe('general tests', () => {
  it('allows adding 900 values', () => {
    const bitmap = new RoaringBitmap32()
    for (let i = 100; i < 1000; ++i) {
      bitmap.add(i)
    }
    expect(bitmap.size).to.equal(900)
    expect(bitmap.runOptimize()).to.equal(true)
    expect(bitmap.size).to.equal(900)
    expect(bitmap.minimum()).to.equal(100)
    expect(bitmap.maximum()).to.equal(999)
  })

  it('works with some "fancy" operations', () => {
    const rb1 = new RoaringBitmap32()
    rb1.add(1)
    rb1.add(2)
    rb1.add(3)
    rb1.add(4)
    rb1.add(5)
    rb1.add(100)
    rb1.add(1000)
    rb1.runOptimize()

    const rb2 = new RoaringBitmap32([3, 4, 1000])
    rb2.runOptimize()
    const rb3 = new RoaringBitmap32()

    expect(rb1.size).to.equal(7)
    expect(rb1.has(1)).to.equal(true)
    expect(rb1.has(3)).to.equal(true)

    expect(rb1.toString()).to.equal('RoaringBitmap32:7')
    expect(rb1.contentToString()).to.equal('[1,2,3,4,5,100,1000]')

    rb1.andInPlace(rb2)

    expect(rb1.has(1)).to.equal(false)
    expect(rb1.has(3)).to.equal(true)

    expect(rb1.toString()).to.equal('RoaringBitmap32:3')
    expect(rb1.contentToString()).to.equal('[3,4,1000]')

    rb3.add(5)
    rb3.orInPlace(rb1)

    expect(Array.from(rb3)).to.deep.equal([3, 4, 5, 1000])
    expect(rb3.toArray()).to.deep.equal([3, 4, 5, 1000])
    expect(Array.from(rb3.toUint32Array())).to.deep.equal([3, 4, 5, 1000])

    const rb4 = RoaringBitmap32.orMany(rb1, rb2, rb3)
    expect(rb4.toArray()).to.deep.equal([3, 4, 5, 1000])

    const serialized = rb1.serialize()
    const rb5 = RoaringBitmap32.deserialize(serialized)
    expect(rb5.isEqual(rb1)).to.equal(true)
    expect(rb1.isEqual(rb5)).to.equal(true)
    expect(rb5.toArray()).to.deep.equal(rb1.toArray())
  })
})
