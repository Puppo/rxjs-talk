import { fromEvent, Observer } from 'rxjs';

const observer: Observer<Event> = {
    next: (value) => console.log('next: ', value, value.target),
    error: (error) => console.error('error: ', error),
    complete: () => console.info('complete'),
  }

const observable = fromEvent(document.querySelector('[data-btn="fromEvent"]'), 'click')

observable.subscribe(observer);