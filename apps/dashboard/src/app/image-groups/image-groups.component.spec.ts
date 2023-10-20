import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGroupsComponent } from './image-groups.component';

describe('ImageGroupsComponent', () => {
  let component: ImageGroupsComponent;
  let fixture: ComponentFixture<ImageGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageGroupsComponent]
    });
    fixture = TestBed.createComponent(ImageGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
