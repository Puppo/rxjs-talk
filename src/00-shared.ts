import { interval, take, tap } from "rxjs";

export const source$ = interval(1000).pipe(
  take(10),
  tap(val => {
    console.log(`%c emit value ${val}`, "color: orange");
  })
);
