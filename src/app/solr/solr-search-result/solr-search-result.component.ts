import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BASE_PATH } from '@sparrowmini/org-api';

@Component({
  selector: 'app-solr-search-result',
  templateUrl: './solr-search-result.component.html',
  styleUrls: ['./solr-search-result.component.css']
})
export class SolrSearchResultComponent implements OnInit {
  open(_t3: any) {
    let catalog = _t3.split('|')
    switch (catalog[0]) {
      case 'FORM_DATA':
        this.router.navigate(['/admin/form/form-data-view'], { queryParams: { id: catalog[1] } })
        break;
    }
  }
  sresult: any[] = []

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    @Optional() @Inject(BASE_PATH) private basePath: string
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: any) => {
      let body = {
        // omitHeader: true,
        q: params.q,
        // fl: '*,[child]'
      }
      this.httpClient.post(this.basePath + '/solr-search/collections/form_data_search', body).subscribe((res: any) => {
        // this.sresult = res.data.body.map((k:any,v:any)=> v[0])
        this.sresult = res.data
        console.log('sresult', this.sresult)

      })
    })

  }

}
