import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * HomeComponent
 * Landing page for unauthenticated users
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home">
      <!-- Navigation -->
      <nav class="navbar">
        <div class="nav-content">
          <div class="logo-section">
            <div class="logo">C</div>
            <h1>Casbin POC</h1>
          </div>
          <a href="/api/oauth/login" class="login-btn">Sign In</a>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h2>Casbin RBAC/ABAC Hybrid Authorization</h2>
          <p>Proof of Concept - Interactive Policy Management and Access Control Testing</p>
          <a href="/api/oauth/login" class="cta-button">Get Started</a>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features">
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🔐</div>
            <h3>RBAC Policies</h3>
            <p>Role-Based Access Control with hierarchical role inheritance and flexible policy definitions.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3>ABAC Attributes</h3>
            <p>Attribute-Based Access Control enabling fine-grained authorization based on user and resource attributes.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Hybrid Enforcement</h3>
            <p>Combined RBAC and ABAC policies for comprehensive authorization scenarios and real-world use cases.</p>
          </div>
        </div>
      </section>

      <!-- Key Features Section -->
      <section class="key-features">
        <h3>Key Features</h3>
        <div class="features-list">
          <div class="feature-item">
            <span class="check">✓</span>
            <div>
              <h4>Policy Management</h4>
              <p>Create, read, update, and delete authorization policies with visual feedback</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="check">✓</span>
            <div>
              <h4>Resource Management</h4>
              <p>Define and classify resources with department and security level attributes</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="check">✓</span>
            <div>
              <h4>User Attributes</h4>
              <p>Assign custom attributes to users for ABAC-based authorization decisions</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="check">✓</span>
            <div>
              <h4>Access Testing</h4>
              <p>Real-time access control verification with immediate allow/deny feedback</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Technical Stack Section -->
      <section class="tech-stack">
        <h3>Technical Stack</h3>
        <div class="stack-grid">
          <div class="stack-item">
            <h4>Backend</h4>
            <ul>
              <li>Express.js + tRPC for type-safe APIs</li>
              <li>Casbin for policy enforcement</li>
              <li>MySQL with Drizzle ORM</li>
              <li>JWT-based authentication</li>
            </ul>
          </div>
          <div class="stack-item">
            <h4>Frontend</h4>
            <ul>
              <li>Angular 20 with TypeScript</li>
              <li>Standalone components architecture</li>
              <li>RxJS for reactive programming</li>
              <li>Simple, easy-to-understand design</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home {
      min-height: 100vh;
      background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
      color: white;
    }

    .navbar {
      background-color: #0f172a;
      border-bottom: 1px solid #1e293b;
      padding: 16px 0;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
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

    .navbar h1 {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
    }

    .login-btn {
      padding: 8px 20px;
      background-color: #3b82f6;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .login-btn:hover {
      background-color: #2563eb;
    }

    .hero {
      max-width: 1200px;
      margin: 0 auto;
      padding: 80px 20px;
      text-align: center;
    }

    .hero-content h2 {
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 16px;
      line-height: 1.2;
    }

    .hero-content p {
      font-size: 20px;
      color: #cbd5e1;
      margin-bottom: 32px;
    }

    .cta-button {
      display: inline-block;
      padding: 12px 32px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 600;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
    }

    .features {
      max-width: 1200px;
      margin: 0 auto;
      padding: 60px 20px;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .feature-card {
      background-color: rgba(30, 41, 59, 0.5);
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 24px;
      text-align: center;
      transition: border-color 0.2s;
    }

    .feature-card:hover {
      border-color: #3b82f6;
    }

    .feature-icon {
      font-size: 40px;
      margin-bottom: 16px;
    }

    .feature-card h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .feature-card p {
      color: #cbd5e1;
      font-size: 14px;
      line-height: 1.6;
    }

    .key-features {
      max-width: 1200px;
      margin: 0 auto;
      padding: 60px 20px;
      background-color: rgba(30, 41, 59, 0.3);
      border-radius: 8px;
    }

    .key-features h3 {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 32px;
      text-align: center;
    }

    .features-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }

    .feature-item {
      display: flex;
      gap: 16px;
    }

    .check {
      color: #10b981;
      font-size: 24px;
      font-weight: bold;
      flex-shrink: 0;
    }

    .feature-item h4 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .feature-item p {
      color: #cbd5e1;
      font-size: 14px;
      line-height: 1.6;
    }

    .tech-stack {
      max-width: 1200px;
      margin: 0 auto;
      padding: 60px 20px;
    }

    .tech-stack h3 {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 32px;
      text-align: center;
    }

    .stack-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 32px;
    }

    .stack-item h4 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .stack-item ul {
      list-style: none;
      padding: 0;
    }

    .stack-item li {
      padding: 8px 0;
      color: #cbd5e1;
      font-size: 14px;
    }

    .stack-item li::before {
      content: '• ';
      color: #3b82f6;
      font-weight: bold;
      margin-right: 8px;
    }

    @media (max-width: 768px) {
      .hero-content h2 {
        font-size: 32px;
      }

      .hero-content p {
        font-size: 16px;
      }

      .hero {
        padding: 40px 20px;
      }
    }
  `]
})
export class HomeComponent {}
