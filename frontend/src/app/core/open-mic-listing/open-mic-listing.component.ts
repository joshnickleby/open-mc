import {Component, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AngularFireDatabase} from "angularfire2/database";
import {PerformerListSubject} from "../../domain/custom-subjects";
import {OpenMicService} from "../../services/open-mic.service";


@Component({
  selector: 'openmc-open-mic-listing',
  templateUrl: './open-mic-listing.component.html'
})
export class OpenMicListingComponent implements OnInit {
  performers$: PerformerListSubject;

  constructor(private openMicService: OpenMicService) {}

  ngOnInit(): void {
    this.performers$ = this.openMicService.getPerformers();
  }
}
