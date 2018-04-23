import {Component, OnInit} from "@angular/core";
import {PerformerListSubject} from "../../domain/custom-subjects";
import {OpenMicService} from "../../services/open-mic.service";
import {TimeSlot} from "../../domain/time-slot.model";
import {generateTimeSlot} from "../../common/factories";
import {Duplex} from "../../common/duplexes";
import {Performer} from "../../domain/firebase-entities";
import {exists, isAvailable, isNotAvailable} from "../../common/validators.fn";


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


  //region ON DROP
  onDrop(event, index) {
    const performer: Performer = event.dragData;

    // check if the performer is already present
    const performersPreviousIndex = this.timeList.map(this.extractPerformer).indexOf(performer);

    // if present then remove and swap name from list
    if(performersPreviousIndex != -1) {
      const performerToSwap = this.timeList[index].performer;
      // if performer exists in target slot then put them in the target performer's last spot
      this.timeList[performersPreviousIndex] = exists(performerToSwap) ? performerToSwap : null;
    }

    // add the performer to the slot
    this.timeList[index].performer = performer;

    // remove performer from selection list
    this.performers$ = this.openMicService.removePerformer(performer);
  }

  extractPerformer = (time: TimeSlot) => time.performer;
  //endregion ON DROP

}
