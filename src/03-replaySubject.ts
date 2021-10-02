/**
marble replaySubject
{
    source a:                       +-1-2-3-4-5-6-7-8-9-(10)-|
    operator replaySubject:   {
                                    ............+{1,2,3,4,5,6}7-8-9-(10)-|
                                    ......+{1,2,3,4}-5-6-7-8-9-(10)-|
                                }
}
*/
import { ReplaySubject } from "rxjs";
import { source$ } from "./00-shared";

function replaySubjectExample() {
  console.log(`replaySubject start`);
  const subject = new ReplaySubject<number>();
  const subject$ = subject.asObservable();

  source$.subscribe({
    next: value => subject.next(value),
    error: err => subject.error(err),
    complete: () => subject.complete(),
  });

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
  .querySelector("[data-btn=replaySubject]")
  .addEventListener("click", replaySubjectExample);
