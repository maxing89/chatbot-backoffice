import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class CategoryService {

  constructor(private http: Http) { }

  categoryGet(): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-UOW', 'MAXI');
    return this.http
      .get('http://localhost:9290/chatbot/?filter=CATEGORY', {headers: headers})
      .map((res: Response) => {
        const body = res.json();
        return body || { };
      })
      .catch(this.handleError);
  }

  categoryAdd(nombre: string, descripcion: string): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-UOW', 'MAXI');
    return this.http
      .post('http://localhost:9290/chatbot/category', this.mapData(nombre, descripcion), {headers: headers})
      .map((res: Response) => {
        const body = res.json();
        return body || { };
      })
      .catch(this.handleError);
  }

  categoryDelete(idCategory: string): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-UOW', 'MAXI');
    return this.http
      .delete('http://localhost:9290/chatbot/category/' + idCategory, {headers: headers})
      .map((res: Response) => {
        const body = res.json();
        return body || { };
      })
      .catch(this.handleError);
  }

  mapData(nombre: string, descripcion: string) {
    return {
      name: (nombre.toLowerCase()).normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
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
