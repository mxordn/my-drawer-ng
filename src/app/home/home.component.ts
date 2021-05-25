//import { HttpHeaders } from '@angular/common/http'
import { Injectable, Component, OnInit, ViewContainerRef } from '@angular/core'
import { SafeHtml, DomSanitizer } from '@angular/platform-browser'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, EventData, Button, TextView, LoadEventData, WebView, ImageSource, Dialogs } from '@nativescript/core'
import { EngraverService, Svg } from './engraver.service'
import { HttpResponse } from '@nativescript/core'
import { Http, HTTPFormData, HTTPFormDataEntry } from '@klippa/nativescript-http'
import { Drawer } from '../app.component';
import { ModalDialogService, ModalDialogOptions, ModalDialogParams } from '@nativescript/angular';
import { Solution } from '../solution-modal/solution.modal';

//import { ImageSourceSVG } from '@sergeymell/nativescript-svg'
//import { ImageSource } from 'tns-core-modules/image-source'
//import { MatSnackBar } from '@angular/material/snack-bar'


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
  providers: [EngraverService]
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
  userMods: String;
  endpointAufgabe = 'api/neueAufgabe'
  selectedMods: String;
  selMod: String;
  htmlString: SafeHtml = "<span>Hallo</span>";
  
  scores: Svg;
  //'https://glarean.mh-freiburg.de/hessen/loewe/neueAufgabe';

  svg: SafeHtml = "";
  lsg: String = "";
  done: String = "false";
  processing: Boolean = false;
  hint: String;// = "Kein Tipp da"
  tvtext: String = "Blubb";
  img: ImageSource;
  imgSolution: ImageSource;
  solutionVisible: String = 'collapse';
  startScreenText: String = 'visible';
  toggleText = "Show Sample Solution";

  constructor(//private hC: HttpClient,
    private sanitizer: DomSanitizer,
    private modalService: ModalDialogService, private vcRef: ViewContainerRef,
    //private svgService: SvgService,
    private engraver: EngraverService,
    private drawer: Drawer,
    //public img: ImageSource// = new ImageSourceSVG()
    //private hintSnack: MatSnackBar
    ) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    //this.scores.hint = "Hier ist ein Hint!";
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer();
    //console.log(this.engraver.version());
  }

  async onTapNewExercise(args: EventData) {
    const button = args.object as Button;
    //this.scores = this.svgService.getScores();
    this.getNewExercise();

    //let erg = await (this.engraver.getNewExercise()).finally(() => {
    //  console.log(erg);
    //});
    //this.engraver.askNewExercise()
    // execute your custom logic here...
  }

  public openSolution() {
    this.createModelView()
  }

  private createModelView(): Promise<any> {
    // showModal returns a promise with the received parameters from the modal page
    let solutionOptions: ModalDialogOptions;

    if (this.scores.done) {
      solutionOptions = {
        viewContainerRef: this.vcRef,
        context: this.scores.pngInkLsg.toString(),
        fullscreen: false,
      };
    }
    else {
      solutionOptions = {
        viewContainerRef: this.vcRef,
        context: "Keine Lösung da.",
        fullscreen: false,
      };
    }
    return this.modalService.showModal(Solution, solutionOptions);
}

  async onTapShowSolution(args: EventData) {
    const button = args.object as Button;
    //this.scores = this.svgService.getScores();
    this.toggleSolution();
  }

  public toggleSolution() {
    //this.pngSolution;
    if (this.solutionVisible === 'visible') {
      this.solutionVisible = 'collapse';
      this.toggleText = "Show Sample Solution";
    }
    else {
      this.solutionVisible = 'visible';
      this.toggleText = "Hide Sample Solution";
    }
  }

  public async getNewExercise() {
      this.startScreenText = 'collapse';
      this.solutionVisible = 'collapse';
      this.toggleText = "Show Sample Solution";
      this.processing = true;

      const formData = new HTTPFormData();
      this.userMods = this.drawer.getUsersMods();
      //let blubb: string = JSON.stringify(this.userMods);
      
      formData.append('modType', this.userMods);
      console.log(`Mods: ${this.userMods}`);
      //console.log(formData['modType']);'["Loewe II", "Loewe III"]''"' +  + '"'
      await Http.request({
          timeout: 10000,
          url: 'https://8587c9f07fe6.ngrok.io/api/neueAufgabe',
          //54ae1935cfef9457761fd2e2f0668c855db0d5d9d436a87817856ccee43b e5624b203cdf 755bd6e26aee
          method: 'POST',
          //headers: { "Content-Type": "application/json" },
          content: formData
      }).then(
          (response: HttpResponse) => {
          // Argument (response) is HttpResponse
          console.log(`Response Status Code: ${response.statusCode}`)
          //console.log(`Response Headers: ${response.statusCode}`)
          //console.log(`Response Content: ${response.content}`)
          let res: Svg = response.content.toJSON();
          console.log(res.done);
          //this.sortResponse(res);
          this.scores = res;
          console.log(`finally: ${this.scores.done}`);
          this.tvtext = this.scores.svg.toString();
          this.svg = this.scores.svg;
          console.log(this.scores.pngInk);
          this.htmlString = this.scores.svg;
          //this.img.fromResource(this.scores.svg.toString());
          //this.img = ImageSource.fromBase64Sync("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");
          this.img = ImageSource.fromBase64Sync(this.scores.pngInk.toString());
          this.imgSolution = ImageSource.fromBase64Sync(this.scores.pngInkLsg.toString());
          this.lsg = this.scores.lsg;
          this.hint = this.scores.hint;
          this.done = this.scores.done;
          this.processing = false;
          },
      e => {
          console.log(`Error in then: ${e}`)
          //this.scores.done = "Ups, da ging was schief.";
          this.processing = false;
          Dialogs.alert(this.getErrorAlert(true));

      })
      .catch(
        (e) => {
          console.log(`Error to catch: ${e}`);
          this.processing = false;
          Dialogs.alert(this.getErrorAlert(false));
        }
      );

//    const result = await this.hC.post<Svg>("api/neueAufgabe", formData).toPromise().then()
  }

  private getErrorAlert(timeout: Boolean) {
    if (timeout) {
      let options = {
        title: "Neue Aufgabe",
        message: "Something went wrong. The server timeout. Please try again (maybe also later).",
        okButtonText: "OK"
      };
      return options;
    }
    else {
      let options = {
        title: "Neue Aufgabe",
        message: "General Error! Something went wrong. Please try again and check your network connection. Most likely this happens because the server is not reachable.",
        okButtonText: "OK"
      };
      return options;
    }
  }

  onTextChange(args: EventData) {
    const tv = args.object as TextView
    console.log(tv.text)
  }

  onLoadStarted(args: LoadEventData) {
    const webView = args.object as WebView;

    if (!args.error) {
        console.log("Load Start");
        console.log(`EventName: ${args.eventName}`);
        console.log(`NavigationType: ${args.navigationType}`);
        console.log(`Url: ${args.url}`);
    } else {
        console.log(`EventName: ${args.eventName}`);
        console.log(`Error: ${args.error}`);
    }
  }

  onLoadFinished(args: LoadEventData) {
      const webView = args.object as WebView;

      if (!args.error) {
          console.log("Load Finished");
          console.log(`EventName: ${args.eventName}`);
          console.log(`NavigationType: ${args.navigationType}`);
          console.log(`Url: ${args.url}`);
      } else {
          console.log(`EventName: ${args.eventName}`);
          console.log(`Error: ${args.error}`);
      }
  }
}