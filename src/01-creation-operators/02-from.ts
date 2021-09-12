import { from, Observer } from "rxjs";

function fromExample() {
  const observer: Observer<unknown> = {
    next: value => console.log("next: ", value),
    error: error => console.error("error: ", error),
    complete: () => console.info("complete"),
  };

  console.log("from start");
  const observable = from(
    fetch("https://run.mocky.io/v3/948cd9f0-b26c-4342-9262-687b32430062").then(
      response => response.json()
    )
  ); // arrays or iterators too

  observable.subscribe(observer);
  console.log("from end");
}

document
  .querySelector('[data-btn="from"]')!
  .addEventListener("click", fromExample);
