import { Observable, Observer } from 'rxjs';

const observer: Observer<string> = {
    next: (value: any) => console.log('next', value),
    error: (error: any) => console.error('error', error),
    complete: () => console.log('complete')
}

function simpleObservable() {
    console.log('simpleObservable start')
    const observable = new Observable((subscriber) => {
        subscriber.next("Hello from RxJS Talk!");
        subscriber.complete();
    })
    const subscription = observable.subscribe(observer);
    console.log('simpleObservable end')
}


function asyncObservable(){
    console.log('asyncObservable start')
    const observable = new Observable((subscriber) => {
        let count = 0;
        const id = setInterval(() => {
            const msg = `Hello from interval ${++count}!`
            console.warn(msg);
            subscriber.next(msg);
        }, 1000)

        return () => {
            console.log('cleanup')
            clearInterval(id);
            subscriber.complete();
        }
    })
    const subscription = observable.subscribe(observer)
    setTimeout(() => {
        subscription.unsubscribe()
    }, 10000)
    console.log('asyncObservable end')
}

function observableWithError() {
    console.log('observableWithError start')
    const observableError = new Observable((subscriber) => {
        subscriber.next("Hello from error!");
        subscriber.error(new Error("RxJS Talk!"));
        console.warn('after error')
        subscriber.next("The second hello from error!");
        subscriber.complete();
    })
    const subscriptionError = observableError.subscribe(observer)
    console.log('observableWithError end')
}

function multipleSubscriptions() {
    console.log('multipleSubscriptions start')
    const observable1 = new Observable((subscriber) => {
        let count = 0;
        const id = setInterval(() => {
            subscriber.next(`Hello from observable1 ${++count}!`);
        }, 1000)

        return () => {
            console.log('cleanup observable1')
            clearInterval(id);
            subscriber.complete();
        }
    })
    const observable2 = new Observable((subscriber) => {
        let count = 0;
        const id = setInterval(() => {
            subscriber.next(`Hello from observable2 ${++count}!`);
        }, 2000)

        return () => {
            console.log('cleanup observable2')
            clearInterval(id);
            subscriber.complete();
        }
    })
    const subscription = observable1.subscribe(observer);
    subscription.add(observable2.subscribe(observer));
    setTimeout(() => {
        subscription.unsubscribe();
    }, 5000)
    console.log('multipleSubscriptions end')
}

document.querySelector('[data-btn="simple-observable"]').addEventListener('click', simpleObservable)
document.querySelector('[data-btn="async-observable"]').addEventListener('click', asyncObservable)
document.querySelector('[data-btn="error-observable"]').addEventListener('click', observableWithError)
document.querySelector('[data-btn="multiple-subscription"]').addEventListener('click', multipleSubscriptions)