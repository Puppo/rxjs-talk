import { Observer, of } from 'rxjs';

function ofExample() {
  const observer: Observer<number | number[]> = {
    next: (value) => console.log('next: ', value),
    error: (error) => console.error('error: ', error),
    complete: () => console.info('complete'),
  }
  console.log('of start')
  const observable = of(1, 2, 3, 4, 5, [6, 7])

  observable.subscribe(observer);
  console.log('of end')
}

document.querySelector('[data-btn="of"]')!.addEventListener('click', ofExample);