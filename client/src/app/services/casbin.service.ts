import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Policy,
  Resource,
  UserAttribute,
  AccessCheckRequest,
  AccessCheckResponse,
  PoliciesResponse,
  User
} from '../models';

/**
 * CasbinService
 * Handles all API communication with the backend for Casbin operations
 * Simple, single responsibility service
 */
@Injectable({
  providedIn: 'root'
})
export class CasbinService {
  private apiUrl = '/api/trpc';

  constructor(private http: HttpClient) {}

  /**
   * Get all policies and roles
   */
  getPolicies(): Observable<PoliciesResponse> {
    return this.http.get<PoliciesResponse>(`${this.apiUrl}/casbin.getPolicies`);
  }

  /**
   * Add a new policy
   */
  addPolicy(policy: Omit<Policy, 'id'>): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/casbin.addPolicy`, policy);
  }

  /**
   * Delete a policy by ID
   */
  deletePolicy(id: number): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/casbin.deletePolicy`, { id });
  }

  /**
   * Check if access is allowed
   */
  checkAccess(request: AccessCheckRequest): Observable<AccessCheckResponse> {
    return this.http.get<AccessCheckResponse>(`${this.apiUrl}/casbin.checkAccess`, {
      params: {
        subject: request.subject,
        object: request.object,
        action: request.action
      }
    });
  }

  /**
   * Get all resources
   */
  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/casbin.getResources`);
  }

  /**
   * Create a new resource
   */
  createResource(resource: Omit<Resource, 'id' | 'ownerId' | 'createdAt'>): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}/casbin.createResource`, resource);
  }

  /**
   * Get all users
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/casbin.getUsers`);
  }

  /**
   * Get user attributes
   */
  getUserAttributes(userId: number): Observable<UserAttribute[]> {
    return this.http.get<UserAttribute[]>(`${this.apiUrl}/casbin.getUserAttributes`, {
      params: { userId: userId.toString() }
    });
  }

  /**
   * Set user attribute
   */
  setUserAttribute(userId: number, key: string, value: string): Observable<UserAttribute> {
    return this.http.post<UserAttribute>(`${this.apiUrl}/casbin.setUserAttribute`, {
      userId,
      attributeKey: key,
      attributeValue: value
    });
  }
}
