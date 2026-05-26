import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class IconService {

    constructor(private http: HttpClient) {}

    getIcons() {
        return this.http.get<any>('assets/demo/data/icons.json')
            .toPromise()
            .then(res => res.icons);
    }
}
