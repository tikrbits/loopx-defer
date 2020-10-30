import {expect} from '@loopback/testlab';
import {EventEmitter} from 'events';
import {Defer} from '../defer';

const fixture = Symbol('fixture');

describe('defer', () => {
  it('toString should return [object Promise] ', () => {
    const deferred = new Defer();
    expect(deferred.toString()).equal('[object Promise]');
  });

  it('basic', async () => {
    expect(await delay(50)).equal(fixture);
  });

  it('then', async () => {
    const deferred = new Defer();
    const promise = deferred.then((val: any) => {
      expect(val).equal('🦄');
    });
    deferred.resolve('🦄');
    await promise;
  });

  it('catch', async () => {
    const deferred = new Defer();
    const promise = deferred.catch((reason: any) => {
      expect(reason).equal('💥');
    });
    deferred.reject('💥');
    await promise;
  });

  it('finally', async () => {
    const deferred = new Defer();
    let finallyHasBeenCalled = false;
    const promise = deferred.finally(() => {
      finallyHasBeenCalled = true;
    });
    deferred.resolve('🦄');
    await promise;
    expect(finallyHasBeenCalled).true();
  });

  it('should work with callbacks', async () => {
    const deferred = new Defer();
    const stream = new FakeStream();
    stream.once('data', deferred.resolve);
    stream.write('🦄');
    const data = await deferred;
    expect(data).equal('🦄');
  });
});

function delay(ms: number) {
  const deferred = new Defer();
  setTimeout(deferred.resolve, ms, fixture);
  return deferred;
}

class FakeStream extends EventEmitter {
  write(data: any, delays = 10) {
    setTimeout(() => this.emit('data', data), delays);
  }
}
