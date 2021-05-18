import { Injectable } from '@angular/core';
import { HttpResponse } from '@nativescript/core';
import { Http, HTTPFormData } from '@klippa/nativescript-http';


export interface Svg {
    done: String;
    hint: String;
    svg: String;
    lsg: String;
    png: String;
    pngInk: String;
    pngInkLsg: String;
  }

@Injectable({
    providedIn: 'root'
})
export class EngraverService {
    scores: Svg;
    constructor() {
        //this.vrvToolkit = new verovioModule.toolkit();
    }
    ngOnInit() : void {
    }

    public clear() : String {
        return "Blubb Hallo"
        //this.scores.getScores();
    }


    public getNewExercise() {
        const formData = new HTTPFormData();
        

        formData.append('modType', '["Loewe II"]');
        //console.log(formData['modType']);
        return Http.request({
            url: 'https://6f16fa215c4b.ngrok.io/api/neueAufgabe',
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
            this.scores = res
            },
        e => {
            console.log(`${e}`)
            this.scores.done = "Ups, da ging was schief.";
        }
        )
        .finally(() => {
            console.log(`finally: ${this.scores.done}`)
            return this.scores
        });
    //    const result = await this.hC.post<Svg>("api/neueAufgabe", formData).toPromise().then()
    }

    sortResponse(res: any) {
        this.scores.done = res['done'];
        this.scores.hint = res['hint'];
        this.scores.svg = res['svg'][0];
        this.scores.lsg = res['lsg'][0];
        this.scores.pngInk = res['pngInk'];
        //console.log(this.scores.done);
        return this.scores;
        //console.log(this.scores.lsg);
    }

    public renderNotation() {
    }
}