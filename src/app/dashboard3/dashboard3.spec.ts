import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard3 } from './dashboard3';

describe('Dashboard3', () => {
  let component: Dashboard3;
  let fixture: ComponentFixture<Dashboard3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashboard3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
