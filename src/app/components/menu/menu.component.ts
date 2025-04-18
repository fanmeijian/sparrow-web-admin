import { Component, Injectable, OnInit } from '@angular/core';
import { MenuService, SparrowTreeMenuString } from '@sparrowmini/org-api';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MenuCreateComponent } from '../../menu/menu-create/menu-create.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuPermissionComponent } from '../../menu/menu-permission/menu-permission.component';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children!: TodoItemNode[];
  id!: string;
  me: any;
}

// interface ExampleFlatNode {
//   id:string;
//   expandable: boolean;
//   name: string;
//   level: number;
//   children: ExampleFlatNode[];
// }

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  id!: string;
  me: any;
  level!: number;
  expandable!: boolean;
  childCount: any;
  children!: TodoItemFlatNode[];
}

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  constructor(private menuService: MenuService) {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    this.menuService.menuTree('MENU').subscribe((res) => {
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
  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.id = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.id = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({ id: name } as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.id = name;
    this.dataChange.next(this.data);
  }
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css','../../org.css'],
  providers: [ChecklistDatabase],
})
export class MenuComponent implements OnInit {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(
    true /* multiple */
  );

  constructor(
    private _database: ChecklistDatabase,
    private dialog: MatDialog,
    private menuService: MenuService,
    private snack: MatSnackBar,
    private http: HttpClient
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
    _database.dataChange.subscribe((data) => {
      this.dataSource.data = data;
      //cache to storage for route guard permission check
      // let menus = data.flat().map(m=>Object.assign({},{id:m.id,path: m.me.url, parentId: m.me.parentId}))
      this.toSessionCache(data);
      sessionStorage.setItem('menus', JSON.stringify(this.menus));
    });
  }

  menus: any[] = [];
  toSessionCache(data: any[]) {
    if (data) {
      data.forEach((f) => {
        this.menus.push({ id: f.id, path: f.me.url, parentId: f.me.parentId });
        if (f.children.length > 0) {
          this.toSessionCache(f.children);
        }
      });
    }
  }

  ngOnInit(): void {
    this._database.initialize();
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) =>
    _nodeData.id === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.id === node.id
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.id = node.id;
    flatNode.me = node.me;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    flatNode.childCount = node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
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
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
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
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
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
  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }

  new() {
    this.dialog.open(MenuCreateComponent, { width: '90%' });
  }

  delete() {
    // console.log(this.checklistSelection.selected);
    this.menuService
      .deleteMenus(this.checklistSelection.selected.map((m) => m.id))
      .subscribe(() => {
        this.snack.open('删除成功！', '关闭');
      });
  }

  deleteMenu(menu: any) {
    this.menuService.deleteMenus([menu.id]).subscribe(() => {
      this.snack.open('删除成功！', '关闭');
    });
  }

  permission() {
    this.dialog.open(MenuPermissionComponent, {
      data: this.checklistSelection.selected.map((m) => m.me),
      width: '90%',
    });
  }

  openPermissionDialog(menu: any) {
    this.dialog
      .open(MenuPermissionComponent, {
        data: [menu.me],
        width: '90%',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.snack.open('授权成功！', '关闭');
        }
      });
  }

  permissions: any = {};
  selectedMenu: any;
  onMenuClick(menu: any) {
    // console.log(menu);
    this.selectedMenu = menu;
    this.menuService.menuPermissions(menu.id, 'USER').subscribe((res) => {
      this.permissions.users = res;
    });

    this.menuService.menuPermissions(menu.id, 'SYSROLE').subscribe((res) => {
      this.permissions.sysroles = res;
    });
  }

  removePermission(users: any[], sysroles: any[]) {
    this.menuService
      .removeMenuPermissions({
        sysroleMenuPKs: sysroles.map((m) =>
          Object.assign({}, { sysroleId: m.id, menuId: this.selectedMenu.id })
        ),
        userMenuPKs: users.map((m) =>
          Object.assign({}, { username: m, menuId: this.selectedMenu.id })
        ),
      })
      .subscribe(() => {
        sysroles.forEach((f) => {
          const index = this.permissions.sysroles.indexOf(f);
          if (index >= 0) {
            this.permissions.sysroles.splice(index, 1);
          }
        });

        users.forEach((f) => {
          const index = this.permissions.sysroles.indexOf(f);
          if (index >= 0) {
            this.permissions.users.splice(index, 1);
          }
        });

        this.snack.open('删除成功!', '关闭');
      });
  }

  edit(menu: any) {
    this.dialog.open(MenuCreateComponent, { width: '90%', data: menu.me });
  }

  dragging = false;
  expandTimeout: any;
  expandDelay = 1000;
  validateDrop = false;
  expansionModel = new SelectionModel<string>(true);

  visibleNodes(): TodoItemNode[] {
    const result: TodoItemNode[] = [];
    console.log('this.expansionModel.selected', this.expansionModel.selected);
    function addExpandedChildren(node: TodoItemNode, expanded: string[]) {
      result.push(node);
      if (expanded.includes(node.id)) {
        node.children.map((child) => addExpandedChildren(child, expanded));
      }
    }
    this.dataSource.data.forEach((node) => {
      addExpandedChildren(node, this.expansionModel.selected);
    });
    return result;
  }

  /**
   * Handle the drop - here we rearrange the data based on the drop event,
   * then rebuild the tree.
   * */
  drop(event: CdkDragDrop<string[]>) {
    // console.log(event)
    console.log(
      'origin/destination',
      event.previousIndex,
      event.currentIndex,
      event.item.data
    );
    // ignore drops outside of the tree
    if (!event.isPointerOverContainer) return;

    // construct a list of visible nodes, this will match the DOM.
    // the cdkDragDrop event.currentIndex jives with visible nodes.
    // it calls rememberExpandedTreeNodes to persist expand state
    const visibleNodes = this.visibleNodes();
    console.log(visibleNodes);

    // deep clone the data source so we can mutate it
    const changedData = JSON.parse(JSON.stringify(this.dataSource.data));

    // recursive find function to find siblings of node
    function findNodeSiblings(
      arr: Array<any>,
      id: string
    ): Array<any> | undefined {
      let result, subResult;
      arr.forEach((item, i) => {
        if (item.id === id) {
          result = arr;
        } else if (item.children) {
          subResult = findNodeSiblings(item.children, id);
          if (subResult) result = subResult;
        }
      });
      return result;
    }

    // determine where to insert the node
    const nodeAtDest = visibleNodes[event.currentIndex];
    const newSiblings = findNodeSiblings(changedData, nodeAtDest.id);
    if (!newSiblings) return;
    const insertIndex = newSiblings.findIndex((s) => s.id === nodeAtDest.id);

    // remove the node from its old place
    const node = event.item.data;
    const siblings = findNodeSiblings(changedData, node.id);
    const siblingIndex = siblings?.findIndex((n) => n.id === node.id);
    const nodeToInsert: TodoItemNode = siblings?.splice(siblingIndex!, 1)[0];
    if (nodeAtDest.id === nodeToInsert.id) return;

    // ensure validity of drop - must be same level
    const nodeAtDestFlatNode = this.treeControl.dataNodes.find(
      (n) => nodeAtDest.id === n.id
    );
    if (this.validateDrop && nodeAtDestFlatNode?.level !== node.level) {
      alert('Items can only be moved within the same level.');
      return;
    }

    // insert node
    // console.log(
    //   visibleNodes[event.currentIndex - 1].me.name,
    //   node.level,
    //   nodeAtDestFlatNode?.me.name,
    //   nodeAtDestFlatNode?.level
    // );
    let prevId: any = undefined;
    let nextId: any = undefined;
    // let url = 'http://localhost:4421/org-service/menus/' + node.id + '/sort?';
    if (event.currentIndex === 0) {
      // url = url + 'nextId=' + visibleNodes[0].me.id;
      nextId = visibleNodes[0].me.id;
    } else if (event.currentIndex === visibleNodes.length) {
      // url = url + 'prevId=' + visibleNodes[visibleNodes.length].me.id;
      prevId = visibleNodes[visibleNodes.length].me.id;
    } else {
      if (
        this.nestedNodeMap.get(visibleNodes[event.currentIndex - 1])?.level !=
        nodeAtDestFlatNode?.level
      ) {
        // url = url + 'nextId=' + nodeAtDestFlatNode?.me.id;
        nextId = nodeAtDestFlatNode?.me.id;
      } else {
        // url =
        //   url +
        //   'prevId=' +
        //   visibleNodes[event.currentIndex - 1].me.id +
        //   '&nextId=' +
        //   nodeAtDestFlatNode?.me.id;
        prevId = visibleNodes[event.currentIndex - 1].me.id;
        nextId = nodeAtDestFlatNode?.me.id;
      }
    }

    if (node.level !== nodeAtDestFlatNode?.level) {
      this.menuService
        .updateMenu({ parentId: nodeAtDestFlatNode?.me.parentId }, node.id)
        .subscribe(() =>
          this.menuService
            .sortMenu(node.id, prevId, nextId)
            .subscribe(() => this.ngOnInit())
        );
    } else {
      // this.http.patch(url, undefined).subscribe(() => this.ngOnInit());
      this.menuService
        .sortMenu(node.id, prevId, nextId)
        .subscribe(() => this.ngOnInit());
    }

    newSiblings.splice(insertIndex, 0, nodeToInsert);

    // rebuild tree with mutated data
    this.rebuildTreeForData(changedData);
  }

  /**
   * Experimental - opening tree nodes as you drag over them
   */
  dragStart() {
    this.dragging = true;
  }
  dragEnd() {
    this.dragging = false;
  }
  dragHover(node: TodoItemFlatNode) {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
      this.expandTimeout = setTimeout(() => {
        this.treeControl.expand(node);
      }, this.expandDelay);
    }
  }
  dragHoverEnd() {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
    }
  }

  /**
   * The following methods are for persisting the tree expand state
   * after being rebuilt
   */

  rebuildTreeForData(data: any) {
    this.dataSource.data = data;
    this.expansionModel.selected.forEach((id) => {
      const node = this.treeControl.dataNodes.find((n) => n.id === id);
      this.treeControl.expand(node!);
    });
  }

  /**
   * Not used but you might need this to programmatically expand nodes
   * to reveal a particular node
   */
  private expandNodesById(flatNodes: TodoItemFlatNode[], ids: string[]) {
    if (!flatNodes || flatNodes.length === 0) return;
    const idSet = new Set(ids);
    return flatNodes.forEach((node) => {
      if (idSet.has(node.id)) {
        this.treeControl.expand(node);
        let parent = this.getParentNode(node);
        while (parent) {
          this.treeControl.expand(parent);
          parent = this.getParentNode(parent);
        }
      }
    });
  }

  // private getParentNode(node: ExampleFlatNode): ExampleFlatNode | null {
  //   const currentLevel = node.level;
  //   if (currentLevel < 1) {
  //     return null;
  //   }
  //   const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
  //   for (let i = startIndex; i >= 0; i--) {
  //     const currentNode = this.treeControl.dataNodes[i];
  //     if (currentNode.level < currentLevel) {
  //       return currentNode;
  //     }
  //   }
  //   return null;
  // }
}
