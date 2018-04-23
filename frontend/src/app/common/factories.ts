import {TimeSlot} from "../domain/time-slot.model";


export function generateTimeSlot(hour: string, slot: string) {
  return new TimeSlot(hour + ':' + slot);
}
