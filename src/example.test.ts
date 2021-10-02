import { concat, take } from "rxjs";
import { TestScheduler } from "rxjs/testing";

describe("TestScheduler", () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe("cold", () => {
    it("run test", () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const source$ = cold("-a-b-c-d-e-|");
        const expected$ = "-a-b-c-d-e-|";

        expectObservable(source$).toBe(expected$);
      });
    });

    it("run test with values", () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const source$ = cold("-a-b-c-d-e-|", {
          a: 1,
          b: 2,
          c: 3,
          d: 4,
          e: 5,
        });
        const expected$ = "-a-b-c-d-e-|";

        expectObservable(source$).toBe(expected$, {
          a: 1,
          b: 2,
          c: 3,
          d: 4,
          e: 5,
        });
      });
    });
  });

  describe("hot", () => {
    it("run test", () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const source$ = hot("-a-b-^-c-|");
        const expected$ = "--c-|";

        expectObservable(source$).toBe(expected$);
      });
    });

    it("run test with logic", () => {
      testScheduler.run(({ hot, expectObservable, expectSubscriptions }) => {
        const source$ = hot("-a-b-^-c-|", { c: 1 });
        const final$ = source$.pipe(take(1));
        const expected$ = "--(c|)";

        expectObservable(final$).toBe(expected$, { c: 1 });
      });
    });
  });

  describe("Subscriptions", () => {
    it("test subscriptions", () => {
      testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
        const source1$ = cold("-a-b-c-d-|");
        const source2$ = cold("-e-f-g-h-|");
        const final$ = concat(source1$, source2$);
        const expected$ = "-a-b-c-d--e-f-g-h-|";
        const expectedSub1$ = "^--------!";
        const expectedSub2$ = "---------^--------!";

        expectObservable(final$).toBe(expected$);
        expectSubscriptions(source1$.subscriptions).toBe(expectedSub1$);
        expectSubscriptions(source2$.subscriptions).toBe(expectedSub2$);
      });
    });
  });
});
