/**
marble merge
{
    source a:               +-1-2-3-4-5-|
    source b:               +----6----7----8----9----(10)-|
    operator merge:         +-1-263-4-75---8----9----(10)-|
}
*/
import { merge, Observer } from "rxjs";
import { source1$, source2$ } from "./00-shared";

function mergeExample() {
  const observer: Observer<number> = {
    next: value =>
      console.log(`${new Date().toLocaleTimeString()} - next: `, value),
    error: error => console.error("error: ", error),
    complete: () => console.info("complete"),
  };

  const observable = merge(source1$, source2$);

  observable.subscribe(observer);
  console.log(`${new Date().toLocaleTimeString()} - merge started`);
}

document
  .querySelector('[data-btn="merge"]')!
  .addEventListener("click", mergeExample);
