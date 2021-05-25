import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalDialogParams, RouterExtensions } from "@nativescript/angular";
import { ImageSource } from "@nativescript/core";

@Component({
    selector: "solution-display",
    templateUrl: "solution.modal.html",
})
export class Solution {
    solutionPng: ImageSource;

    public constructor(private _params: ModalDialogParams) {
        this.solutionPng = ImageSource.fromBase64Sync(_params.context);
    }

    public closeSolution(): void {
        this._params.closeCallback("return value");
    }
}