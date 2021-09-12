/**
marble forkJoin
{
    source a:               +-1-2-3-4-5-|
    source b:               +----6----7----8----9----(10)-|
    operator forkJoin:      +------------------------{5,10}|
}
*/
import { forkJoin, Observer } from "rxjs";
import { source1$, source2$ } from "./00-shared";

function forkJoinExample() {
  const observer: Observer<[number, number]> = {
    next: value =>
      console.log(`${new Date().toLocaleTimeString()} - next: `, value),
    error: error => console.error("error: ", error),
    complete: () => console.info("complete"),
  };

  const observable = forkJoin([source1$, source2$]);

  observable.subscribe(observer);
  console.log(`${new Date().toLocaleTimeString()} - forkJoin started`);
}

document
  .querySelector('[data-btn="forkJoin"]')!
  .addEventListener("click", forkJoinExample);
