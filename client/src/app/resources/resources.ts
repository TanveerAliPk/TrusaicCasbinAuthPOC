import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CasbinService, Resource } from '../casbin.service';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resources.html',
  styleUrl: './resources.css',
})
export class ResourcesComponent implements OnInit {
  resources: Resource[] = [];
  newResource: Resource = {
    name: '',
    resourceType: '',
    department: '',
    classification: '',
    ownerId: 0
  };

  constructor(private casbinService: CasbinService) { }

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources() {
    this.casbinService.getResources().subscribe({
      next: (data) => this.resources = data,
      error: (err) => console.error('Failed to load resources', err)
    });
  }

  addResource() {
    this.casbinService.addResource(this.newResource).subscribe({
      next: () => {
        this.loadResources();
        // Reset form
        this.newResource = { name: '', resourceType: '', department: '', classification: '', ownerId: 0 };
      },
      error: (err) => alert('Failed to add resource: ' + err.message)
    });
  }
}
