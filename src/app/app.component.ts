import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import {
  DrawerTransitionBase,
  RadSideDrawer,
  SlideInOnTopTransition,
} from 'nativescript-ui-sidedrawer'
import { filter } from 'rxjs/operators'
import { Application } from '@nativescript/core'
import { HomeComponent, Modulation } from './home/home.component'
import { EventData, Switch } from '@nativescript/core'

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class Drawer implements OnInit {
  private _activatedUrl: string
  private _sideDrawerTransition: DrawerTransitionBase

  constructor(private router: Router, private routerExtensions: RouterExtensions) {
    // Use the component constructor to inject services.
  }

  ngOnInit(): void {
    this._activatedUrl = '/home'
    this._sideDrawerTransition = new SlideInOnTopTransition()

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => (this._activatedUrl = event.urlAfterRedirects))
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: 'fade',
      },
    })

    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.closeDrawer()
  }
  
  oberquinte: Modulation = {id: 1, type: "Oberquinte", shortcut: ["5", "bi bi-arrow-up"], loewe: "Loewe I", checked: true}
  oberquarte: Modulation = {id: 2, type: "Oberquarte", shortcut: ["4", "bi bi-arrow-up"], loewe: "Loewe II", checked: false}
  kleineUnterterz: Modulation = {id: 3, type: "Kleine Unterterz", shortcut: ["m3", "bi bi-arrow-down"], loewe: "Loewe III", checked: false}
  großeUnterterz: Modulation = {id: 4, type: "Große Unterterz", shortcut: ["M3", "bi bi-arrow-down"], loewe: "Loewe IV", checked: false}
  kleineOberterz: Modulation = {id: 5, type: "Kleine Oberterz", shortcut: ["m3", "bi bi-arrow-up"], loewe: "Loewe IX", checked: false}
  großeOberterz: Modulation = {id: 6, type: "Große Oberterz", shortcut: ["M3", "bi bi-arrow-up"], loewe: "Loewe X", checked: false}
  kleineObersekunde: Modulation = {id: 7, type: "Kleine Obersekunde", shortcut: ["m2", "bi bi-arrow-up"], loewe: "Loewe V", checked: false}
  großeObersekunde: Modulation = {id: 8, type: "Große Obersekunde", shortcut: ["M2", "bi bi-arrow-up"], loewe: "Loewe VI", checked: false}
  kleineUntersekunde: Modulation = {id: 9, type: "Kleine Obersekunde", shortcut: ["m2", "bi bi-arrow-down"], loewe: "Loewe VIII", checked: false}
  grosseUntersekunde: Modulation = {id: 10, type: "Große Untersekunde", shortcut: ["M2", "bi bi-arrow-down"], loewe: "Loewe VII", checked: false}
  tritonus: Modulation = {id: 11, type: "Tritonus", shortcut: ["a4/d5 ", "bi bi-arrow-down-up"], loewe: "Loewe XI", checked: false}
  

  modulations: Modulation[] = [this.oberquinte, this.oberquarte, this.kleineUnterterz, this.großeUnterterz,
                  this.kleineOberterz, this.großeOberterz, this.großeObersekunde, this.kleineObersekunde,
                  this.grosseUntersekunde, this.kleineUntersekunde, this.tritonus]; //
  
  public onCheckedChange(args: EventData, modId) {
    const sw = args.object as Switch;
    const isChecked = sw.checked; // boolean
    const m = this.modulations.find(element => element.id === modId);
    m.checked = isChecked;
    //this.getUsersMods();
    //console.log(this.modulations)
    //console.log(modId, m, isChecked)
  }
  public getUsersMods(): String {
    let userMods = [];
    this.modulations.forEach( el => {
      if (el.checked) {
        userMods.push(el.loewe.toString());
      }
    });
    let userModsString: String[] = [];
    userMods.forEach(el => {
      userModsString.push(String(el));
      console.log(userModsString);
    });
    console.log(`M: ${JSON.stringify(userModsString)}`);
    return JSON.stringify(userModsString)
  }
}
