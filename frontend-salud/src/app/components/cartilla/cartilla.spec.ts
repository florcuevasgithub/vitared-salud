import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cartilla } from './cartilla.component';

describe('Cartilla', () => {
  let component: Cartilla;
  let fixture: ComponentFixture<Cartilla>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cartilla]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cartilla);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
