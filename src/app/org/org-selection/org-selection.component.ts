import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { OrganizationService } from "@sparrowmini/org-api";
import {
  Observable,
  map,
  switchMap,
  zip,
  combineLatest,
  BehaviorSubject,
  connect,
  merge,
  expand,
} from "rxjs";
import { FlatTreeControl } from "@angular/cdk/tree";
import {
  CollectionViewer,
  SelectionChange,
  DataSource,
} from "@angular/cdk/collections";
import { DynamicFlatNode } from "../../model/dynamic-flat-node";
import { DynamicDataSource } from "../../model/dynamic-datasource";
import { OrgDynamicDatabase } from "../../model/org-database";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: "app-org-selection",
  templateUrl: "./org-selection.component.html",
  styleUrls: ["./org-selection.component.css"],
})
export class OrgSelectionComponent implements OnInit {
  @Input() public selectedItems: any[] = [];
  @Input() public multiple: boolean = false;
  @Output() private onSelected = new EventEmitter<string>();
  @Output() private onRemoved = new EventEmitter<string>();

  constructor(database: OrgDynamicDatabase) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    database.initialData().subscribe((res) => {
      // res.unshift(
      //   new DynamicFlatNode({ id: "root", name: "根组织" }, 0, false)
      // );
      this.dataSource.data = res
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
