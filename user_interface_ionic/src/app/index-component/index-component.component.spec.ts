import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponentComponent } from './index-component.component';

describe('IndexComponentComponent', () => {
  let component: IndexComponentComponent;
  let fixture: ComponentFixture<IndexComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
