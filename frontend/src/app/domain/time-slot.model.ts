import {Performer} from "./firebase-entities";

export class TimeSlot {

  constructor(public time: string, public performer?: Performer) {}
}
