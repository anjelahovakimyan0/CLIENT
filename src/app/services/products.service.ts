import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {PaginationParams, Products} from "../../types";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService, private http: HttpClient) { }

  getProducts = (url: string, params: PaginationParams): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  }

  addProduct = (url: string, body: any): Observable<any> => {
    this.http.post("http://localhost:8080/v1/products", body);
    return this.apiService.post(url, body, {});
  }

  editProduct = (url: string, body: any): Observable<any> => {
    return this.apiService.put(url, body, {});
  }

  deleteProduct = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  }
}
