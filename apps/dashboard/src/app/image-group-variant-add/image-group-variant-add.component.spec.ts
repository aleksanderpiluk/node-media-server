import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGroupVariantAddComponent } from './image-group-variant-add.component';

describe('ImageGroupVariantAddComponent', () => {
  let component: ImageGroupVariantAddComponent;
  let fixture: ComponentFixture<ImageGroupVariantAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageGroupVariantAddComponent]
    });
    fixture = TestBed.createComponent(ImageGroupVariantAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
