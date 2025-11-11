/**
 * Shared Models and Interfaces for Casbin POC
 * Simple, easy-to-understand data structures
 */

export interface User {
  id: number;
  openId: string;
  name?: string;
  email?: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface Policy {
  id?: number;
  policyType: 'p' | 'g';
  subject: string;
  object: string;
  action: string;
  effect?: 'allow' | 'deny';
  conditions?: string;
}

export interface Resource {
  id: number;
  name: string;
  resourceType: string;
  ownerId: number;
  department?: string;
  classification: 'public' | 'internal' | 'confidential' | 'secret';
  createdAt: Date;
}

export interface UserAttribute {
  id: number;
  userId: number;
  attributeKey: string;
  attributeValue: string;
  createdAt: Date;
}

export interface AccessCheckRequest {
  subject: string;
  object: string;
  action: string;
}

export interface AccessCheckResponse {
  allowed: boolean;
}

export interface PoliciesResponse {
  policies: string[][];
  roles: string[][];
}
