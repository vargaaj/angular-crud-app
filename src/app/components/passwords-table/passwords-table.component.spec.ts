import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordsTableComponent } from './passwords-table.component';

describe('PasswordsTableComponent', () => {
  let component: PasswordsTableComponent;
  let fixture: ComponentFixture<PasswordsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
