import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class ExpressionService {

  constructor(private http: Http) { }

  expressionGet(nombreCategoria: String, nombreItem: String): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-UOW', 'MAXI');
    return this.http
      .get('http://localhost:9290/chatbot/category/' + nombreCategoria + '/item/' + nombreItem + '/phrases', {headers: headers})
      .map((res: Response) => {
        const body = res.json();
        return body || { };
      })
      .catch(this.handleError);
  }

  expressionAdd(descripcion: string, categoria: string, item: string): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-UOW', 'MAXI');
      return this.http
      .post('http://localhost:9290/chatbot/category/' + categoria + '/item/' + item + '/phrase',
        this.mapData(descripcion),
        {headers: headers}
      )
      .map((res: Response) => {
        const body = res.json();
        return body || { };
      })
      .catch(this.handleError);
  }

  expressionDelete(idExpression: string, nombreCategoria: string, nombreItem: string): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-UOW', 'MAXI');
    return this.http
      .delete('http://localhost:9290/chatbot/category/' +
        nombreCategoria.replace(/ /g, '%20') + '/item/' +
        nombreItem.replace(/ /g, '%20') + '/phrase/' +
        idExpression, {headers: headers}
      )
      .map((res: Response) => {
        const body = res.json();
        return body || { };
      })
      .catch(this.handleError);
  }

  mapData(descripcion: string) {
    return {
      description: (descripcion).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    };
  }

  private handleError(error: Response | any) {
    const body = error.json();
    const message = body && body._errors && body._errors.length && body._errors[0].detail
      ? body._errors[0].detail
      : 'An error has occurred. Please try again';
    return Observable.throw(new Error(message));
  }

}
