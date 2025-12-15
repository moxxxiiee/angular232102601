import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cuaca } from './cuaca';

describe('Cuaca', () => {
  let component: Cuaca;
  let fixture: ComponentFixture<Cuaca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cuaca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cuaca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
