import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NodeService {

    constructor(private http: HttpClient) {}

    getFiles() {
        return this.http.get<any>('assets/demo/data/treenodes.json')
            .toPromise()
            .then(res => res.root);
    }

    getFilesystem() {
        return this.http.get<any>('assets/demo/data/filesystem.json')
            .toPromise()
            .then(res => res.root);
    }

    getLazyFiles() {
        return this.http.get<any>('assets/demo/data/treenodeslazy.json')
            .toPromise()
            .then(res => res.root);
    }
}
