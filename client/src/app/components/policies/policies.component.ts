import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CasbinService } from '../../services/casbin.service';
import { Policy } from '../../models';

/**
 * PoliciesComponent
 * Manages RBAC and ABAC policies
 * Simple, focused component with clear responsibilities
 */
@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="policies-container">
      <h2>Policy Management</h2>

      <!-- Add Policy Form -->
      <div class="form-section">
        <h3>Add New Policy</h3>
        <div class="form-group">
          <label>Subject (e.g., user1, admin)</label>
          <input [(ngModel)]="newPolicy.subject" type="text" placeholder="Subject" />
        </div>
        <div class="form-group">
          <label>Object (e.g., resource1, /api/data)</label>
          <input [(ngModel)]="newPolicy.object" type="text" placeholder="Object" />
        </div>
        <div class="form-group">
          <label>Action (e.g., read, write, delete)</label>
          <input [(ngModel)]="newPolicy.action" type="text" placeholder="Action" />
        </div>
        <div class="form-group">
          <label>Effect</label>
          <select [(ngModel)]="newPolicy.effect">
            <option value="allow">Allow</option>
            <option value="deny">Deny</option>
          </select>
        </div>
        <button (click)="addPolicy()" [disabled]="isLoading">
          {{ isLoading ? 'Adding...' : 'Add Policy' }}
        </button>
      </div>

      <!-- Policies List -->
      <div class="list-section">
        <h3>Current Policies</h3>
        <div *ngIf="!policiesLoaded" class="loading">Loading policies...</div>
        <div *ngIf="policiesLoaded && policies.length === 0" class="empty">No policies defined yet</div>
        <div *ngIf="policiesLoaded && policies.length > 0" class="policies-list">
          <div *ngFor="let policy of policies; let i = index" class="policy-item">
            <div class="policy-content">
              <strong>{{ policy[0] }}</strong> → <strong>{{ policy[1] }}</strong> : <strong>{{ policy[2] }}</strong>
              <span class="effect" [class.allow]="policy[3] === 'allow'" [class.deny]="policy[3] === 'deny'">
                {{ policy[3] }}
              </span>
            </div>
            <button (click)="deletePolicy(i)" class="delete-btn">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .policies-container {
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }

    h2 {
      color: #1f2937;
      margin-bottom: 20px;
    }

    h3 {
      color: #374151;
      margin-bottom: 15px;
      font-size: 16px;
    }

    .form-section, .list-section {
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      border: 1px solid #e5e7eb;
    }

    .form-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      color: #4b5563;
      font-size: 14px;
      font-weight: 500;
    }

    input, select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }

    input:focus, select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    button {
      padding: 10px 20px;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    button:hover:not(:disabled) {
      background-color: #2563eb;
    }

    button:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }

    .loading, .empty {
      padding: 20px;
      text-align: center;
      color: #6b7280;
    }

    .policies-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .policy-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
    }

    .policy-content {
      flex: 1;
      font-size: 14px;
    }

    .effect {
      margin-left: 10px;
      padding: 2px 8px;
      border-radius: 3px;
      font-size: 12px;
      font-weight: 600;
    }

    .effect.allow {
      background-color: #d1fae5;
      color: #065f46;
    }

    .effect.deny {
      background-color: #fee2e2;
      color: #7f1d1d;
    }

    .delete-btn {
      padding: 6px 12px;
      background-color: #ef4444;
      font-size: 12px;
      margin-left: 10px;
    }

    .delete-btn:hover {
      background-color: #dc2626;
    }
  `]
})
export class PoliciesComponent implements OnInit {
  policies: string[][] = [];
  policiesLoaded = false;
  isLoading = false;

  newPolicy: Policy = {
    policyType: 'p',
    subject: '',
    object: '',
    action: '',
    effect: 'allow'
  };

  constructor(private casbinService: CasbinService) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.policiesLoaded = false;
    this.casbinService.getPolicies().subscribe({
      next: (data) => {
        this.policies = data.policies;
        this.policiesLoaded = true;
      },
      error: (error) => {
        console.error('Error loading policies:', error);
        this.policiesLoaded = true;
      }
    });
  }

  addPolicy(): void {
    if (!this.newPolicy.subject || !this.newPolicy.object || !this.newPolicy.action) {
      alert('Please fill in all fields');
      return;
    }

    this.isLoading = true;
    this.casbinService.addPolicy(this.newPolicy).subscribe({
      next: () => {
        alert('Policy added successfully');
        this.newPolicy = { policyType: 'p', subject: '', object: '', action: '', effect: 'allow' };
        this.loadPolicies();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error adding policy:', error);
        alert('Error adding policy');
        this.isLoading = false;
      }
    });
  }

  deletePolicy(index: number): void {
    if (confirm('Are you sure you want to delete this policy?')) {
      this.isLoading = true;
      this.casbinService.deletePolicy(index).subscribe({
        next: () => {
          alert('Policy deleted successfully');
          this.loadPolicies();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting policy:', error);
          alert('Error deleting policy');
          this.isLoading = false;
        }
      });
    }
  }
}
