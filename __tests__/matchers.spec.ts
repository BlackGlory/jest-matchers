import '@src/matchers'

describe('toBeIterable()', () => {
  it('pass', () => {
    const target = (function* () {})()

    expect(target).toBeIterable()
  })

  it('not pass', () => {
    const target = 1

    expect(target).not.toBeIterable()
  })
})

describe('toBeAsyncIterable()', () => {
  it('pass', () => {
    const target = (async function* () {})()

    expect(target).toBeAsyncIterable()
  })

  it('not pass', () => {
    const target: string[] = []

    expect(target).not.toBeAsyncIterable()
  })
})

describe('toBePromise()', () => {
  it('pass', () => {
    const target = Promise.resolve()

    expect(target).toBePromise()
  })

  it('not pass', () => {
    const target = {}

    expect(target).not.toBePromise()
  })
})

describe('toBePromiseLike()', () => {
  it('pass', () => {
    const target = { then() { } }

    expect(target).toBePromiseLike()
  })

  it('not pass', () => {
    const target = {}

    expect(target).not.toBePromiseLike()
  })
})
