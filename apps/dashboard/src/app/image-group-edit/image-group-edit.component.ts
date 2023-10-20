import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from '../alerts.service';
import { ApiService } from '../utils/api.service';

@Component({
  selector: 'app-image-group-edit',
  templateUrl: './image-group-edit.component.html',
  styleUrls: ['./image-group-edit.component.scss'],
})
export class ImageGroupEditComponent implements OnInit {
  group: { name: string; id: string; variants: any[] } | undefined;

  constructor(
    private apiService: ApiService,
    private alertsService: AlertsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getGroup();
  }

  deleteVariant(variant: string) {
    if (!this.group) throw new Error('Group is undefined.');
    this.apiService
      .deleteImageGroupVariant(this.group.id, variant)
      .subscribe(() => {
        this.getGroup();
        this.alertsService.success(
          `Variant <strong>${variant}</strong> has been deleted.`
        );
      });
  }

  getGroup() {
    const routeParams = this.route.snapshot.paramMap;
    const id = String(routeParams.get('id'));

    this.apiService.getImageGroup(id).subscribe((result) => {
      console.log(result);
      this.group = result;
    });
  }
}
