import {Component, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AngularFireDatabase} from "angularfire2/database";


@Component({
  selector: 'openmc-open-mic-listing',
  templateUrl: './open-mic-listing.component.html'
})
export class OpenMicListingComponent implements OnInit {
  testObservable$ = new BehaviorSubject<any[]>([]);

  listPath = '/performers';

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.db.list(this.listPath).valueChanges().subscribe(res => this.testObservable$.next(res));
  }
}
