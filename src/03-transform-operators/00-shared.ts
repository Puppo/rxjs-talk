import { Observable, Observer } from "rxjs";

type Value = {
  index: number;
  delay: 0 | 2000;
};

const values: Value[] = [
  {
    index: 1,
    delay: 0,
  },
  {
    index: 2,
    delay: 2000,
  },
  {
    index: 3,
    delay: 0,
  },
  {
    index: 4,
    delay: 2000,
  },
  {
    index: 5,
    delay: 0,
  },
];

export const source$ = new Observable<Value>(subscriber => {
  let index = 0;
  const interval = setInterval(() => {
    if (index < values.length) {
      subscriber.next(values[index++]);
    } else {
      subscriber.complete();
      clearInterval(interval);
    }
  }, 1000);
});

export const observer: Observer<number> = {
  next: value => console.log("next: ", value),
  error: error => console.error("error: ", error),
  complete: () => console.info("complete"),
};
