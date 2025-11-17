import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mahasiswa } from './mahasiswa';

describe('Mahasiswa', () => {
  let component: Mahasiswa;
  let fixture: ComponentFixture<Mahasiswa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mahasiswa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mahasiswa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
