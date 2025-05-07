import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private BASE_URL = "http://localhost:8080"; // ou o domínio do seu backend

  constructor(private http: HttpClient) {}

  get(url: string, params: any = {}, options: any = {}) {
    return this.http.get(`${this.BASE_URL}/${url}`, {
      params,
      ...options,
    });
  }

  post(url: string, data: object, options = {}) {
    return this.http.post(`${this.BASE_URL}/${url}`, data, options);
  }

  put(url: string, data: object, options = {}) {
    return this.http.put(`${this.BASE_URL}/${url}`, data, options);
  }

  delete(url: string, id?: any) {
    const fullUrl = id ? `${this.BASE_URL}/${url}/${id}` : `${this.BASE_URL}/${url}`;
    return this.http.delete(fullUrl);
  }
}
