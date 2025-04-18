import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormService, SparrowFormData } from "@sparrowmini/org-api";
import { CosFileService } from "../../services/cos-file.service";

@Component({
  selector: "app-form-data-view",
  templateUrl: "./form-data-view.component.html",
  styleUrls: ["./form-data-view.component.css"],
})
export class FormDataViewComponent implements OnInit {
  window=window
  sparrowFormData: SparrowFormData = {}
  form: any;
  formData: any;
  formName: string = "";
  formOptions = {
    fileService: this.formioFileService,
  }

  constructor(
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private formioFileService: CosFileService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.formService.formData1(params.id).subscribe((res) => {
          this.sparrowFormData = res
          this.form = JSON.parse(res.form?.form!);
          this.formData = { data: JSON.parse(res.data!) };
          this.formName = res.form?.name!;
        });
      }
    });
  }
}
