import {Component, OnInit} from "@angular/core";
import {PerformerListSubject} from "../../domain/custom-subjects";
import {OpenMicService} from "../../services/open-mic.service";
import {TimeSlot} from "../../domain/time-slot.model";
import {generateTimeSlot} from "../../common/factories";
import {Duplex} from "../../common/duplexes";


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

  //region GENERATE TIME SLOTS
  /**
   * Generate the initial timeslots. Current standard: 8pm - 1am; increment by 15 mins
   */
  generateTimeSlots() {
    const hoursAndSlots = new Duplex<string, string>(
      ['8','9','10','11','12'], ['00', '15', '30', '45']
    );

    this.timeList = hoursAndSlots.collect(generateTimeSlot);
    this.timeList.push('1:00');
  }
  //endregion GENERATE TIME SLOTS

  onDrop(event, index) {
    let exists = this.timeList.map(time => time.performer).indexOf(event.dragData);
    console.log('existing: ', this.timeList[index].performer);

    if(exists != -1) {
      console.log('existing INSIDE: ', this.timeList[index].performer);
      if(this.timeList[index].performer !== undefined) {
        this.timeList[exists].performer = this.timeList[index].performer;
      } else {
        this.timeList[exists].performer = null;
      }
      this.timeList[index].performer = event.dragData;
    }

    this.timeList[index].performer = event.dragData;
  }
}
