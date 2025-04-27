import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Prism from 'prismjs';
import { FormioRefreshValue } from '@formio/angular';
import { Formio } from 'formiojs'
import { FormService } from '@sparrowmini/org-api';
import { KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css'],
})
export class FormCreateComponent implements OnInit {
  window = window;
  columns: any[] = []
  save() {
    this.formGroup.patchValue({ form: JSON.stringify(this.formJson) });
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (this.formGroup.value.id) {
        this.formService
          .updateDataForm(this.formGroup.value, this.formGroup.value.id)
          .subscribe(() => window.history.back());
      } else {
        this.formService
          .createDataForm(this.formGroup.value)
          .subscribe((res) => {
            window.history.back();
          });
      }
    }
  }
  formJson: any;
  formOptions:any = {
    // fileService: this.formioFileService,
    request: (type, url, data, options) => {
      return this.keycloakService.getToken().then(
        token => {
          console.log('222')
          return Formio.makeStaticRequest( url,type, data, {
            ...options,
            headers: {
              ...(options?.headers || {}),
              'authorization': 'Bearer ' + token
            }
          });
        })
    }
  }

  /**
   * use in the client
   * // This is executed by Form.io to fetch data for the Select dropdown
values = Promise.resolve(
  options.request('POST','http://localhost:8081/dengbo-service/materials/filter?page=0&size=20',[],
  {
    headers: {
    'Content-Type': 'application/json'
  }}).then(res=>res.content.map(m=>{
    return {
      label: m.name,
      value: m.code
    }
  }))
  );

   */
  formGroup: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    code: [null, Validators.required],
    id: [null],
    form: [{ components: [] }, Validators.required],
    displayColumns: [null],
  });

  @ViewChild('json', { static: true }) jsonElement?: ElementRef;
  @ViewChild('code', { static: true }) codeElement?: ElementRef;
  public form: any = { components: [] };
  public refreshForm: EventEmitter<FormioRefreshValue> = new EventEmitter();

  constructor(
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private keycloakService: KeycloakService,
    // private formioFileService: CosFileService,

  ) {
    this.form = { components: [] };
    this.formJson = { components: [] };
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.formService.dataForm(params.id).subscribe((res) => {
          this.formGroup.patchValue(res);
          console.log(res, this.formGroup.value);
          console.log('-------', Formio.providers)

          this.form = JSON.parse(res.form!);
          this.formJson = this.form;

          let a: any[] = this.form.components.filter(f => f.widget && f.widget.type == 'input').map(m => Object.assign({}, { name: m.label, code: m.key }))
          this.columns = a
        });
      }
    });
  }

  onChange(event: any) {
    // this.formJson = event.form;
    console.log("888888888", this.formJson)
    let a: any[] = this.formJson.components.filter(f => f.widget && f.widget.type == 'input').map(m => Object.assign({}, { name: m.label, code: m.key }))
    this.columns = a
    console.log(this.columns)
    // this.refreshForm.emit({
    //   property: 'form',
    //   value: event.form,
    // });
  }

  @ViewChild('formbuilder') formbuilder: any
  ngAfterViewInit() {
    Prism.highlightAll();

  }


  @ViewChild('soruceCode') soruceCodeTemplate!: TemplateRef<any>;
  viewSource() {
    this.dialog.open(this.soruceCodeTemplate, { width: '80%', height: '80%' });
  }

  @ViewChild('preview') previewTemplate!: TemplateRef<any>;
  preview1() {
    this.dialog.open(this.previewTemplate, { width: '80%', height: '80%' });
  }
}
