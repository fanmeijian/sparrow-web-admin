import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FilterTreeBean, SparrowJpaFilter } from '@sparrowmini/org-api';
import { BehaviorSubject } from 'rxjs';

// export interface SparrowJpaFilter {
//   filterTreeBean?: FilterTreeBean;
//   children?: SparrowJpaFilter[];
// }

// export interface FilterTreeBean {
//   type?: string;
//   name?: string;
//   op?: string;
//   value?: any;
// }

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css'],
})
export class SearchFilterComponent implements OnInit {
  @Input() filters: SparrowJpaFilter[] = [];
  @Input() fields?: {name: string, value: string}[] = [];
  @Output() applyFilter = new EventEmitter<SparrowJpaFilter[]>();

  propertyNames = [
    {
      name: '创建日期',
      value: 'createdDate',
    },
    {
      name: '最后更新日期',
      value: 'modifiedDate',
    },
    {
      name: '创建人',
      value: 'createdBy',
    },
    {
      name: '最后更新人',
      value: 'modifiedBy',
    },

  ];
  operators = [
    {
      name: '等于',
      value: '=',
    },
    {
      name: '不等于',
      value: '!=',
    },
    {
      name: '大于',
      value: '>',
    },
    {
      name: '大于等于',
      value: '>=',
    },
    {
      name: '小于',
      value: '<',
    },
    {
      name: '小于等于',
      value: '<=',
    },
    {
      name: '以...开始',
      value: 'start',
    },
    {
      name: '以...结束',
      value: 'end',
    },
    {
      name: '包含',
      value: 'contain',
    },
    {
      name: '在列表中',
      value: 'in',
    },
  ];

  filterBean: FilterTreeBean = {
    type: FilterTreeBean.TypeEnum.AND,
    name: '',
    op: '',
    value: undefined,
  };

  dataChange = new BehaviorSubject<SparrowJpaFilter[]>([]);

  constructor(private snack: MatSnackBar) {
    // this.dataSource.data = [];
    this.dataSource = new MatTreeNestedDataSource<SparrowJpaFilter>();
    this.dataChange.subscribe((data) => {
      // console.log(data);
      this.dataSource.data = null;
      this.dataSource.data = data;
    });
  }

  ngOnInit(): void {
    this.propertyNames.unshift(...this.fields!)
  }

  treeControl = new NestedTreeControl<SparrowJpaFilter>(
    (node) => node.children
  );
  dataSource: any;

  hasChild = (_: number, node: SparrowJpaFilter) =>
    !!node.children && node.children.length > 0;

  addFilter(node: any) {
    if (node) {
      node.children?.push({
        filterTreeBean: Object.assign({}, this.filterBean),
        children: [],
      });
    } else {
      this.filters.push({
        filterTreeBean: Object.assign({}, this.filterBean),
        children: [],
      });
    }

    this.filterBean = {};
    this.dataChange.next(this.filters);
    this.apply()
  }

  removeFilter(node: any) {
    this.findNode(node, this.filters);
    this.filterBean = {};
    this.dataChange.next(this.filters);
    this.apply()
  }

  findNode(node: any, nodes: any[]) {
    if (nodes.indexOf(node) >= 0) {
      nodes.splice(nodes.indexOf(node), 1);
    } else {
      nodes.forEach((f) => {
        if (f.children && f.children?.length > 0) {
          this.findNode(node, f.children);
        }
      });
    }
  }

  apply() {
    // if (this.filters && this.filters.length > 0) {
    //   this.applyFilter.emit(this.filters);
    // } else {
    //   this.snack.open('请先添加至少一个条件', '关闭');
    // }
    this.applyFilter.emit(this.filters);
  }
}
