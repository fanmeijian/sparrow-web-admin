import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleRouteComponent } from './article-route.component';

describe('ArticleRouteComponent', () => {
  let component: ArticleRouteComponent;
  let fixture: ComponentFixture<ArticleRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
