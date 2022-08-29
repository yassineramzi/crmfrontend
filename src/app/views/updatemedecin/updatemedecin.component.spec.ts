import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemedecinComponent } from './updatemedecin.component';

describe('UpdatemedecinComponent', () => {
  let component: UpdatemedecinComponent;
  let fixture: ComponentFixture<UpdatemedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatemedecinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatemedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
