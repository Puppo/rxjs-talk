/**
marble concat
{
    source a:               +-1-2-3-4-5-|
    source b:               ............+----6----7----8----9----(10)-|
    operator concat:        +-1-2-3-4-5------6----7----8----9----(10)-|
}
*/
import { concat, Observer } from "rxjs";
import { source1$, source2$ } from "./00-shared";

function concatExample() {
  const observer: Observer<number> = {
    next: value =>
      console.log(`${new Date().toLocaleTimeString()} - next: `, value),
    error: error => console.error("error: ", error),
    complete: () => console.info("complete"),
  };

  console.log(`${new Date().toLocaleTimeString()} - concat started`);
  const observable = concat(source1$, source2$);

  observable.subscribe(observer);
}

document
  .querySelector('[data-btn="concat"]')!
  .addEventListener("click", concatExample);
