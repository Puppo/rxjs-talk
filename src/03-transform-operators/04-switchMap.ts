/**
marble switchMap
{
    source a:           +--{1,0}--{2,2s}--{3,0}--{4,2s}--{5,0}--|
    operator switchMap:  +--1-----3-----5--|
}
*/
import { switchMap, tap, timer } from "rxjs";
import { mapTo } from "rxjs/operators";
import { observer, source$ } from "./00-shared";

function switchMapExample() {
  const observable = source$.pipe(
    tap(value => {
      console.log(
        `%c ${new Date().toLocaleTimeString()} emit value with index ${
          value.index
        }`,
        "color: #0000FF"
      );
    }),
    switchMap(({ index, delay }) => {
      console.log(
        `%c ${new Date().toLocaleTimeString()} start switchMap with index: ${index} with delay ${delay}`,
        "color: #FFA500"
      );
      return timer(delay).pipe(
        mapTo(index),
        tap(() => {
          console.log(
            `%c ${new Date().toLocaleTimeString()} end switchMap with index: ${index}`,
            "color: #00FF00"
          );
        })
      );
    })
  );

  observable.subscribe(observer);
  console.log(`${new Date().toLocaleTimeString()} - switchMap started`);
}

document
  .querySelector('[data-btn="switchMap"]')!
  .addEventListener("click", switchMapExample);
