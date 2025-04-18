import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCatalogComponent } from './forum-catalog.component';

describe('ForumCatalogComponent', () => {
  let component: ForumCatalogComponent;
  let fixture: ComponentFixture<ForumCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
