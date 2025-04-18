import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';
import { MenuService } from '@sparrowmini/org-api';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  url?: string;
  children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-menu-tree-selection',
  templateUrl: './menu-tree-selection.component.html',
  styleUrls: ['./menu-tree-selection.component.css'],
})
export class MenuTreeSelectionComponent implements OnInit {
  @Input() public fruits: any[] = [];
  @Input() private multiple: boolean = false;
  @Output() private onSelected = new EventEmitter<string>();
  @Output() private onRemoved = new EventEmitter<string>();

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.me.name,
      id: node.me.id,
      url: node.me.url,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<any>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private menuService: MenuService) {}
  ngOnInit(): void {
    this.menuService.menuTree('MENU').subscribe((res) => {
      this.dataSource.data = res.children!;
    });
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  // fruits: any[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  select(menu: any) {
    if (!this.multiple) {
      this.fruits = [];
    }

    if (this.fruits.indexOf(menu) === -1) {
      this.fruits.push(menu);
      this.onSelected.emit(menu.id);
    }
  }
}
