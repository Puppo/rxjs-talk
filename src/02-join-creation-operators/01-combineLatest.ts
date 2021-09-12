/**
marble combineLatest
{
    source a:               +-1-2-3-4-5-|
    source b:               +----6----7----8----9----(10)-|
    operator combineLatest: +----{2,6}{3,6}-{4,6}-{4,7}{5,7}---{5,8}----{5,9}----{5,10}|
}
*/
import { combineLatest, Observer } from "rxjs";
import { source1$, source2$ } from "./00-shared";

const observer: Observer<[number, number]> = {
  next: value =>
    console.log(`${new Date().toLocaleTimeString()} - next: `, value),
  error: error => console.error("error: ", error),
  complete: () => console.info("complete"),
};

function combineLatestExample() {
  console.log(`${new Date().toLocaleTimeString()} - combineLatest started`);
  const observable = combineLatest([source1$, source2$]);

  observable.subscribe(observer);
}

document
  .querySelector('[data-btn="combineLatest"]')!
  .addEventListener("click", combineLatestExample);
