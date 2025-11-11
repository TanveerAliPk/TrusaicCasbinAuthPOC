import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CasbinService } from '../../services/casbin.service';
import { AccessCheckResponse } from '../../models';

/**
 * AccessCheckerComponent
 * Tests access control policies in real-time
 */
@Component({
  selector: 'app-access-checker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="access-checker-container">
      <h2>Access Control Checker</h2>
      <p class="subtitle">Test if a subject can perform an action on an object</p>

      <div class="checker-layout">
        <!-- Input Form -->
        <div class="input-section">
          <h3>Check Access</h3>
          <div class="form-group">
            <label>Subject (e.g., user1, admin)</label>
            <input [(ngModel)]="checkRequest.subject" type="text" placeholder="Subject" />
          </div>
          <div class="form-group">
            <label>Object (e.g., resource1, /api/data)</label>
            <input [(ngModel)]="checkRequest.object" type="text" placeholder="Object" />
          </div>
          <div class="form-group">
            <label>Action (e.g., read, write, delete)</label>
            <input [(ngModel)]="checkRequest.action" type="text" placeholder="Action" />
          </div>
          <button (click)="checkAccess()" [disabled]="isLoading">
            {{ isLoading ? 'Checking...' : 'Check Access' }}
          </button>
        </div>

        <!-- Result Display -->
        <div class="result-section">
          <div *ngIf="!hasResult" class="no-result">
            <p>Fill in the form and click "Check Access" to test authorization</p>
          </div>
          <div *ngIf="hasResult && result?.allowed" class="result allowed">
            <div class="result-icon">✓</div>
            <div class="result-title">Access Allowed</div>
            <div class="result-message">
              {{ checkRequest.subject }} can {{ checkRequest.action }} {{ checkRequest.object }}
            </div>
          </div>
          <div *ngIf="hasResult && !result?.allowed" class="result denied">
            <div class="result-icon">✗</div>
            <div class="result-title">Access Denied</div>
            <div class="result-message">
              {{ checkRequest.subject }} cannot {{ checkRequest.action }} {{ checkRequest.object }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .access-checker-container {
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }

    h2 {
      color: #1f2937;
      margin-bottom: 10px;
    }

    .subtitle {
      color: #6b7280;
      margin-bottom: 20px;
      font-size: 14px;
    }

    .checker-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    @media (max-width: 768px) {
      .checker-layout {
        grid-template-columns: 1fr;
      }
    }

    .input-section, .result-section {
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }

    h3 {
      color: #374151;
      margin-bottom: 15px;
      font-size: 16px;
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

    input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }

    input:focus {
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

    .no-result {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      color: #6b7280;
      text-align: center;
    }

    .result {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      border-radius: 8px;
      padding: 20px;
    }

    .result.allowed {
      background-color: #d1fae5;
      border: 2px solid #10b981;
    }

    .result.denied {
      background-color: #fee2e2;
      border: 2px solid #ef4444;
    }

    .result-icon {
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .result.allowed .result-icon {
      color: #065f46;
    }

    .result.denied .result-icon {
      color: #7f1d1d;
    }

    .result-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .result.allowed .result-title {
      color: #065f46;
    }

    .result.denied .result-title {
      color: #7f1d1d;
    }

    .result-message {
      font-size: 14px;
      text-align: center;
    }

    .result.allowed .result-message {
      color: #047857;
    }

    .result.denied .result-message {
      color: #991b1b;
    }
  `]
})
export class AccessCheckerComponent {
  checkRequest = {
    subject: '',
    object: '',
    action: ''
  };

  result: AccessCheckResponse | null = null;
  hasResult = false;
  isLoading = false;

  constructor(private casbinService: CasbinService) {}

  checkAccess(): void {
    if (!this.checkRequest.subject || !this.checkRequest.object || !this.checkRequest.action) {
      alert('Please fill in all fields');
      return;
    }

    this.isLoading = true;
    this.casbinService.checkAccess(this.checkRequest).subscribe({
      next: (data) => {
        this.result = data;
        this.hasResult = true;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error checking access:', error);
        alert('Error checking access');
        this.isLoading = false;
      }
    });
  }
}
