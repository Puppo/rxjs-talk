import { interval, Observer } from 'rxjs';

function intervalExample() {
  console.log(`${new Date().toLocaleTimeString()} - interval start`)
  const observer: Observer<number | number[]> = {
    next: (value) => console.log(`${new Date().toLocaleTimeString()} - next: `, value),
    error: (error) => console.error('error: ', error),
    complete: () => console.info('complete'),
  }

  const observable = interval(1000);

  observable.subscribe(observer);
}

document.querySelector('[data-btn="interval"]')!.addEventListener('click', intervalExample);