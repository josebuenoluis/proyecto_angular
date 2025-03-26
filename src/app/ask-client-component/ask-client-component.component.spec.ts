import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskClientComponentComponent } from './ask-client-component.component';

describe('AskClientComponentComponent', () => {
  let component: AskClientComponentComponent;
  let fixture: ComponentFixture<AskClientComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskClientComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AskClientComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
