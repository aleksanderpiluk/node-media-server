import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGroupEditComponent } from './image-group-edit.component';

describe('ImageGroupEditComponent', () => {
  let component: ImageGroupEditComponent;
  let fixture: ComponentFixture<ImageGroupEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageGroupEditComponent]
    });
    fixture = TestBed.createComponent(ImageGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
