/**
marble exhaustMap
{
    source a:            +--{1,0}      --{2,2s}--{3,0}--{4,2s}--{5,0}--|
    operator exhaustMap: +--1    --------2                    --5--|
}
*/
import { exhaustMap, tap, timer } from "rxjs";
import { mapTo } from "rxjs/operators";
import { observer, source$ } from "./00-shared";

function exhaustMapExample() {
  const observable = source$.pipe(
    tap(value => {
      console.log(
        `%c ${new Date().toLocaleTimeString()} emit value with index ${
          value.index
        }`,
        "color: #0000FF"
      );
    }),
    exhaustMap(({ index, delay }) => {
      console.log(
        `%c ${new Date().toLocaleTimeString()} start exhaustMap with index: ${index} with delay ${delay}`,
        "color: #FFA500"
      );
      return timer(delay).pipe(
        mapTo(index),
        tap(() => {
          console.log(
            `%c ${new Date().toLocaleTimeString()} end exhaustMap with index: ${index}`,
            "color: #00FF00"
          );
        })
      );
    })
  );

  observable.subscribe(observer);
  console.log(`${new Date().toLocaleTimeString()} - exhaustMap started`);
}

document
  .querySelector('[data-btn="exhaustMap"]')!
  .addEventListener("click", exhaustMapExample);
