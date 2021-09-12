/**
marble concatMap
{
    source a:           +--{1,0}      --{2,2s}--{3,0}--{4,2s}--{5,0}--|
    operator concatMap: +--1    --------2       3 -----4        5--|
}
*/

import { concatMap, tap, timer } from "rxjs";
import { mapTo } from "rxjs/operators";
import { observer, source$ } from "./00-shared";

function concatMapExample() {
  const observable = source$.pipe(
    tap(value => {
      console.log(
        `%c ${new Date().toLocaleTimeString()} emit value with index ${
          value.index
        }`,
        "color: #0000FF"
      );
    }),
    concatMap(({ index, delay }) => {
      console.log(
        `%c ${new Date().toLocaleTimeString()} start concatMap with index: ${index} with delay ${delay}`,
        "color: #FFA500"
      );
      return timer(delay).pipe(
        mapTo(index),
        tap(() => {
          console.log(
            `%c ${new Date().toLocaleTimeString()} end concatMap with index: ${index}`,
            "color: #00FF00"
          );
        })
      );
    })
  );

  observable.subscribe(observer);
  console.log(`${new Date().toLocaleTimeString()} - concatMap started`);
}

document
  .querySelector('[data-btn="concatMap"]')!
  .addEventListener("click", concatMapExample);
