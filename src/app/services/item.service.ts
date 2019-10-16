import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class ItemService {

  constructor(private http: Http) { }

  itemGet(nombreCategoria: string): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-UOW', 'MAXI');
    return this.http
      .get('http://localhost:9290/chatbot/category/' + nombreCategoria, {headers: headers})
      .map((res: Response) => {
        const body = res.json();
        return body || { };
      })
      .catch(this.handleError);
  }

  itemAdd(nombre: string, descripcion: string, categoria: string): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-UOW', 'MAXI');
    return this.http
      .post('http://localhost:9290/chatbot/category/' + categoria + '/item', this.mapData(nombre, descripcion), {headers: headers})
      .map((res: Response) => {
        const body = res.json();
        return body || { };
      })
      .catch(this.handleError);
  }

  itemDelete(idItem: string, nombreCategoria: string): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-UOW', 'MAXI');
    return this.http
      .delete('http://localhost:9290/chatbot/category/' + nombreCategoria + '/item/' + idItem, {headers: headers})
      .map((res: Response) => {
        const body = res.json();
        return body || { };
      })
      .catch(this.handleError);
  }

  mapData(nombre: string, descripcion: string) {
    return {
      name: (nombre.toLowerCase()).normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      description: descripcion
    };
  }

  private handleError(error: Response | any) {
    const body = error.json();
    const message = (body.status === 'Not Found')
      ? Observable.of([])
      : Observable.throw(new Error('An error has occurred. Please try again'));
    return message;
  }

}
