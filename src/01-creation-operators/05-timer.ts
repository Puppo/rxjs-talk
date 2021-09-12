import { Observer, timer } from 'rxjs';

function timerExample() {
  console.log(`${new Date().toLocaleTimeString()} - timer start`)
  const observer: Observer<number | number[]> = {
    next: (value) => console.log(`${new Date().toLocaleTimeString()} - next: `, value),
    error: (error) => console.error('error: ', error),
    complete: () => console.info('complete'),
  }

  const observable = timer(1000);

  observable.subscribe(observer);
}

document.querySelector('[data-btn="timer"]')!.addEventListener('click', timerExample);