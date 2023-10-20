import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { ImageGroupsComponent } from './image-groups/image-groups.component';
import { ImagesComponent } from './images/images.component';
import { ImageGroupAddComponent } from './image-group-add/image-group-add.component';
import { ImageGroupEditComponent } from './image-group-edit/image-group-edit.component';
import { ImageGroupVariantAddComponent } from './image-group-variant-add/image-group-variant-add.component';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'status',
    redirectTo: 'image-groups',
    pathMatch: 'full',
  },
  {
    path: 'status',
    component: StatusComponent,
  },
  {
    path: 'image-groups',
    component: ImageGroupsComponent,
  },
  {
    path: 'image-groups/add',
    component: ImageGroupAddComponent,
  },
  {
    path: 'image-groups/edit/:id',
    component: ImageGroupEditComponent,
  },
  {
    path: 'image-groups/edit/:id/add-variant',
    component: ImageGroupVariantAddComponent,
  },
  {
    path: 'image-groups/edit/:id/edit-variant/:variant',
    component: ImageGroupVariantAddComponent,
  },
  {
    path: 'images',
    component: ImagesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
