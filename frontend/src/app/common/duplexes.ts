

export class Duplex<E, T> {

  constructor(public primary: E[], public supplementary: T[]) {}

  forSeries() {}

  collect(fn) {
    const list = [];

    this.primary.forEach(p => {
      this.supplementary.forEach(s => {
        list.push(fn(p, s));
      });
    });

    return list;
  }
}
