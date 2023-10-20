import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../alerts.service';
import { ApiService } from '../utils/api.service';

@Component({
  selector: 'app-image-groups',
  templateUrl: './image-groups.component.html',
  styleUrls: ['./image-groups.component.scss'],
})
export class ImageGroupsComponent implements OnInit {
  groups: { id: string; name: string; variants: string[] }[] = [];

  constructor(
    private alertsService: AlertsService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService
      .listImageGroups()
      .subscribe((groups) => (this.groups = groups));
  }

  deleteGroup(id: string) {
    this.apiService.deleteImageGroup(id).subscribe(() => {
      this.apiService
        .listImageGroups()
        .subscribe((groups) => (this.groups = groups));
      this.alertsService.success(`Group has been deleted.`);
    });
  }
}
