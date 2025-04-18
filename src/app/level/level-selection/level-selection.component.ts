import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { RoleService, OrganizationService } from '@sparrowmini/org-api';
import { DynamicDataSource } from '../../model/dynamic-datasource';
import { DynamicFlatNode } from '../../model/dynamic-flat-node';
import { LevelDynamicDatabase } from '../../model/level-database';
import { FlatTreeControl } from "@angular/cdk/tree";


@Component({
  selector: 'app-level-selection',
  templateUrl: './level-selection.component.html',
  styleUrls: ['./level-selection.component.css']
})
export class LevelSelectionComponent implements OnInit {
  @Input() public selectedItems: any[] = [];
  @Input() public multiple: boolean = false;
  @Output() private onSelected = new EventEmitter<string>();
  @Output() private onRemoved = new EventEmitter<string>();
  constructor(
    database: LevelDynamicDatabase,
    private dialog: MatDialog,
    private roleService: RoleService,
    private orgService: OrganizationService
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    database.initialData().subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  ngOnInit(): void {}



  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our fruit
    if (value) {
      this.selectedItems.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: any): void {
    const index = this.selectedItems.indexOf(fruit);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
  }

  select(seletedItem: any) {
    if (!this.multiple) {
      this.selectedItems = [];
    }

    if (this.selectedItems.indexOf(seletedItem) === -1) {
      this.selectedItems.push(seletedItem);
      this.onSelected.emit(seletedItem.id);
    }
  }

}
