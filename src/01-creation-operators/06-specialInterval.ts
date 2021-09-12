import { Observer, timer } from "rxjs";

function specialIntervalExample() {
  console.log(`${new Date().toLocaleTimeString()} - specialInterval start`)
  const observer: Observer<number | number[]> = {
    next: value => console.log(`${new Date().toLocaleTimeString()} - next: `, value),
    error: error => console.error("error: ", error),
    complete: () => console.info("complete"),
  };

  const observable = timer(1000, 3000);

  observable.subscribe(observer);
}

document
  .querySelector('[data-btn="special-interval"]')!
  .addEventListener("click", specialIntervalExample);
