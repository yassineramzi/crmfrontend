import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocieteComponent } from './societe.component';

describe('SocieteComponent', () => {
  let component: SocieteComponent;
  let fixture: ComponentFixture<SocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocieteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
