import { Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BASE_PATH, FormService } from '@sparrowmini/org-api';
import { HttpClient } from '@angular/common/http';
import { CosFileService } from '../../services/cos-file.service';

@Component({
  selector: 'app-form-data-create',
  templateUrl: './form-data-create.component.html',
  styleUrls: ['./form-data-create.component.css']
})
export class FormDataCreateComponent implements OnInit {
  form: any;
  formId: string='';

  formOptions = {
    fileService: this.formioFileService,
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private formService: FormService,
    private formioFileService: CosFileService,
    private http: HttpClient,
    @Optional() @Inject(BASE_PATH) private basePath: string,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params:any)=>{
      if(params.id){
        this.formService.formData(params.id).subscribe(res=>{
          this.form = JSON.parse(res.form?.form!)
          this.formId = res.formId
        })
      }
      if(params.formId){
        this.formService.dataForm(params.formId).subscribe(res=>{
          this.form=JSON.parse(res.form!)
          this.formId = res.id
        })
      }
    })
  }

  onSubmit(e: any){
    console.log("e.data",e.data)
    this.formService.saveFormData(e.data,this.formId).subscribe(
      res=>{
        this.http.post(this.basePath+'/contracts/'+res.data+'/attachments/index',e.data).subscribe()
        window.history.back()
      }
    )

  }

  @ViewChild('formIo') formIo!: ElementRef<any>
  submit(){
    // this.formIo.formioElement.nativeElement.submit()
    // this.formIo['formio'].submit()
    // console.log(this.formIo['formio'].submit())
    // console.log(this.formIo.formioElement.nativeElement)
    // this.formIo.formioElement.nativeElement.submit();
  }

}
