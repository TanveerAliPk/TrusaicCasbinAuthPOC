import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { PoliciesComponent } from '../policies/policies.component';
import { ResourcesComponent } from '../resources/resources.component';
import { AccessCheckerComponent } from '../access-checker/access-checker.component';
import { AttributesComponent } from '../attributes/attributes.component';
import { User } from '../../models';

/**
 * DashboardComponent
 * Main dashboard layout with tab navigation
 * Simple architecture: manages tabs and displays appropriate component
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PoliciesComponent,
    ResourcesComponent,
    AccessCheckerComponent,
    AttributesComponent
  ],
  template: `
    <div class="dashboard">
      <!-- Header -->
      <header class="header">
        <div class="header-content">
          <div class="logo-section">
            <div class="logo">C</div>
            <h1>Casbin POC</h1>
          </div>
          <div class="user-section">
            <span *ngIf="currentUser" class="user-name">{{ currentUser.name || currentUser.email }}</span>
            <button (click)="logout()" class="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Tab Navigation -->
        <nav class="tabs">
          <button
            *ngFor="let tab of tabs"
            [class.active]="activeTab === tab.id"
            (click)="activeTab = tab.id"
            class="tab-button"
          >
            {{ tab.label }}
          </button>
        </nav>

        <!-- Tab Content -->
        <div class="tab-content">
          <app-policies *ngIf="activeTab === 'policies'"></app-policies>
          <app-resources *ngIf="activeTab === 'resources'"></app-resources>
          <app-attributes *ngIf="activeTab === 'attributes'"></app-attributes>
          <app-access-checker *ngIf="activeTab === 'access-check'"></app-access-checker>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      min-height: 100vh;
      background-color: #f3f4f6;
      display: flex;
      flex-direction: column;
    }

    .header {
      background-color: #1f2937;
      color: white;
      padding: 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 20px;
    }

    h1 {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
    }

    .user-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .user-name {
      font-size: 14px;
      color: #d1d5db;
    }

    .logout-btn {
      padding: 8px 16px;
      background-color: #ef4444;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .logout-btn:hover {
      background-color: #dc2626;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .tabs {
      background-color: white;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      gap: 0;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
      padding: 0 20px;
    }

    .tab-button {
      padding: 16px 20px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      color: #6b7280;
      border-bottom: 3px solid transparent;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .tab-button:hover {
      color: #1f2937;
    }

    .tab-button.active {
      color: #3b82f6;
      border-bottom-color: #3b82f6;
    }

    .tab-content {
      flex: 1;
      background-color: white;
      overflow-y: auto;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 12px;
      }

      .tabs {
        overflow-x: auto;
      }

      .tab-button {
        padding: 12px 16px;
        font-size: 13px;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  activeTab = 'policies';
  currentUser: User | null = null;

  tabs = [
    { id: 'policies', label: 'Policies' },
    { id: 'resources', label: 'Resources' },
    { id: 'attributes', label: 'Attributes' },
    { id: 'access-check', label: 'Access Check' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        window.location.href = '/';
      },
      error: (error) => {
        console.error('Error logging out:', error);
      }
    });
  }
}
