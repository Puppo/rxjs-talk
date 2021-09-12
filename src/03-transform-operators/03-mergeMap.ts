/**
marble mergeMap
{
    source a:           +--{1,0}--{2,2s}--{3,0}--{4,2s}--{5,0}--|
    operator mergeMap:  +--1-----3--2--5--4--|
}
*/
import { mergeMap, tap, timer } from "rxjs";
import { mapTo } from "rxjs/operators";
import { observer, source$ } from "./00-shared";

function mergeMapExample() {
  const observable = source$.pipe(
    tap(value => {
      console.log(
        `%c ${new Date().toLocaleTimeString()} emit value with index ${
          value.index
        }`,
        "color: #0000FF"
      );
    }),
    mergeMap(({ index, delay }) => {
      console.log(
        `%c ${new Date().toLocaleTimeString()} start mergeMap with index: ${index} with delay ${delay}`,
        "color: #FFA500"
      );
      return timer(delay).pipe(
        mapTo(index),
        tap(() => {
          console.log(
            `%c ${new Date().toLocaleTimeString()} end mergeMap with index: ${index}`,
            "color: #00FF00"
          );
        })
      );
    })
  );

  observable.subscribe(observer);
  console.log(`${new Date().toLocaleTimeString()} - mergeMap started`);
}

document
  .querySelector('[data-btn="mergeMap"]')!
  .addEventListener("click", mergeMapExample);
