import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDataSource } from '../../model/dynamic-datasource';
import { DynamicFlatNode } from '../../model/dynamic-flat-node';
import { EmployeeDynamicDatabase } from '../../model/employee-database';
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-employee-selection',
  templateUrl: './employee-selection.component.html',
  styleUrls: ['./employee-selection.component.css']
})
export class EmployeeSelectionComponent implements OnInit {

  @Input() public selectedItems: any[] = [];
  @Input() public multiple: boolean = false;
  @Output() private onSelected = new EventEmitter<string>();
  @Output() private onRemoved = new EventEmitter<string>();

  constructor(
    database: EmployeeDynamicDatabase,
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

  ngOnInit(): void {
  }



  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;



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
