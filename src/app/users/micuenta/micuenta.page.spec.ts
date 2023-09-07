import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MicuentaPage } from './micuenta.page';

describe('MicuentaPage', () => {
  let component: MicuentaPage;
  let fixture: ComponentFixture<MicuentaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MicuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
