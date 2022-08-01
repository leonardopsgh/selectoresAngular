import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Pais, PaisSmall } from './interfaces/pais';


@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseUrl =  'https://restcountries.com/v3.1';

  private _regiones :string [] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] ;

  get regiones():string []{
    return [...this._regiones];
  }
  constructor(private http : HttpClient) { }

  getPaisesByRegion(region:string):Observable<PaisSmall[]>{
    const url: string = `${ this.baseUrl }/region/${region}?fields=name,cca3`;
    return this.http.get<PaisSmall[]>(url);
  }

  getFronteraByCode(codigo:string):Observable<Pais| null>{
    if (!codigo) {
      return of(null);      
    }    
    // const url: string = `https://restcountries.com/v2/alpha?codes=${codigo}`;
    // return this.http.get<Pais>(url);
    const url: string = `https://restcountries.com/v3.1/alpha?codes=${codigo}`;
    return this.http.get<Pais>(url);
  }
}
