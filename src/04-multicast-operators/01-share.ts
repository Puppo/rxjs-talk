import { Observable, share } from "rxjs";

const source$ = new Observable<number>(observer => {
  let counter = 0;
  const interval = setInterval(() => {
    if (counter < 10) {
      observer.next(counter++);
    } else {
      observer.complete();
      clearInterval(interval);
    }
  }, 1000);
  return () => clearInterval(interval);
});

function shareExample() {
  const shared$ = source$.pipe(share());

  shared$.subscribe({
    next: value => console.log(`%c Sub1: ${value}`, "color: orange"),
  });
  setTimeout(
    () =>
      shared$.subscribe({
        next: value => console.log(`%c Sub2: ${value}`, "color: blue"),
      }),
    5000
  );
}

document
  .querySelector('[data-btn="share"]')!
  .addEventListener("click", shareExample);
