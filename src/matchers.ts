import { isIterable, isAsyncIterable, isJson } from '@blackglory/types'
import { isPromise, isPromiseLike } from 'extra-promise'
import { isNodeJSReadableStream, isNodeJSWritableStream } from 'extra-stream'
import diff from 'jest-diff'
import { readJsonSync, writeJsonSync, pathExistsSync } from 'fs-extra'

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
      toMatchJson(filename: string): R
      toMatchJsonSnapshot(filename: string): R
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
        message: () => `expected ${received} not to be a Json`
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
, toMatchJson(received: unknown, expected: string) {
    const filename = expected
    const json = readJsonSync(filename)

    if (this.equals(received, json)) {
      return {
        message: () => `expected ${received} not to match ${filename}`
      , pass: true
      }
    } else {
      return {
        message: () => `expected ${received} to match ${filename}\n${diff(received, json)}`
      , pass: false
      }
    }
  }
, toMatchJsonSnapshot(received: unknown, expected: string) {
    const filename = expected
    if (!pathExistsSync(filename)) writeJsonSync(filename, received, { spaces: 2 })
    const json = readJsonSync(filename)

    if (this.equals(received, json)) {
      return {
        message: () => `expected ${received} not to match ${filename}`
      , pass: true
      }
    } else {
      return {
        message: () => `expected ${received} to match ${filename}\n${diff(received, json)}`
      , pass: false
      }
    }
  }
})
