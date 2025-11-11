import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CasbinService } from '../../services/casbin.service';
import { Resource } from '../../models';

/**
 * ResourcesComponent
 * Manages resources in the system
 */
@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="resources-container">
      <h2>Resource Management</h2>

      <!-- Create Resource Form -->
      <div class="form-section">
        <h3>Create New Resource</h3>
        <div class="form-group">
          <label>Resource Name</label>
          <input [(ngModel)]="newResource.name" type="text" placeholder="Resource name" />
        </div>
        <div class="form-group">
          <label>Resource Type (e.g., document, database)</label>
          <input [(ngModel)]="newResource.resourceType" type="text" placeholder="Type" />
        </div>
        <div class="form-group">
          <label>Department</label>
          <input [(ngModel)]="newResource.department" type="text" placeholder="Department" />
        </div>
        <div class="form-group">
          <label>Classification</label>
          <select [(ngModel)]="newResource.classification">
            <option value="public">Public</option>
            <option value="internal">Internal</option>
            <option value="confidential">Confidential</option>
            <option value="secret">Secret</option>
          </select>
        </div>
        <button (click)="createResource()" [disabled]="isLoading">
          {{ isLoading ? 'Creating...' : 'Create Resource' }}
        </button>
      </div>

      <!-- Resources List -->
      <div class="list-section">
        <h3>Available Resources</h3>
        <div *ngIf="!resourcesLoaded" class="loading">Loading resources...</div>
        <div *ngIf="resourcesLoaded && resources.length === 0" class="empty">No resources created yet</div>
        <div *ngIf="resourcesLoaded && resources.length > 0" class="resources-list">
          <div *ngFor="let resource of resources" class="resource-item">
            <div class="resource-header">
              <strong>{{ resource.name }}</strong>
            </div>
            <div class="resource-details">
              <span class="detail">Type: <strong>{{ resource.resourceType }}</strong></span>
              <span *ngIf="resource.department" class="detail">Dept: <strong>{{ resource.department }}</strong></span>
              <span class="detail classification" [class]="resource.classification">
                {{ resource.classification | uppercase }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .resources-container {
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

    .resources-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .resource-item {
      padding: 12px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
    }

    .resource-header {
      margin-bottom: 8px;
      font-size: 15px;
    }

    .resource-details {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      font-size: 13px;
      color: #6b7280;
    }

    .detail {
      display: inline-block;
    }

    .classification {
      padding: 3px 8px;
      border-radius: 3px;
      font-weight: 600;
      color: white;
    }

    .classification.public {
      background-color: #10b981;
    }

    .classification.internal {
      background-color: #3b82f6;
    }

    .classification.confidential {
      background-color: #f59e0b;
    }

    .classification.secret {
      background-color: #ef4444;
    }
  `]
})
export class ResourcesComponent implements OnInit {
  resources: Resource[] = [];
  resourcesLoaded = false;
  isLoading = false;

  newResource = {
    name: '',
    resourceType: '',
    department: '',
    classification: 'public' as const
  };

  constructor(private casbinService: CasbinService) {}

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(): void {
    this.resourcesLoaded = false;
    this.casbinService.getResources().subscribe({
      next: (data) => {
        this.resources = data;
        this.resourcesLoaded = true;
      },
      error: (error) => {
        console.error('Error loading resources:', error);
        this.resourcesLoaded = true;
      }
    });
  }

  createResource(): void {
    if (!this.newResource.name || !this.newResource.resourceType) {
      alert('Please fill in required fields');
      return;
    }

    this.isLoading = true;
    this.casbinService.createResource(this.newResource).subscribe({
      next: () => {
        alert('Resource created successfully');
        this.newResource = { name: '', resourceType: '', department: '', classification: 'public' };
        this.loadResources();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error creating resource:', error);
        alert('Error creating resource');
        this.isLoading = false;
      }
    });
  }
}
