import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocumentComponentComponent } from './create-document-component.component';

describe('CreateDocumentComponentComponent', () => {
  let component: CreateDocumentComponentComponent;
  let fixture: ComponentFixture<CreateDocumentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDocumentComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDocumentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
