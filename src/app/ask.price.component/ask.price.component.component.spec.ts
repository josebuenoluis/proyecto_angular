import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskPriceComponentComponent } from './ask.price.component.component';

describe('AskPriceComponentComponent', () => {
  let component: AskPriceComponentComponent;
  let fixture: ComponentFixture<AskPriceComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskPriceComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AskPriceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
