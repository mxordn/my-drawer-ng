import { Injectable, NgModule } from '@angular/core';
import { HttpResponse } from '@nativescript/core';
import { Http, HTTPFormData } from '@klippa/nativescript-http';

@Injectable({
    providedIn: 'root'
  })
export class Svg {
    done: String;
    hint: String;
    svg: String;
    lsg: String;
}

//var verovioModule = require('../../lib/verovio-toolkit.js');
//declare var verovio: any;

@Injectable({
    providedIn: 'root'
})
export class EngraverService {
    scores: Svg;

    notes : String;

    constructor() {
        this.notes = "";
        //this.vrvToolkit = new verovioModule.toolkit();
    }

    public clear() : String {
        return "Hier könnte ihre Aufgabe stehen";
    }

    public async getNewExercise() {
        
        const formData = new HTTPFormData();

        formData.append('modType', '["Loewe I", "Loewe II"]');
        console.log(formData['modType']);

        Http.request({
            url: 'https://35a3bb2854aa.ngrok.io/api/neueAufgabe',
            method: 'POST',
            //headers: { "Content-Type": "application/json" },
            content: formData
        }).then(
            (response: HttpResponse) => {
            // Argument (response) is HttpResponse
            console.log(`Response Status Code: ${response.statusCode}`)
            console.log(`Response Headers: ${response.statusCode}`)
            console.log(`Response Content: ${response.content}`)
            },
            e => {
                console.log(`${e}`)
            }
        )
    //    const result = await this.hC.post<Svg>("api/neueAufgabe", formData).toPromise().then()
    }

    public renderNotation() {
    }
}