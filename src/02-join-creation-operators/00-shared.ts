import { Observable } from "rxjs";

const createSource = (
  name: string,
  startWith: number,
  interval: number,
  color: string
): Observable<number> =>
  new Observable(subscriber => {
    console.log(`%c ${name} start`, `color: ${color}`);
    let index = startWith;
    const id = setInterval(() => {
      if (index < startWith + 5) {
        console.log(`%c ${name} emit value ${index}`, `color: ${color}`);
        subscriber.next(index++);
      } else {
        subscriber.complete();
        clearInterval(id);
      }
    }, interval);
  });

export const source1$ = createSource("source1$", 1, 1000, "#0000FF");
export const source2$ = createSource("source2$", 6, 2500, "#00FF00");
