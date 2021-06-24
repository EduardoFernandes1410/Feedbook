import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbNavBarComponent } from './fb-nav-bar.component';

describe('FbNavBarComponent', () => {
  let component: FbNavBarComponent;
  let fixture: ComponentFixture<FbNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
