import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmedecinComponent } from './addmedecin.component';

describe('AddmedecinComponent', () => {
  let component: AddmedecinComponent;
  let fixture: ComponentFixture<AddmedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmedecinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
