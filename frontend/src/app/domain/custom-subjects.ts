import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Performer} from "./firebase-entities";
import {makePerformers} from "../common/firebase.converter";


class CustomBehaviorSubject<T> extends BehaviorSubject<T> {
  constructor(private convertFn, private nextValue) {
    super(nextValue);
  }

  convertNext(response: any[]) {
    const converted = this.convertFn(response);
    this.next(converted);
  }
}


export class PerformerListSubject extends CustomBehaviorSubject<Performer[]> {

  constructor(private response: Performer[] = []) {
    super(makePerformers, response);
  }
}
