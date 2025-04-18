import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCatalogComponent } from './article-catalog.component';

describe('ArticleCatalogComponent', () => {
  let component: ArticleCatalogComponent;
  let fixture: ComponentFixture<ArticleCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
