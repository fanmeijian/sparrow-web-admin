import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ArticleCatalogComponent } from "./article/article-catalog/article-catalog.component";
import { ArticleFormComponent } from "./article/article-form/article-form.component";
import { ArticleListComponent } from "./article/article-list/article-list.component";
import { ArticleRouteComponent } from "./article/article-route/article-route.component";
import { MenuComponent } from "./components/menu/menu.component";
import { DataPermissionNewComponent } from "./data-permission/data-permission-new/data-permission-new.component";
import { DataPermissionsComponent } from "./data-permission/data-permissions/data-permissions.component";
import { DictsComponent } from "./dict/dicts/dicts.component";
import { EmployeesComponent } from "./employee/employees/employees.component";
import { FeedbackFormComponent } from "./feedback/feedback-form/feedback-form.component";
import { FeedbackListComponent } from "./feedback/feedback-list/feedback-list.component";
import { FilesComponent } from "./file/files/files.component";
import { FormCreateComponent } from "./form/form-create/form-create.component";
import { FormDataCreateComponent } from "./form/form-data-create/form-data-create.component";
import { FormDataListComponent } from "./form/form-data-list/form-data-list.component";
import { FormDataViewComponent } from "./form/form-data-view/form-data-view.component";
import { FormListComponent } from "./form/form-list/form-list.component";
import { LevelsComponent } from "./level/levels/levels.component";
import { DeleteLogComponent } from "./log/delete-log/delete-log.component";
import { EditLogComponent } from "./log/edit-log/edit-log.component";
import { RequestLogComponent } from "./log/request-log/request-log.component";
import { MyFormDataListComponent } from "./my/my-form-data-list/my-form-data-list.component";
import { MyFormListComponent } from "./my/my-form-list/my-form-list.component";
import { NoticeFormComponent } from "./notice/notice-form/notice-form.component";
import { NoticeListComponent } from "./notice/notice-list/notice-list.component";
import { DashboardComponent } from "./org/dashboard/dashboard.component";
import { OrgsComponent } from "./org/orgs/orgs.component";
import { OrggroupsComponent } from "./orggroup/orggroups/orggroups.component";
import { PageElementsComponent } from "./page-element/page-elements/page-elements.component";
import { PemgroupsComponent } from "./pemgroup/pemgroups/pemgroups.component";
import { ReportTemplatesComponent } from "./report/report-templates/report-templates.component";
import { ViewReportComponent } from "./report/view-report/view-report.component";
import { RolesComponent } from "./role/roles/roles.component";
import { RuleCreateComponent } from "./rule/rule-create/rule-create.component";
import { RuleTemplatesComponent } from "./rule/rule-templates/rule-templates.component";
import { ScopesComponent } from "./scope/scopes/scopes.component";
import { SolrSearchResultComponent } from "./solr/solr-search-result/solr-search-result.component";
import { SprmodesComponent } from "./sprmodel/sprmodes/sprmodes.component";
import { SysconfigDesignComponent } from "./sysconfig/sysconfig-design/sysconfig-design.component";
import { SysconfigListComponent } from "./sysconfig/sysconfig-list/sysconfig-list.component";
import { SysrolesComponent } from "./sysrole/sysroles/sysroles.component";
import { UserListComponent } from "./user/user-list/user-list.component";
import { ForumListComponent } from "./forum/forum-list/forum-list.component";
import { ForumCatalogComponent } from "./forum/forum-catalog/forum-catalog.component";
import { DictFormComponent } from "./dict/dict-form/dict-form.component";
import { AppComponent } from "./app.component";
export const ADMIN_ROUTES: Route[] = [
  {
    path: "admin",
    component: AppComponent,
    children: [
      {
        path: "forum",
        component: ForumCatalogComponent,
        children: [
          {
            path: ":catalogId",
            component: ForumListComponent,
          }
        ]
      },
      {
        path: "search",
        data: { title: "搜索" },
        component: SolrSearchResultComponent
      },
      {
        path: "article-catalog",
        data: { title: "文章分类" },
        component: ArticleCatalogComponent,
        children: [
          {
            path: ":id",
            data: { title: "文章" },
            component: ArticleRouteComponent,
            children: [
              {
                path: "",
                data: { title: "列表" },
                component: ArticleListComponent,
              },
              {
                path: "article-form/:id",
                data: { title: "详情" },
                component: ArticleFormComponent
              },
              {
                path: "article-form",
                data: { title: "添加文章" },
                component: ArticleFormComponent
              },
            ]
          }
        ]
      },
      {
        path: 'permission',
        data: { title: '权限管理' },
        component: AppComponent,
        children: [
          {
            path: 'menu',
            data: { title: '菜单管理' },
            component: MenuComponent,
          },
          {
            path: 'sysrole',
            data: { title: '角色管理' },
            component: SysrolesComponent,
          },
          {
            path: 'scope',
            data: { title: '功能管理' },
            component: ScopesComponent,
          },
          {
            path: 'model',
            data: { title: '模型管理' },
            component: SprmodesComponent,
          },
          {
            path: 'pemgroup',
            data: { title: '群组管理' },
            component: PemgroupsComponent,
          },
          {
            path: 'data-permissions',
            data: { title: '数据权限' },
            component: DataPermissionsComponent,
          },
          {
            path: 'data-permission-new',
            data: { title: '新增数据权限' },
            component: DataPermissionNewComponent,
          },
          {
            path: 'users',
            data: { title: '用户管理' },
            component: UserListComponent,
          },
          {
            path: 'files',
            data: { title: '文件管理' },
            component: FilesComponent,
          },
          {
            path: 'page-elements',
            data: { title: '页面元素管理' },
            component: PageElementsComponent,
          },
        ],
      },
      {
        path: 'log',
        data: { title: '审计日志' },
        component: AppComponent,
        children: [
          {
            path: 'request-logs',
            data: { title: '请求日志' },
            component: RequestLogComponent,
          },
          {
            path: 'delete-logs',
            data: { title: '删除日志' },
            component: DeleteLogComponent,
          },
          {
            path: 'edit-logs',
            data: { title: '更新日志' },
            component: EditLogComponent,
          },
        ],
      },
      {
        path: 'setting',
        data: { title: '系统配置' },
        component: AppComponent,
        children: [
          {
            path: 'dicts',
            data: { title: '数据字典' },
            component: DictsComponent,
            children:[
              {
                path: ':id',
                component: DictFormComponent
              },
              {
                path: 'dict-form/new',
                component: DictFormComponent
              }
            ]
          },
          {
            path: 'sysconfig',
            data: { title: '配置文件' },
            component: SysconfigListComponent,
          },
          {
            path: 'sysconfig-design/:code',
            data: { title: '配置表单设计' },
            component: SysconfigDesignComponent,
          },
          {
            path: 'sysconfig-design',
            data: { title: '配置表单设计' },
            component: SysconfigDesignComponent,
          },
        ],
      },
      {
        path: 'notice',
        data: { title: '公告管理' },
        component: AppComponent,
        children: [
          {
            path: 'notice-list',
            data: { title: '公告列表' },
            component: NoticeListComponent,
          },
          {
            path: 'notice-form',
            data: { title: '公告表单' },
            component: NoticeFormComponent,
          },
        ],
      },
      {
        path: 'feedback',
        data: { title: '反馈管理' },
        component: AppComponent,
        children: [
          {
            path: 'feedback-list',
            data: { title: '反馈列表' },
            component: FeedbackListComponent,
          },
          {
            path: 'feedback-form/:id',
            data: { title: '反馈表单' },
            component: FeedbackFormComponent,
          },
        ],
      },

      // { path: 'builder', component: FormDesignComponent },
      { path: 'my-forms', component: MyFormListComponent },
      { path: 'my-form-datas', component: MyFormDataListComponent },
      {
        path: 'form-data-view',
        data: { title: '查看数据' },
        component: FormDataViewComponent,
      },
      {
        path: 'form-data-create',
        data: { title: '填写数据' },
        component: FormDataCreateComponent,
      },
      {
        path: 'organization',
        data: { title: '组织管理' },
        component: AppComponent,
        children: [
          {
            path: 'dashboard',
            data: { title: '组织树' },
            component: DashboardComponent,
          },
          {
            path: 'organizations',
            data: { title: '机构列表' },
            component: OrgsComponent,
          },
          { path: 'roles', data: { title: '岗位列表' }, component: RolesComponent },
          {
            path: 'levels',
            data: { title: '级别列表' },
            component: LevelsComponent,
          },
          {
            path: 'groups',
            data: { title: '群组列表' },
            component: OrggroupsComponent,
          },
          {
            path: 'employees',
            component: EmployeesComponent,
            data: { title: '员工列表' },
          },
        ],
      },
      // {
      //   path: 'flow',
      //   data: { title: '流程管理' },
      //   component: SparrowBpmComponent,
      //   children: [
      //     {
      //       path: 'flowlist',
      //       data: { title: '流程列表' },
      //       component: ProcessDefinitionsComponent,
      //     },
      //     {
      //       path: 'flow-instances',
      //       data: { title: '流程实例' },
      //       component: ProcessInstacesComponent,
      //     },
      //     {
      //       path: 'tasks',
      //       data: { title: '任务列表' },
      //       component: TaskInstancesComponent,
      //     },
      //     {
      //       path: 'form-design',
      //       data: { title: '表单设计' },
      //       component: FormDesignComponent,
      //     },
      //     {
      //       path: 'process-form',
      //       data: { title: '启动流程' },
      //       component: ProcessFormComponent,
      //     },
      //     {
      //       path: 'my-flow',
      //       data: { title: '我发起的' },
      //       component: MyProcessInstancesComponent,
      //     },
      //     {
      //       path: 'start-flow',
      //       data: { title: '发起流程' },
      //       component: ProcessPublishedComponent,
      //     },
      //     {
      //       path: 'query-list',
      //       data: { title: '自定义查询'},
      //       component: QueryListComponent
      //     }
      //   ],
      // },
      {
        path: 'rule',
        data: { title: '规则管理' },
        component: AppComponent,
        children: [
          {
            path: 'templates',
            data: { title: '规则模版列表' },
            component: RuleTemplatesComponent,
          },
          {
            path: 'rule-create/:id',
            data: { title: '新建规则' },
            component: RuleCreateComponent,
          },
          {
            path: 'rule-create',
            data: { title: '规则详情' },
            component: RuleCreateComponent,
          },
        ],
      },
      {
        path: 'form',
        data: { title: '表单管理' },
        component: AppComponent,
        children: [
          {
            path: 'form-data-list',
            data: { title: '表单数据' },
            component: FormDataListComponent,
          },
          {
            path: 'sparrow-forms',
            data: { title: '设计' },
            component: FormListComponent,
          },
          {
            path: 'sparrow-form-create',
            data: { title: '设计表单' },
            component: FormCreateComponent,
          },
          {
            path: 'form-data-create',
            data: { title: '表单数据' },
            component: FormDataCreateComponent,
          },
          {
            path: 'form-data-view',
            data: { title: '表单详情' },
            component: FormDataViewComponent,
          },
          // {
          //   path: 'process-form',
          //   data: { title: '流程表单' },
          //   component: ProcessFormComponent,
          // },
        ],
      },
      // {
      //   path: 'task',
      //   data: { title: '任务中心' },
      //   component: SparrowBpmComponent,
      //   children: [
      //     {
      //       path: 'todo',
      //       data: { title: '待办任务' },
      //       component: TaskTodoComponent,
      //     },
      //     {
      //       path: 'done',
      //       data: { title: '已办任务' },
      //       component: TaskDoneComponent,
      //     },
      //   ],
      // },
      {
        path: 'report',
        data: { title: '报表分析' },
        component: AppComponent,
        children: [
          {
            path: 'view-report',
            data: { title: '报表详情' },
            component: ViewReportComponent,
          },
          {
            path: 'templates',
            data: { title: '模版列表' },
            component: ReportTemplatesComponent,
          },
        ],
      },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(ADMIN_ROUTES)],
  exports: [RouterModule]
})
export class OrgRoutingModule { }
