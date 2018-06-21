const RoaringBitmap32Iterator = require('roaring/RoaringBitmap32Iterator')
const RoaringBitmap32 = require('roaring/RoaringBitmap32')

describe('RoaringBitmap32Iterator import', () => {
  it('exports itself correctly with a "default" property', () => {
    expect(RoaringBitmap32Iterator === require('roaring').RoaringBitmap32Iterator).to.equal(true)
    expect(RoaringBitmap32Iterator === RoaringBitmap32Iterator.default).to.equal(true)
  })

  it('is a class', () => {
    expect(typeof RoaringBitmap32Iterator).to.equal('function')
    expect(RoaringBitmap32Iterator.prototype.constructor === RoaringBitmap32Iterator).to.equal(true)
  })
})

describe('RoaringBitmap32Iterator', () => {
  describe('constructor', () => {
    it('is a class', () => {
      expect(typeof RoaringBitmap32).to.equal('function')
    })

    it('creates an empty iterator with no arguments', () => {
      const iter = new RoaringBitmap32Iterator()
      expect(iter instanceof RoaringBitmap32Iterator).to.equal(true)
    })

    it('creates an iterator with a RoaringBitmap32', () => {
      const bitmap = new RoaringBitmap32([3, 4, 5])
      const iter = new RoaringBitmap32Iterator(bitmap)
      expect(iter instanceof RoaringBitmap32Iterator).to.equal(true)
    })

    it('throws an exception if called with a non RoaringBitmap32', () => {
      expect(() => new RoaringBitmap32Iterator(123)).to.throw()
      expect(() => new RoaringBitmap32Iterator([123])).to.throw()
    })
  })

  describe('next', () => {
    it('is a function', () => {
      const iter = new RoaringBitmap32Iterator()
      expect(typeof iter.next).to.equal('function')
    })

    it('returns an empty result if iterator is created without arguments', () => {
      const iter = new RoaringBitmap32Iterator()
      expect(iter.next()).to.deep.equal({ value: undefined, done: true })
      expect(iter.next()).to.deep.equal({ value: undefined, done: true })
    })

    it('returns an empty result if iterator is created with an empty RoaringBitmap32', () => {
      const iter = new RoaringBitmap32Iterator(new RoaringBitmap32())
      expect(iter.next()).to.deep.equal({ value: undefined, done: true })
      expect(iter.next()).to.deep.equal({ value: undefined, done: true })
    })

    it('allows iterating a small array', () => {
      const iter = new RoaringBitmap32Iterator(new RoaringBitmap32([123, 456, 999, 1000]))
      expect(iter.next()).to.deep.equal({ value: 123, done: false })
      expect(iter.next()).to.deep.equal({ value: 456, done: false })
      expect(iter.next()).to.deep.equal({ value: 999, done: false })
      expect(iter.next()).to.deep.equal({ value: 1000, done: false })
      expect(iter.next()).to.deep.equal({ value: undefined, done: true })
      expect(iter.next()).to.deep.equal({ value: undefined, done: true })
      expect(iter.next()).to.deep.equal({ value: undefined, done: true })
    })
  })

  describe('Symbol.iterator', () => {
    it('is a function', () => {
      const iter = new RoaringBitmap32Iterator()
      expect(typeof iter[Symbol.iterator]).to.equal('function')
    })

    it('returns this', () => {
      const iter = new RoaringBitmap32Iterator()
      expect(iter[Symbol.iterator]()).to.equal(iter)
    })

    it('allows foreach (empty)', () => {
      const iter = new RoaringBitmap32Iterator()
      for (const x of iter) {
        throw new Error(`Should be empty but ${x} found`)
      }
    })

    it('allows foreach (small array)', () => {
      const iter = new RoaringBitmap32Iterator(new RoaringBitmap32([123, 456, 789]))
      const values = []
      for (const x of iter) {
        values.push(x)
      }
      expect(values).to.deep.equal([123, 456, 789])
    })

    it('allows Array.from', () => {
      const iter = new RoaringBitmap32Iterator(new RoaringBitmap32([123, 456, 789]))
      const values = Array.from(iter)
      expect(values).to.deep.equal([123, 456, 789])
    })
  })

  describe('RoaringBitmap32 iterable', () => {
    it('returns a RoaringBitmap32Iterator', () => {
      const bitmap = new RoaringBitmap32()
      const iterator = bitmap[Symbol.iterator]()
      expect(iterator instanceof RoaringBitmap32Iterator).to.equal(true)
      expect(typeof iterator.next).to.equal('function')
    })

    it('returns an empty iterator for an empty bitmap', () => {
      const bitmap = new RoaringBitmap32()
      const iterator = bitmap[Symbol.iterator]()
      expect(iterator.next()).to.deep.equal({ done: true, value: undefined })
      expect(iterator.next()).to.deep.equal({ done: true, value: undefined })
    })
    it('iterates a non empty bitmap', () => {
      const bitmap = new RoaringBitmap32([0xffffffff, 3])
      const iterator = bitmap[Symbol.iterator]()
      expect(iterator.next()).to.deep.equal({ done: false, value: 3 })
      expect(iterator.next()).to.deep.equal({ done: false, value: 0xffffffff })
      expect(iterator.next()).to.deep.equal({ done: true, value: undefined })
    })
  })
})
