import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class SynonymService {

  constructor(private http: Http) { }

  synonymGet(nombreCategoria: string, nombreItem: string): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-UOW', 'MAXI');
    return this.http
      .get('http://localhost:9290/chatbot/category/' +
        nombreCategoria.replace(/ /g, '%20') +
        '/item/' + nombreItem.replace(/ /g, '%20') +
        '/synonyms', {headers: headers}
      )
      .map((res: Response) => {
        const body = res.json();
        return body || { };
      })
      .catch(this.handleError);
  }

  synonymAdd(categoria: string, item: string, sinonimo: string): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-UOW', 'MAXI');
    return this.http
      .post('http://localhost:9290/chatbot/category/' + categoria + '/item/' + item + '/synonym', this.mapData(sinonimo), {headers: headers})
      .map((res: Response) => {
        const body = res.json();
        return body || { };
      })
      .catch(this.handleError);
  }

  mapData(sinonimo: string) {
    return {
      description: (sinonimo.toLowerCase()).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    };
  }

  synonymDelete(categoria: string, item: string, sinonimo: string): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-UOW', 'MAXI');
    return this.http
      .delete('http://localhost:9290/chatbot/category/' + categoria + '/item/' + item + '/synonym/' + sinonimo, {headers: headers})
      .map((res: Response) => {
        const body = res.json();
        return body || { };
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    const body = error.json();
    const message = (body.status === 'Not Found')
      ? Observable.of([])
      : Observable.throw(new Error('An error has occurred. Please try again'));
    return message;
  }

}
