import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

export interface LoginModel {
  Name: string;
  Email: string;
  Role: string;
}

export interface PolicyRequest {
  Subject: string;
  Domain: string;
  Object: string;
  Action: string;
}

export interface Resource {
  id?: number;
  name: string;
  resourceType: string;
  department: string;
  classification: string;
  ownerId: number;
}

export interface AccessRequest {
  Subject?: string;
  Domain?: string;
  Object: string;
  Action: string;
}

@Injectable({
  providedIn: 'root',
})
export class CasbinService {
  private apiUrl = 'http://localhost:5032/api';
  private tokenKey = 'casbin_token';
  private userKey = 'casbin_user';

  public currentUser$ = new BehaviorSubject<LoginModel | null>(null);

  constructor(private http: HttpClient) {
    this.loadUser();
  }

  private loadUser() {
    const user = localStorage.getItem(this.userKey);
    if (user) {
      this.currentUser$.next(JSON.parse(user));
    }
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  login(user: LoginModel): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/Auth/token`,
      user,
      { responseType: 'text' } // Returns JWT string
    ).pipe(
      tap(token => {
        localStorage.setItem(this.tokenKey, token);
        localStorage.setItem(this.userKey, JSON.stringify(user));
        this.currentUser$.next(user);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUser$.next(null);
  }

  // Policies
  getPolicies(): Observable<string[][]> {
    return this.http.get<string[][]>(`${this.apiUrl}/CasbinPolicies`, { headers: this.getHeaders() });
  }

  addPolicy(policy: PolicyRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/CasbinPolicies`, policy, { headers: this.getHeaders() });
  }

  removePolicy(policy: PolicyRequest): Observable<any> {
    const options = {
      headers: this.getHeaders(),
      body: policy,
    };
    return this.http.delete(`${this.apiUrl}/CasbinPolicies`, options);
  }

  // Resources
  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/Resources`, { headers: this.getHeaders() });
  }

  addResource(res: Resource): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}/Resources`, res, { headers: this.getHeaders() });
  }

  // Access Check
  checkAccess(req: AccessRequest): Observable<{ allowed: boolean }> {
    return this.http.post<{ allowed: boolean }>(`${this.apiUrl}/Access/check`, req, { headers: this.getHeaders() });
  }
}
