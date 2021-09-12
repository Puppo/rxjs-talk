import { fromEvent, map, pipe, tap } from "rxjs";

const myOperator = pipe(
  tap((e: MouseEvent) => {
    console.log(`myOperator`, e);
  }),
  map(e => {
    const el = e.target as HTMLElement;
    const { top, right, bottom, left } = el.getBoundingClientRect();
    return { top, right, bottom, left };
  }),
  tap(position => {
    console.log(`myOperator result`, position);
  })
);

fromEvent(document.querySelector('[data-btn="customOperator"]'), "click")
  .pipe(myOperator)
  .subscribe();
