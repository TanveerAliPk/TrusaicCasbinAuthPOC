import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CasbinService } from '../../services/casbin.service';
import { User, UserAttribute } from '../../models';

/**
 * AttributesComponent
 * Manages user attributes for ABAC
 */
@Component({
  selector: 'app-attributes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="attributes-container">
      <h2>User Attributes Management</h2>

      <!-- Set Attribute Form -->
      <div class="form-section">
        <h3>Set User Attribute</h3>
        <div class="form-group">
          <label>Select User</label>
          <select [(ngModel)]="selectedUserId" (change)="onUserSelected()">
            <option [value]="null">Choose a user...</option>
            <option *ngFor="let user of users" [value]="user.id">
              {{ user.name || user.email || 'User ' + user.id }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Attribute Key (e.g., department, level)</label>
          <input [(ngModel)]="newAttribute.key" type="text" placeholder="Key" />
        </div>
        <div class="form-group">
          <label>Attribute Value (e.g., Engineering, Senior)</label>
          <input [(ngModel)]="newAttribute.value" type="text" placeholder="Value" />
        </div>
        <button (click)="setAttribute()" [disabled]="isLoading || !selectedUserId">
          {{ isLoading ? 'Setting...' : 'Set Attribute' }}
        </button>
      </div>

      <!-- User Attributes List -->
      <div class="list-section">
        <h3>User Attributes</h3>
        <div *ngIf="!selectedUserId" class="empty">Select a user to view their attributes</div>
        <div *ngIf="selectedUserId && !attributesLoaded" class="loading">Loading attributes...</div>
        <div *ngIf="selectedUserId && attributesLoaded && attributes.length === 0" class="empty">
          No attributes set for this user
        </div>
        <div *ngIf="selectedUserId && attributesLoaded && attributes.length > 0" class="attributes-list">
          <div *ngFor="let attr of attributes" class="attribute-item">
            <div class="attribute-key">{{ attr.attributeKey }}</div>
            <div class="attribute-value">{{ attr.attributeValue }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .attributes-container {
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
      width: 100%;
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

    .attributes-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .attribute-item {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 15px;
      padding: 12px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
    }

    .attribute-key {
      font-weight: 600;
      color: #1f2937;
      word-break: break-word;
    }

    .attribute-value {
      color: #4b5563;
      word-break: break-word;
    }
  `]
})
export class AttributesComponent implements OnInit {
  users: User[] = [];
  attributes: UserAttribute[] = [];
  selectedUserId: number | null = null;
  attributesLoaded = false;
  isLoading = false;

  newAttribute = {
    key: '',
    value: ''
  };

  constructor(private casbinService: CasbinService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.casbinService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  onUserSelected(): void {
    if (this.selectedUserId) {
      this.loadAttributes();
    }
  }

  loadAttributes(): void {
    if (!this.selectedUserId) return;

    this.attributesLoaded = false;
    this.casbinService.getUserAttributes(this.selectedUserId).subscribe({
      next: (data) => {
        this.attributes = data;
        this.attributesLoaded = true;
      },
      error: (error) => {
        console.error('Error loading attributes:', error);
        this.attributesLoaded = true;
      }
    });
  }

  setAttribute(): void {
    if (!this.selectedUserId || !this.newAttribute.key || !this.newAttribute.value) {
      alert('Please select user and fill in attribute fields');
      return;
    }

    this.isLoading = true;
    this.casbinService.setUserAttribute(
      this.selectedUserId,
      this.newAttribute.key,
      this.newAttribute.value
    ).subscribe({
      next: () => {
        alert('Attribute set successfully');
        this.newAttribute = { key: '', value: '' };
        this.loadAttributes();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error setting attribute:', error);
        alert('Error setting attribute');
        this.isLoading = false;
      }
    });
  }
}
