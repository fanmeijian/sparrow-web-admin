import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import COS from 'cos-js-sdk-v5';
import { Md5 } from 'ts-md5';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';
import { BASE_PATH, Configuration } from '@sparrowmini/org-api';
import { TxcosUploadService } from '@sparrowmini/tx-upload-file';

@Injectable({
  providedIn: 'root',
})
export class CosFileService {

  constructor(
    private fileService: TxcosUploadService
  ) {
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }




  async uploadFile(
    storage: any,
    file: File,
    fileName: any,
    dir: any,
    evt: any,
    url: any,
    options: any
  ) {


    return await lastValueFrom(this.fileService.upload(file));

  }

  async deleteFile(fileInfo: any) {
    //do something
    console.log(fileInfo);
  }
  async downloadFile(fileInfo: any, options: any) {
    // console.log('00000', fileInfo);
    // let that = this
    // const url: URL = new URL(fileInfo.url)
    // console.log(url.pathname)
    this.fileService.download(fileInfo)
  }

}
