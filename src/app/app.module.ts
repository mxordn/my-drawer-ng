import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'

import { AppRoutingModule } from './app-routing.module'
import { Drawer } from './app.component'

@NgModule({
  bootstrap: [Drawer],
  imports: [AppRoutingModule, NativeScriptModule, NativeScriptUISideDrawerModule],
  declarations: [Drawer],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
