/**
marble subject
{
    source a:           +-1-2-3-4-5-6-7-8-9-(10)-|
    operator subject:   {
                        ......+-4-5-6-7-8-9-(10)-|
                        ............+-7-8-9-(10)-|
                    }
}
*/
import { Subject } from "rxjs";
import { source$ } from "./00-shared";

function subjectExample() {
  console.log(`subject start`);
  const subject = new Subject<number>();
  const subject$ = subject.asObservable();

  source$.subscribe({
    next: value => subject.next(value),
    error: err => subject.error(err),
    complete: () => subject.complete(),
  });
  // .subscribe(subject); // short syntax

  setTimeout(() => {
    console.log(`%c sub1 start`, "color: green");
    subject$.subscribe({
      next: value => console.log(`%c sub1 next`, "color: green", value),
      complete: () => console.log(`%c sub1 complete`, "color: green"),
    });
  }, 4500);

  setTimeout(() => {
    console.log(`%c sub2 start`, "color: blue");
    subject$.subscribe({
      next: value => console.log(`%c sub2 next`, "color: blue", value),
      complete: () => console.log(`%c sub2 complete`, "color: blue"),
    });
  }, 7000);
}

document
  .querySelector("[data-btn=subject]")
  .addEventListener("click", subjectExample);
