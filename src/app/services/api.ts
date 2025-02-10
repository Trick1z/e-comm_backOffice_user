import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class ApiService {

  private baseUrl: string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  post(endpoint: string, body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, body);
  }

  put(endpoint: string, body: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}`, body);
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}`);
  }

//   getWithHeaders(endpoint: string): Observable<any> {
//     const headers = new HttpHeaders().set('Authorization', 'Bearer YOUR_TOKEN');
//     return this.http.get(`${this.baseUrl}/${endpoint}`, { headers });
//   }
}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {
//   private baseUrl: string = 'http://127.0.0.1:8000';  // Your base URL

//   constructor(private http: HttpClient) {}

//   // GET request - returns Promise
//   get(endpoint: string): Promise<any> {
//     return new Promise((resolve, reject) => {
//       this.http.get(`${this.baseUrl}/${endpoint}`).subscribe(
//         (response) => resolve(response),
//         (error) => reject(error)
//       );
//     });
//   }

//   // POST request - returns Promise
//   post(endpoint: string, body: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//       this.http.post(`${this.baseUrl}/${endpoint}`, body).subscribe(
//         (response) => resolve(response),
//         (error) => reject(error)
//       );
//     });
//   }

//   // PUT request - returns Promise
//   put(endpoint: string, body: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//       this.http.put(`${this.baseUrl}/${endpoint}`, body).subscribe(
//         (response) => resolve(response),
//         (error) => reject(error)
//       );
//     });
//   }

//   // DELETE request - returns Promise
//   delete(endpoint: string): Promise<any> {
//     return new Promise((resolve, reject) => {
//       this.http.delete(`${this.baseUrl}/${endpoint}`).subscribe(
//         (response) => resolve(response),
//         (error) => reject(error)
//       );
//     });
//   }
// }
