import { Observable } from 'rxjs';

const observable = new Observable(observer => {
    observer.next("Hello from RxJS Talk!");
    observer.complete();
})

observable.subscribe(console.log);