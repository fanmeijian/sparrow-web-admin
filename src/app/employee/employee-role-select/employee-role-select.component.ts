import { Component, OnInit } from '@angular/core';
import {
  EmployeeService,
  OrganizationService,
  RoleService,
} from '@sparrowmini/org-api';
import { switchMap, zip, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-employee-role-select',
  templateUrl: './employee-role-select.component.html',
  styleUrls: ['./employee-role-select.component.css'],
})
export class EmployeeRoleSelectComponent implements OnInit {
  roles: any[]=[];
  organizationRoleId: any;

  constructor(
    private employeeService: EmployeeService,
    private orgService: OrganizationService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.employeeService
      .employeeRoles('my')
      .pipe(
        switchMap((m) =>
          zip(
            ...m.map((r:any) => {
              const $org = this.orgService.org(
                r?.id?.organizationRoleId.organizationId
              );
              const $role = this.roleService.role(
                r.id.organizationRoleId.roleId
              );
              return combineLatest($org, $role).pipe(
                map((p: any) => Object.assign(r, { org: p[0], role: p[1] }))
              );
            })
          )
        )
      )
      .subscribe((b) => {
        // console.log(b);
        this.roles = b;
        let orgRoleId = JSON.parse(sessionStorage.getItem('organizationId')!);
        this.organizationRoleId = b.filter(
          (f) =>
            f.id.organizationRoleId.organizationId ===
              orgRoleId.organizationId &&
            f.id.organizationRoleId.roleId === orgRoleId.roleId
        )[0].id.organizationRoleId;

        // console.log(b[0].id.organizationRoleId);
      });
  }
  onChange(e: any) {
    sessionStorage.setItem('organizationId', JSON.stringify(e.value));
  }
}
