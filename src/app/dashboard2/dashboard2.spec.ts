import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard2 } from './dashboard2';

describe('Dashboard2', () => {
  let component: Dashboard2;
  let fixture: ComponentFixture<Dashboard2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashboard2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
