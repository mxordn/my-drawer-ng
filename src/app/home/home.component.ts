//import { HttpHeaders } from '@angular/common/http'
import { Injectable, Component, OnInit } from '@angular/core'
import { SafeHtml, DomSanitizer } from '@angular/platform-browser'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, EventData, Button, TextView } from '@nativescript/core'
import { EngraverService } from './engraver.service'
//import { MatSnackBar } from '@angular/material/snack-bar'


@Injectable({
  providedIn: 'root'
})
export class Svg {
  done: SafeHtml;
  hint: string;
  svg: SafeHtml;
  lsg: SafeHtml;
}

export interface Modulation {
  id: Number,
  type: String,
  shortcut: String[],
  loewe: String,
  checked: Boolean
}

const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'responseType': 'text'
}

const requestOptions = {                                                                                                                                                                                 
  //headers: new HttpHeaders(headerDict), 
};

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
})
@Injectable({
  providedIn: 'root'
})
export class HomeComponent implements OnInit {
  
  oberquinte: Modulation = {id: 1, type: "Oberquinte", shortcut: ["5", "bi bi-arrow-up"], loewe: "Loewe I", checked: true}
  oberquarte: Modulation = {id: 2, type: "Oberquarte", shortcut: ["4", "bi bi-arrow-up"], loewe: "Loewe II", checked: false}
  kleineUnterterz: Modulation = {id: 1, type: "Kleine Unterterz", shortcut: ["m3", "bi bi-arrow-down"], loewe: "Loewe III", checked: false}
  großeUnterterz: Modulation = {id: 1, type: "Große Unterterz", shortcut: ["M3", "bi bi-arrow-down"], loewe: "Loewe IV", checked: false}
  kleineOberterz: Modulation = {id: 1, type: "Kleine Oberterz", shortcut: ["m3", "bi bi-arrow-up"], loewe: "Loewe IX", checked: false}
  großeOberterz: Modulation = {id: 1, type: "Große Oberterz", shortcut: ["M3", "bi bi-arrow-up"], loewe: "Loewe X", checked: false}
  kleineObersekunde: Modulation = {id: 1, type: "Kleine Obersekunde", shortcut: ["m2", "bi bi-arrow-up"], loewe: "Loewe V", checked: false}
  großeObersekunde: Modulation = {id: 1, type: "Große Obersekunde", shortcut: ["M2", "bi bi-arrow-up"], loewe: "Loewe VI", checked: false}
  kleineUntersekunde: Modulation = {id: 1, type: "Kleine Obersekunde", shortcut: ["m2", "bi bi-arrow-down"], loewe: "Loewe VIII", checked: false}
  grosseUntersekunde: Modulation = {id: 1, type: "Große Untersekunde", shortcut: ["M2", "bi bi-arrow-down"], loewe: "Loewe VII", checked: false}
  tritonus: Modulation = {id: 1, type: "Tritonus", shortcut: ["a4/d5 ", "bi bi-arrow-down-up"], loewe: "Loewe XI", checked: false}
  

  modulations: Modulation[] = [this.oberquinte, this.oberquarte, this.kleineUnterterz, this.großeUnterterz,
                              this.kleineOberterz, this.großeOberterz, this.großeObersekunde, this.kleineObersekunde,
                              this.grosseUntersekunde, this.kleineUntersekunde, this.tritonus]; //
  
  submitted = false;
  userMods = [];
  endpointAufgabe = 'api/neueAufgabe'
  selectedMods: String[] = [];
  selMod: String;
  //'https://glarean.mh-freiburg.de/hessen/loewe/neueAufgabe';

  svg: SafeHtml;
  public lsg: SafeHtml;
  hint: SafeHtml;
  tvtext: String;

  constructor(//private hC: HttpClient,
    public scores: Svg,
    private sanitizer: DomSanitizer,
    private engraver: EngraverService

    //private hintSnack: MatSnackBar
    ) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer();
    //console.log(this.engraver.version());
  }

  onTapNewExercise(args: EventData) {
    const button = args.object as Button;
    this.tvtext = this.engraver.clear();

    let svgTest = this.engraver.getNewExercise();
    // execute your custom logic here...
  }

  onTextChange(args: EventData) {
    const tv = args.object as TextView
    console.log(tv.text)
  }
}
