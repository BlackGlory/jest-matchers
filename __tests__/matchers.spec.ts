import '@src/matchers'
import { Readable, Writable } from 'stream'
import * as path from 'path'

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

describe('expect(received).toBeNodeJSReadableStream()', () => {
  it('pass', () => {
    const target = new Readable()

    expect(target).toBeNodeJSReadableStream()
  })

  it('not pass', () => {
    const target = new Writable()

    expect(target).not.toBeNodeJSReadableStream()
  })
})

describe('expect(received).toBeNodeJSWritableStream()', () => {
  it('pass', () => {
    const target = new Writable()

    expect(target).toBeNodeJSWritableStream()
  })

  it('not pass', () => {
    const target = new Readable()

    expect(target).not.toBeNodeJSWritableStream()
  })
})

describe('expect(received).toBeJson()', () => {
  it('pass', () => {
    const target = {}

    expect(target).toBeJson()
  })

  it('not pass', () => {
    const target: any = {}
    target.circularStrucure = target

    expect(target).not.toBeJson()
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

describe('expect(value).toMatchJson(filename)', () => {
  it('pass', () => {
    const target = { "key": "value" }

    expect(target).toMatchJson(file('./to-match-json.json'))
  })

  it('not pass', () => {
    const target = { "target": "target" }

    expect(target).not.toMatchJson(file('./to-match-json.json'))
  })
})

describe('expect(value).toMatchJsonSnapshot(filename)', () => {
  it('pass', () => {
    const target = { "key": "value" }

    expect(target).toMatchJsonSnapshot(file('./to-match-json-snapshot.json'))
  })

  it('not pass', () => {
    const target = { "target": "target" }

    expect(target).not.toMatchJsonSnapshot(file('./to-match-json-snapshot.json'))
  })
})

function file(filename: string): string {
  return path.join(__dirname, filename)
}
