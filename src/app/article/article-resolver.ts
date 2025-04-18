import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, Resolve } from "@angular/router";
import { mergeMap, of, EMPTY, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TaskResolveService implements Resolve<any> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const id = +route.paramMap.get('id');
    console.log('TaskResolveService', id)
    return of({ id: id, name: 'Task ' + id });
  }
}
