import { isIterable, isAsyncIterable, isPromise, isPromiseLike, isNodeJSReadableStream, isNodeJSWritableStream, isJson } from '@blackglory/types'

/* eslint-disable */
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeIterable(): R
      toBeAsyncIterable(): R
      toBePromise(): R
      toBePromiseLike(): R
      toBeNodeJSReadableStream(): R
      toBeNodeJSWritableStream(): R
      toBeJson(): R
      toBeResultOf(mocked: jest.MockInstance<unknown, unknown[]>): R
    }
  }
}
/* eslint-enable */

expect.extend({
  toBeIterable(received: unknown) {
    if (isIterable(received)) {
      return {
        message: () => `expected ${received} not to be a Iterable`
      , pass: true
      }
    } else {
      return {
        message: () => `expected ${received} to be a Iterable`
      , pass: false
      }
    }
  }
, toBeAsyncIterable(received: unknown) {
    if (isAsyncIterable(received)) {
      return {
        message: () => `expected ${received} not to be a AsyncIterable`
      , pass: true
      }
    } else {
      return {
        message: () => `expected ${received} to be a AsyncIterable`
      , pass: false
      }
    }
  }
, toBePromise(received: unknown) {
    if (isPromise(received)) {
      return {
        message: () => `expected ${received} not to be a Promise`
      , pass: true
      }
    } else {
      return {
        message: () => `expected ${received} to be a Promise`
      , pass: false
      }
    }
  }
, toBePromiseLike(received: unknown) {
    if (isPromiseLike(received)) {
      return {
        message: () => `expected ${received} not to be a PromiseLike`
      , pass: true
      }
    } else {
      return {
        message: () => `expected ${received} to be a PromiseLike`
      , pass: false
      }
    }
  }
, toBeNodeJSReadableStream(received: unknown) {
    if (isNodeJSReadableStream(received)) {
      return {
        message: () => `expected ${received} not to be a NodeJS.ReadableStream`
      , pass: true
      }
    } else {
      return {
        message: () => `expected ${received} to be a NodeJS.ReadableStream`
      , pass: false
      }
    }
  }
, toBeNodeJSWritableStream(received: unknown) {
    if (isNodeJSWritableStream(received)) {
      return {
        message: () => `expected ${received} not to be a NodeJS.WritableStream`
      , pass: true
      }
    } else {
      return {
        message: () => `expected ${received} to be a NodeJS.WritableStream`
      , pass: false
      }
    }
  }
, toBeJson(received: unknown) {
    if (isJson(received)) {
      return {
        message: () => `expected ${received} to be a Json`
      , pass: true
      }
    } else {
      return {
        message: () => `expected ${received} to be a Json`
      , pass: false
      }
    }
  }
  // https://github.com/facebook/jest/issues/10241
, toReturnWith(received: jest.MockInstance<unknown, unknown[]>, expected: unknown) {
    return {
      message: () => `expected ${received.mockName} to return with ${expected}`
    , pass: received.mock.results.some(result => result.value === expected)
    }
  }
, toBeResultOf(received: unknown, expected: jest.MockInstance<unknown, unknown[]>) {
    return {
      message: () => `expected ${received} to be a result of ${expected}`
    , pass: expected.mock.results.some(result => result.value === received)
    }
  }
})
