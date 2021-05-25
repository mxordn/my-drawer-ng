import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { ModalDialogParams, NativeScriptModule } from '@nativescript/angular'
import { ModalDialogService } from '@nativescript/angular'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'

import { AppRoutingModule } from './app-routing.module'
import { Drawer } from './app.component'
import { Solution } from './solution-modal/solution.modal'

@NgModule({
  bootstrap: [Drawer],
  imports: [AppRoutingModule, NativeScriptModule, NativeScriptUISideDrawerModule],
  providers: [ModalDialogService],
  declarations: [Drawer, Solution],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
