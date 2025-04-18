import { Component, Injectable, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
import { SelectionModel } from "@angular/cdk/collections";
import { BehaviorSubject, of, switchMap, zip } from "rxjs";
import { OrganizationService } from "@sparrowmini/org-api";
import { OrgCreateComponent } from "../org-create/org-create.component";

/**
 * Node for to-do item
 */
export class OrgItemNode {
  children!: OrgItemNode[];
  id!: string;
  me: any;
}

/** Flat to-do item node with expandable and level information */
export class OrgItemFlatNode {
  id!: string;
  me: any;
  level!: number;
  expandable!: boolean;
  childCount!: number;
}

@Injectable()
export class OrgChecklistDatabase {
  dataChange = new BehaviorSubject<OrgItemNode[]>([]);

  get data(): OrgItemNode[] {
    return this.dataChange.value;
  }

  constructor(private orgService: OrganizationService) {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    this.orgService.orgTree().subscribe((res) => {
      // const data = this.buildFileTree(res.children!, 0);
      const data: any = res.children!;
      // Notify the change.
      this.dataChange.next(data);
    });
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): OrgItemNode[] {
    return Object.keys(obj).reduce<OrgItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new OrgItemNode();
      node.id = key;

      if (value != null) {
        if (typeof value === "object") {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.id = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: OrgItemNode, name: string) {
    if (parent.children) {
      parent.children.push({ id: name } as OrgItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: OrgItemNode, name: string) {
    node.id = name;
    this.dataChange.next(this.data);
  }
}

@Component({
  selector: "app-orgs",
  templateUrl: "./orgs.component.html",
  styleUrls: ["./orgs.component.css",'../../org.css'],
  providers: [OrgChecklistDatabase],
})
export class OrgsComponent implements OnInit {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<any, any>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<OrgItemNode, OrgItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: OrgItemFlatNode | null = null;

  /** The new item's name */
  newItemName = "";

  treeControl!: FlatTreeControl<OrgItemFlatNode>;

  treeFlattener!: MatTreeFlattener<OrgItemNode, OrgItemFlatNode>;

  dataSource!: MatTreeFlatDataSource<OrgItemNode, OrgItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<OrgItemFlatNode>(
    true /* multiple */
  );

  constructor(
    private _database: OrgChecklistDatabase,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private orgService: OrganizationService
  ) {}
  ngOnInit(): void {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<OrgItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
    this._database.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: OrgItemFlatNode) => node.level;

  isExpandable = (node: OrgItemFlatNode) => node.expandable;

  getChildren = (node: OrgItemNode): OrgItemNode[] => node.children;

  hasChild = (_: number, _nodeData: OrgItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: OrgItemFlatNode) =>
    _nodeData.id === "";

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: OrgItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.id === node.id
        ? existingNode
        : new OrgItemFlatNode();
    flatNode.id = node.id;
    flatNode.me = node.me;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    flatNode.childCount = node.children ? node.children.length : 0;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: OrgItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: OrgItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: OrgItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: OrgItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: OrgItemFlatNode): void {
    let parent: OrgItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: OrgItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: OrgItemFlatNode): OrgItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: OrgItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, "");
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: OrgItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }

  new() {
    this.dialog
      .open(OrgCreateComponent, { width: "90%" })
      .afterClosed()
      .subscribe(() => {
        this._database.initialize();
      });
  }

  delete() {
    console.log(this.checklistSelection.selected);
    this.orgService
      .deleteOrg(this.checklistSelection.selected.map((m) => m.me.id))
      .subscribe(() => {
        this.snack
          .open("删除成功！", "关闭")
          .afterOpened()
          .subscribe(() => {
            this._database.initialize();
          });
      });
  }

  permission() {
    // this.dialog.open(MenuPermissionComponent, {
    //   data: this.checklistSelection.selected.map((m) => m.me),
    //   width: "90%",
    // });
  }

  selectedMenu: any;
  onMenuClick(menu: any) {
    this.selectedMenu = {};
    this.orgService
      .orgParent(menu.me.id)
      .pipe(
        switchMap((m) =>
          m.length > 0
            ? zip(...m.map((s) => this.orgService.org(s.id?.parentId!)))
            : of([])
        )
      )
      .subscribe((res) => {
        this.selectedMenu = Object.assign({}, menu, { parents: res });
        console.debug(this.selectedMenu, menu);
      });
  }

  edit(menu: any) {
    this.dialog.open(OrgCreateComponent, { width: "90%", data: menu });
  }

  deleteMenu(selectedMenu:any){

  }
}
