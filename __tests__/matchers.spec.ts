import '@src/matchers'

describe('expect(received).toBeIterable()', () => {
  it('pass', () => {
    const target = (function* () {})()

    expect(target).toBeIterable()
  })

  it('not pass', () => {
    const target = 1

    expect(target).not.toBeIterable()
  })
})

describe('expect(received).toBeAsyncIterable()', () => {
  it('pass', () => {
    const target = (async function* () {})()

    expect(target).toBeAsyncIterable()
  })

  it('not pass', () => {
    const target: string[] = []

    expect(target).not.toBeAsyncIterable()
  })
})

describe('expect(received).toBePromise()', () => {
  it('pass', () => {
    const target = Promise.resolve()

    expect(target).toBePromise()
  })

  it('not pass', () => {
    const target = {}

    expect(target).not.toBePromise()
  })
})

describe('expect(received).toBePromiseLike()', () => {
  it('pass', () => {
    const target = { then() { } }

    expect(target).toBePromiseLike()
  })

  it('not pass', () => {
    const target = {}

    expect(target).not.toBePromiseLike()
  })
})

// https://github.com/facebook/jest/issues/10241
describe('expect(mocked).toReturnWith(expected)', () => {
  it('pass', () => {
    const fn = jest.fn(countup)

    const result = fn()

    expect(fn).toReturnWith(result)
  })

  it('not pass', () => {
    const fn = jest.fn(countup)

    const result = countdown()

    expect(fn).not.toReturnWith(result)
  })

  function* countup() {
    for (let i = 0;;) yield i++
  }

  function * countdown() {
    for (let i = 0;;) yield i--
  }
})

describe('expect(value).toBeResultOf(mocked)', () => {
  it('pass', () => {
    const fn = jest.fn().mockReturnValue('value')

    const value = fn()

    expect(value).toBeResultOf(fn)
  })

  it('not pass', () => {
    const fn = jest.fn().mockReturnValue('value')

    const value = 'value'

    expect(value).not.toBeResultOf(fn)
  })
})
