import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from "@angular/router";
import { ApiModule as OrgApiModule } from "@sparrowmini/org-api";
import { EmployeeCreateComponent } from "./employee/employee-create/employee-create.component";
import { EmployeeLevelAddComponent } from "./employee/employee-level-add/employee-level-add.component";
import { EmployeeRoleAddComponent } from "./employee/employee-role-add/employee-role-add.component";
import { EmployeeRoleSelectComponent } from './employee/employee-role-select/employee-role-select.component';
import { EmployeeSelectionComponent } from "./employee/employee-selection/employee-selection.component";
import { EmployeeUserAddComponent } from './employee/employee-user-add/employee-user-add.component';
import { EmployeesComponent } from "./employee/employees/employees.component";
import { LevelCreateComponent } from "./level/level-create/level-create.component";
import { LevelSelectionComponent } from "./level/level-selection/level-selection.component";
import { LevelsComponent } from "./level/levels/levels.component";
import { OrgCreateComponent } from "./org/org-create/org-create.component";
import { OrgSelectionComponent } from "./org/org-selection/org-selection.component";
import { OrgsComponent } from "./org/orgs/orgs.component";
import { OrggroupCreateComponent } from "./orggroup/orggroup-create/orggroup-create.component";
import { OrggroupMemberAddComponent } from "./orggroup/orggroup-member-add/orggroup-member-add.component";
import { OrggroupsComponent } from "./orggroup/orggroups/orggroups.component";
import { RoleCreateComponent } from "./role/role-create/role-create.component";
import { RoleSelectionComponent } from "./role/role-selection/role-selection.component";
import { RolesComponent } from "./role/roles/roles.component";
import { BASE_PATH as ORG_BASE_PATH } from '@sparrowmini/org-api';

import { CommonModule, HashLocationStrategy, LocationStrategy } from "@angular/common";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormioModule } from "@formio/angular";
import { UploadFileModule } from "@sparrowmini/tx-upload-file";
import { AngularMaterialModule } from "./angular-material.module";
import { ArticleCatalogComponent } from './article/article-catalog/article-catalog.component';
import { ArticleFormComponent } from './article/article-form/article-form.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleRouteComponent } from './article/article-route/article-route.component';
import { CommentFormComponent } from "./comment/comment-form/comment-form.component";
import { BaseOpLogColumnComponent } from './common/base-op-log-column/base-op-log-column.component';
import { BreadcrumpComponent } from './common/breadcrump/breadcrump.component';
import { CkeditorControlComponent } from './common/ckeditor-control/ckeditor-control.component';
import { DynamicMenuComponent } from './common/dynamic-menu/dynamic-menu.component';
import { EntityLogComponent } from './common/entity-log/entity-log.component';
import { ErrorDialogComponent } from "./common/error-dialog/error-dialog.component";
import { FilterTreeComponent } from './common/filter-tree/filter-tree.component';
import { LoadingDialogComponent } from "./common/loading-dialog/loading-dialog.component";
import { NewTreeComponent } from './common/new-tree/new-tree.component';
import { SearchFilterComponent } from './common/search-filter/search-filter.component';
import { MenuComponent } from './components/menu/menu.component';
import { DataPermissionGrantComponent } from './data-permission/data-permission-grant/data-permission-grant.component';
import { DataPermissionNewComponent } from './data-permission/data-permission-new/data-permission-new.component';
import { DataPermissionViewComponent } from './data-permission/data-permission-view/data-permission-view.component';
import { DataPermissionsComponent } from './data-permission/data-permissions/data-permissions.component';
import { DictCatalogCreateComponent } from './dict/dict-catalog-create/dict-catalog-create.component';
import { DictCatalogSelectionComponent } from './dict/dict-catalog-selection/dict-catalog-selection.component';
import { DictCreateComponent } from './dict/dict-create/dict-create.component';
import { DictSelectionComponent } from './dict/dict-selection/dict-selection.component';
import { DictsComponent } from './dict/dicts/dicts.component';
import { PgelPermissionDirective } from './directives/pgel-permission.directive';
import { FeedbackFormComponent } from './feedback/feedback-form/feedback-form.component';
import { FeedbackListComponent } from './feedback/feedback-list/feedback-list.component';
import { FileUploadComponent } from './file/file-upload/file-upload.component';
import { FilesComponent } from './file/files/files.component';
import { FormCreateComponent } from "./form/form-create/form-create.component";
import { FormDataCreateComponent } from "./form/form-data-create/form-data-create.component";
import { FormDataListComponent } from "./form/form-data-list/form-data-list.component";
import { FormDataViewComponent } from "./form/form-data-view/form-data-view.component";
import { FormListComponent } from "./form/form-list/form-list.component";
import { FormPreviewComponent } from "./form/form-preview/form-preview.component";
import { ForumListComponent } from './forum/forum-list/forum-list.component';
import { DeleteLogComponent } from './log/delete-log/delete-log.component';
import { EditLogComponent } from './log/edit-log/edit-log.component';
import { LoginLogComponent } from './log/login-log/login-log.component';
import { RequestLogComponent } from './log/request-log/request-log.component';
import { MenuCreateComponent } from './menu/menu-create/menu-create.component';
import { MenuPermissionComponent } from './menu/menu-permission/menu-permission.component';
import { MenuTreeSelectionComponent } from './menu/menu-tree-selection/menu-tree-selection.component';
import { MenuTreeComponent } from './menu/menu-tree/menu-tree.component';
import { MyFormDataListComponent } from "./my/my-form-data-list/my-form-data-list.component";
import { MyFormListComponent } from "./my/my-form-list/my-form-list.component";
import { NoticeFormComponent } from './notice/notice-form/notice-form.component';
import { NoticeListComponent } from './notice/notice-list/notice-list.component';
import { OrgRoutingModule } from "./org-routing.module";
import { DashboardComponent } from './org/dashboard/dashboard.component';
import { PageElementCreateComponent } from './page-element/page-element-create/page-element-create.component';
import { PageElementPermissionComponent } from './page-element/page-element-permission/page-element-permission.component';
import { PageElementsComponent } from './page-element/page-elements/page-elements.component';
import { PemgroupCreateComponent } from './pemgroup/pemgroup-create/pemgroup-create.component';
import { PemgroupMemberComponent } from './pemgroup/pemgroup-member/pemgroup-member.component';
import { PemgroupsComponent } from './pemgroup/pemgroups/pemgroups.component';
import { ReportExportToolbarComponent } from './report/report-export-toolbar/report-export-toolbar.component';
import { ReportTemplateCreateComponent } from './report/report-template-create/report-template-create.component';
import { ReportTemplatesComponent } from './report/report-templates/report-templates.component';
import { ViewReportComponent } from './report/view-report/view-report.component';
import { RuleCreateComponent } from "./rule/rule-create/rule-create.component";
import { RuleTemplatesComponent } from "./rule/rule-templates/rule-templates.component";
import { ScopeCreateComponent } from './scope/scope-create/scope-create.component';
import { ScopePermissionComponent } from './scope/scope-permission/scope-permission.component';
import { ScopesComponent } from './scope/scopes/scopes.component';
import { SolrSearchResultComponent } from './solr/solr-search-result/solr-search-result.component';
import { AttributePermisssionComponent } from './sprmodel/attribute-permisssion/attribute-permisssion.component';
import { ModelPermissionRulesComponent } from './sprmodel/model-permission-rules/model-permission-rules.component';
import { ModelPermissionViewComponent } from './sprmodel/model-permission-view/model-permission-view.component';
import { SprmodelPermisssionComponent } from './sprmodel/sprmodel-permisssion/sprmodel-permisssion.component';
import { SprmodesComponent } from './sprmodel/sprmodes/sprmodes.component';
import { SysconfigDesignComponent } from './sysconfig/sysconfig-design/sysconfig-design.component';
import { SysconfigFormComponent } from './sysconfig/sysconfig-form/sysconfig-form.component';
import { SysconfigListComponent } from './sysconfig/sysconfig-list/sysconfig-list.component';
import { SysroleCreateComponent } from './sysrole/sysrole-create/sysrole-create.component';
import { SysrolePermissionComponent } from './sysrole/sysrole-permission/sysrole-permission.component';
import { SysroleSelectionComponent } from './sysrole/sysrole-selection/sysrole-selection.component';
import { SysrolesComponent } from './sysrole/sysroles/sysroles.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserPasswordResetComponent } from './user/user-password-reset/user-password-reset.component';
import { UserSelectionComponent } from './user/user-selection/user-selection.component';
import { ForumCatalogComponent } from './forum/forum-catalog/forum-catalog.component';
import { ForumFormComponent } from './forum/forum-form/forum-form.component';
import { DynamicTreeViewComponent } from './common/dynamic-tree-view/dynamic-tree-view.component';
import { TreeViewComponent } from './common/tree-view/tree-view.component';
import { DictFormComponent } from "./dict/dict-form/dict-form.component";
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { SparrowOrgComponent } from './sparrow-org.component';

@NgModule({
  declarations: [
    AppComponent,
    SparrowOrgComponent,
    OrgsComponent,
    RolesComponent,
    LevelsComponent,
    OrggroupsComponent,
    EmployeesComponent,
    OrgSelectionComponent,
    OrgCreateComponent,
    RoleCreateComponent,
    RoleSelectionComponent,
    LevelCreateComponent,
    OrggroupCreateComponent,
    EmployeeCreateComponent,
    EmployeeRoleAddComponent,
    EmployeeLevelAddComponent,
    LevelSelectionComponent,
    OrggroupMemberAddComponent,
    EmployeeSelectionComponent,
    EmployeeUserAddComponent,
    EmployeeRoleSelectComponent,
    MenuComponent,
    MenuTreeComponent,
    MenuCreateComponent,
    MenuTreeSelectionComponent,
    SysroleSelectionComponent,
    MenuPermissionComponent,
    SysrolesComponent,
    SysroleCreateComponent,
    SysrolePermissionComponent,
    ScopesComponent,
    ScopeCreateComponent,
    ScopePermissionComponent,
    SprmodesComponent,
    PemgroupsComponent,
    PemgroupCreateComponent,
    PemgroupMemberComponent,
    SprmodelPermisssionComponent,
    AttributePermisssionComponent,
    ModelPermissionRulesComponent,
    DataPermissionsComponent,
    DataPermissionGrantComponent,
    SearchFilterComponent,
    LoginLogComponent,
    RequestLogComponent,
    DeleteLogComponent,
    EditLogComponent,
    UserListComponent,
    UserCreateComponent,
    UserSelectionComponent,
    EntityLogComponent,
    BaseOpLogColumnComponent,
    FilesComponent,
    FileUploadComponent,
    DataPermissionViewComponent,
    ModelPermissionViewComponent,
    UserPasswordResetComponent,
    PageElementsComponent,
    PageElementCreateComponent,
    PageElementPermissionComponent,
    PgelPermissionDirective,
    DictsComponent,
    DictCatalogCreateComponent,
    DictCreateComponent,
    DictSelectionComponent,
    DictCatalogSelectionComponent,
    ReportTemplateCreateComponent,
    ReportTemplatesComponent,
    ViewReportComponent,
    DataPermissionNewComponent,
    SysconfigListComponent,
    SysconfigFormComponent,
    SysconfigDesignComponent,
    FormCreateComponent,
    FormListComponent,
    FormDataCreateComponent,
    FormDataViewComponent,
    FormDataListComponent,
    MyFormListComponent,
    MyFormDataListComponent,
    FormPreviewComponent,
    RuleCreateComponent,
    RuleTemplatesComponent,
    CommentFormComponent,
    NoticeListComponent,
    NoticeFormComponent,
    CkeditorControlComponent,
    FeedbackFormComponent,
    FeedbackListComponent,
    ReportExportToolbarComponent,
    BreadcrumpComponent,
    ErrorDialogComponent,
    LoadingDialogComponent,
    DashboardComponent,
    SolrSearchResultComponent,
    ArticleListComponent,
    FilterTreeComponent,
    NewTreeComponent,
    DynamicMenuComponent,
    ArticleFormComponent,
    ArticleCatalogComponent,
    ArticleRouteComponent,
    ForumListComponent,
    ForumCatalogComponent,
    ForumFormComponent,
    DynamicTreeViewComponent,
    TreeViewComponent,
    DictFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    KeycloakAngularModule,
    HttpClientModule,
    CKEditorModule,
    UploadFileModule,
    AngularMaterialModule,
    FormioModule,
    OrgApiModule,
    A11yModule,
    CdkAccordionModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    ClipboardModule,
    DragDropModule,
    FormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ReactiveFormsModule,
    ScrollingModule
    
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    { provide: ORG_BASE_PATH, useValue: environment.apiBase },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.authServerUrl,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
      initOptions: {
        onLoad: environment.keycloak.login
      },
      bearerExcludedUrls: ['/assets'],
    }).then((res) => {
      if (res) {
        keycloak.loadUserProfile().then((user) => {
          localStorage.setItem('userInfo', JSON.stringify(user));
        });
      }
    });;
}
