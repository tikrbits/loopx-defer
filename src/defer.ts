export class Defer<T> implements Promise<T> {
  private _promise: Promise<T>;
  private _resolve: (value?: T | PromiseLike<T>) => void;
  private _reject: (reason?: any) => void;

  constructor() {
    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  get resolve() {
    return this._resolve;
  }

  get reject() {
    return this._reject;
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null,
  ): Promise<TResult1 | TResult2> {
    return this._promise.then(onfulfilled, onrejected);
  }

  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | PromiseLike<TResult>)
      | undefined
      | null,
  ): Promise<T | TResult> {
    return this._promise.catch(onrejected);
  }

  finally(onfinally?: (() => void) | null | undefined): Promise<T> {
    return this._promise.finally(onfinally);
  }

  get [Symbol.toStringTag]() {
    return 'Promise';
  }
}
