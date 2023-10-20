import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatusComponent } from './status/status.component';
import { ImageGroupsComponent } from './image-groups/image-groups.component';
import { ImagesComponent } from './images/images.component';
import { ImageGroupAddComponent } from './image-group-add/image-group-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageGroupEditComponent } from './image-group-edit/image-group-edit.component';
import { ImageGroupVariantAddComponent } from './image-group-variant-add/image-group-variant-add.component';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    ImageGroupsComponent,
    ImagesComponent,
    ImageGroupAddComponent,
    ImageGroupEditComponent,
    ImageGroupVariantAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
