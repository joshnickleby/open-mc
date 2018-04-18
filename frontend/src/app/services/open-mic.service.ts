import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Performer} from "../domain/firebase-entities";
import {PerformerListSubject} from "../domain/custom-subjects";
import {AngularFireDatabase} from "angularfire2/database";
import {DirectorService} from "./director.service";


@Injectable()
export class OpenMicService extends DirectorService {

  performers$ = new PerformerListSubject([]);

  public getPerformers():PerformerListSubject {
    this.db.list('/performers').valueChanges().subscribe(res => {
      this.performers$.convertNext(res);
    });

    return this.performers$;
  }
}
