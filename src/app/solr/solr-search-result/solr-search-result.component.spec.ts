import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolrSearchResultComponent } from './solr-search-result.component';

describe('SolrSearchResultComponent', () => {
  let component: SolrSearchResultComponent;
  let fixture: ComponentFixture<SolrSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolrSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolrSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
