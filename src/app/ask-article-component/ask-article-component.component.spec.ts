import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskArticleComponentComponent } from './ask-article-component.component';

describe('AskArticleComponentComponent', () => {
  let component: AskArticleComponentComponent;
  let fixture: ComponentFixture<AskArticleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskArticleComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AskArticleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
