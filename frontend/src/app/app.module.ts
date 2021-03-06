import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {environment} from "../environments/open-mc.environment";
import {OpenMicListingComponent} from "./core/open-mic-listing/open-mic-listing.component";
import {DirectorService} from "./services/director.service";
import {OpenMicService} from "./services/open-mic.service";
import {ClarityModule} from "@clr/angular";
import {NgDragDropModule} from "ng-drag-drop";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    OpenMicListingComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ClarityModule,
    NgDragDropModule.forRoot(),
    FormsModule
  ],
  providers: [DirectorService, OpenMicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
