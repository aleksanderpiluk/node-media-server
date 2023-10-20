import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../alerts.service';
import { ApiService } from '../utils/api.service';

@Component({
  selector: 'app-image-group-variant-add',
  templateUrl: './image-group-variant-add.component.html',
  styleUrls: ['./image-group-variant-add.component.scss'],
})
export class ImageGroupVariantAddComponent implements OnInit {
  isEditMode = false;

  addForm = this.formBuilder.group({
    name: '',
    fit: 'cover',
    width: 0,
    height: 0,
  });

  constructor(
    private apiService: ApiService,
    private alertsService: AlertsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSubmit() {
    const { name, fit, width, height } = this.addForm.value;
    const routeParams = this.route.snapshot.paramMap;

    const id = String(routeParams.get('id'));

    if (!name) throw new Error('Name is undefined');
    if (!fit) throw new Error('Fit is undefined');
    if (!width) throw new Error('Width is undefined');
    if (!height) throw new Error('Height is undefined');

    const checkFit = (
      fit: string
    ): fit is 'cover' | 'contain' | 'fill' | 'inside' | 'outside' => {
      if (!['cover', 'contain', 'fill', 'inside', 'outside'].includes(fit)) {
        return false;
      }

      return true;
    };

    if (!checkFit(fit)) {
      throw new Error('Fit is not supported value.');
    }

    this.addForm.reset();
    this.apiService
      .addImageGroupVariant(id, { name, fit, width, height })
      .subscribe(() => {
        this.router.navigate(['/image-groups/edit', id]);

        this.alertsService.success(
          `Variant <strong>${name}</strong> has been created.`
        );
      });
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;

    const id = String(routeParams.get('id'));
    const variant = routeParams.get('variant')
      ? String(routeParams.get('variant'))
      : null;
    this.isEditMode = variant !== null;

    if (variant) {
      this.apiService.getImageGroupVariant(id, variant).subscribe((variant) => {
        this.addForm.setValue({
          ...variant,
        });
      });
    }
  }
}
