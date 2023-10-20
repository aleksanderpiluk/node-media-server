import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '../alerts.service';
import { ApiService } from '../utils/api.service';

@Component({
  selector: 'app-image-group-add',
  templateUrl: './image-group-add.component.html',
  styleUrls: ['./image-group-add.component.scss'],
})
export class ImageGroupAddComponent {
  addForm = this.formBuilder.group({
    name: '',
  });

  constructor(
    private apiService: ApiService,
    private alertsService: AlertsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  onSubmit() {
    const { name } = this.addForm.value;
    if (!name) return;

    this.addForm.reset();
    this.apiService.addImageGroup(name).subscribe(() => {
      this.router.navigate(['/image-groups']);
      this.alertsService.success(
        `Group <strong>${name}</strong> has been created.`
      );
    });
  }
}
