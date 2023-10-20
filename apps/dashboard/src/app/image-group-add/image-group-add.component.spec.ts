import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGroupAddComponent } from './image-group-add.component';

describe('ImageGroupAddComponent', () => {
  let component: ImageGroupAddComponent;
  let fixture: ComponentFixture<ImageGroupAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageGroupAddComponent]
    });
    fixture = TestBed.createComponent(ImageGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
