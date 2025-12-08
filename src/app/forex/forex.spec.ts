import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forex } from './forex';

describe('Forex', () => {
  let component: Forex;
  let fixture: ComponentFixture<Forex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Forex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Forex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
