import {Component, OnInit} from "@angular/core";
import {PerformerListSubject} from "../../domain/custom-subjects";
import {OpenMicService} from "../../services/open-mic.service";
import {TimeSlot} from "../../domain/time-slot.model";


@Component({
  selector: 'openmc-open-mic-listing',
  templateUrl: './open-mic-listing.component.html'
})
export class OpenMicListingComponent implements OnInit {
  performers$: PerformerListSubject;
  timeList = [];

  constructor(private openMicService: OpenMicService) {}

  ngOnInit(): void {
    this.performers$ = this.openMicService.getPerformers();
    this.generateTimeSlots();
  }

  generateTimeSlots() {
    const hours = ['8','9','10','11','12'];
    const slots = ['00', '15', '30', '45'];

    hours.forEach(hour => slots.forEach(slot => this.timeList.push(new TimeSlot(hour + ':' + slot))));
    this.timeList.push('1:00');
  }

  doSomething(event, index) {
    console.log(event.dragData);
    this.timeList[index].performer = event.dragData;
  }
}
