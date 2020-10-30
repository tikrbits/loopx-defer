# @loopx/defer

> Create a deferred promise

## Usage

### Promised delay

```typescript
import {Defer} from '@loopx/defer';

function delay(ms) {
  const deferred = new Defer();
  setTimeout(deferred.resolve, ms, '🦄');
  return deferred.promise;
}

(async () => {
  console.log(await delay(100));
  //=> '🦄'
})();
```

The above is just an example. Use delay if you need to
[delay](https://github.com/sindresorhus/delay) a promise.

### Testing for callback/event

You can write test cases more elegant with `@loopx/defer` for callback/event
testing

```typescript
class FakeStream extends EventEmitter {
  write(data: any, delays = 10) {
    setTimeout(() => this.emit('data', data), delays);
  }
}
describe('something', () => {
  it('should work with callbacks', async () => {
    const deferred = new Defer();
    const stream = new FakeStream();
    stream.once('data', deferred.resolve);
    stream.write('🦄');
    const data = await deferred;
    expect(data).equal('🦄');
  });
});
```

## API

### new Defer()

Returns a `promise` instance with `resolve()` and `reject()` functions.

## Related

- [Deferred that extends Promise](https://stackoverflow.com/a/44905352/14013251)
- [p-defer](https://github.com/sindresorhus/p-defer) - Create a deferred promise
