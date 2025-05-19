import { Component, Input, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges, Output,EventEmitter, inject, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorComponent } from "../paginator/paginator.component";
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TableExportUtil } from '@shared/tableExportUtil';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatMenuModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    // SearchPipe,
    MatTooltipModule,
    TranslateModule,
    MatDividerModule,
    // NgbPaginationModule,
    PaginatorComponent,
    MatCardModule,
    // LottieComponent,
    MatInputModule,
    BreadcrumbComponent,
    MatSidenavModule,
    MatButtonModule,
],
  providers: [DatePipe], 
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() columns: { key: string; label: string; sortable?: boolean; tooltip?: boolean | ((row: any) => string); filterable?: boolean; }[] = [];
  @Input() data: any[] = [];
  @Input() searchFields: string[] = [];
  @Input() addItem!: () => void;
  @Input() actions: { label: string; icon: string; description?: boolean; callback: (row: any) => void ;  showCondition?: (selection: SelectionModel<any>) => boolean 
  }[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @Input() title!: string;
  // @Input() addButton!: { isrender: boolean; callback: () => void } ;
  @Input() deleteAll!: { 
    isrender: boolean; 
    callback: (row: any, onComplete?: () => void) => void;
  };
  @Input() riverUnitComposite: any = null;

  
  // Pagination Inputs
  @Input() totalElements: number = 0;
  @Input() pageSize: number = 5;
  @Input() pageIndex: number = 0;

  // Emit only pageIndex and pageSize
  @Output() pageChange = new EventEmitter<{ pageIndex: number; pageSize: number }>();
  @Output() sortChange = new EventEmitter<{ active: string; direction: string }>();
  @Output() searchChange = new EventEmitter<{ searchText: string, columnName: string }>();
  @Output() viewDetails = new EventEmitter<any>();
  private readonly datePipe = inject(DatePipe);
  private searchTextSubject = new Subject<{ searchText: string; columnName: string }>();
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();
  // searchTerm: string = '';
  columnFilters: { [key: string]: string } = {};
  isSidenavOpen = false;
  selectedRow: any = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selection = new SelectionModel<any>(true, []);

  // Add new properties for column visibility
  visibleColumns: { [key: string]: boolean } = {};

  // lottieOptions: AnimationOptions = {
  //   path: 'assets/lottie/noDataFound.json', // Path to your Lottie animation
  //   autoplay: true,
  //   loop: true
  // };

  ngOnInit() {
    // Initialize all columns as visible
    this.columns.forEach(col => {
      this.visibleColumns[col.key] = true;
    });
    console.log(this.columns);
    
    // Update displayed columns
    this.updateDisplayedColumns();

    this.initializeData();
  }

  getValue(row: any, key: string): any {
    return key.split('.').reduce((obj, part) => obj?.[part], row);
  }
  

  // constructor() {
  //   // Use debounceTime to delay the search for a short period (e.g., 1000ms or 300ms)
  //   this.searchTextSubject.pipe(
  //     debounceTime(1000)  // Adjust debounce time as needed
  //   ).subscribe((searchText) => {
  //     // Emit the search value after debounce
  //     this.searchChange.emit(searchText);
  //   });
  // }
  
  applyFilters() {
    this.dataSource.filterPredicate = (data, filter) => {
      const filters = JSON.parse(filter);
      return Object.keys(filters).every(key => {
        return data[key]?.toString().toLowerCase().includes(filters[key]);
      });
    };
  
    this.dataSource.filter = JSON.stringify(this.columnFilters);
  }

  applyColumnFilter(event: Event, columnKey: string) {
    const value = (event.target as HTMLInputElement).value.trim();  // Typecast in the component
    this.searchChange.emit({ searchText: value, columnName: columnKey });
  }
  
  // applyColumnFilter(event: Event, column: string) {
  //   const searchText = (event.target as HTMLInputElement).value.trim();

  //   // Push the value to the searchSubject to debounce it
  //   this.searchTextSubject.next({ searchText, columnName: column });
  // }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.initializeData();
    }
  }

  initializeData() {
    // this.dataSource.data = this.data;
    this.dataSource = new MatTableDataSource(this.data);
    console.log(this.dataSource.data); 
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    console.log('numSelected', numSelected);
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
      
  }

  // applyFilter() {
  //   console.log(this.data);
  //   const filteredData = new SearchPipe().transform(this.data, this.searchTerm, this.searchFields);
  //   this.dataSource.data = filteredData;
  // }


  getDisplayedColumns(): string[] {
    return ['select', ...this.columns.map(c => c.key), 'actions'];
  }

  refresh() {
    this.initializeData();
  }

  onPageChange(event: { pageIndex: number; pageSize: number }) {
    this.pageChange.emit(event);
  }
  
  // Emit sorting event
  onSortChange(event: any) {
    this.sortChange.emit({ active: event.active, direction: event.direction });
  }
  
  // Emit search event
  onSearchChange(event: any) {
    // console.log(event);
    this.searchChange.emit(event.target.value);
  }


  //tooltip method (on cell)
  // getTooltipText(row: any, key: string): string {
  //   const column = this.columns.find(col => col.key === key);
    
  //   // No tooltip for this column
  //   if (!column?.tooltip) {
  //     return '';
  //   }
    
  //   // Function-based tooltip
  //   if (typeof column.tooltip === 'function') {
  //     return column.tooltip(row);
  //   }
    
  //   // Boolean true - use cell value as tooltip
  //   return row[key]?.toString() || '';
  // }
  
  //tooltip on row
  getRowTooltip(row: any): string {
    // console.log(row);
    // Option 1: Return a formatted summary of the entire row
    // let tooltip = '';
    // this.columns.forEach(col => {
    //   if (row[col.key] !== undefined) {
    //     tooltip += `${col.label}: ${row[col.key]}\n`;
    //   }
    // });
    // return tooltip;
  
    //Option 2: Return a specific value or custom text
    // const formattedDate = this.datePipe.transform(row.createdAt, 'MMM d, yyyy h:mm a') || 'N/A';

    return `ID: ${row.createdByFirstName} ${row.createdByLastName}
    Created on: ${row.createdAt}`;
    

    
    
    // Option 3: Return different information based on row data
    // return row.status === 'error' ? 'This item has an error' : 'Click to view details';
  }
  
  exportExcel(fileName: string = 'export'): void {
    if (!this.data || this.data.length === 0 || !this.columns || this.columns.length === 0) {
      // console.warn('No data or columns available to export');
      return;
    }
  
    const exportData: any[] = this.data.map(row => {
      const exportRow: any = {};
      
      this.columns.forEach(column => {
        const headerName = column.label || column.key;
        
        let value = row[column.key];
        
        if (value && (column.key.endsWith('Date') || column.key.endsWith('date')) && value instanceof Date) {
          value = formatDate(new Date(value), 'yyyy-MM-dd', 'en');
        } else if (value && typeof value === 'string' && (column.key.endsWith('Date') || column.key.endsWith('date'))) {
          try {
            value = formatDate(new Date(value), 'yyyy-MM-dd', 'en');
          } catch (e) {
            // console.warn(`Error formatting date for column ${column.key}`, e);
          }
        }
        
        exportRow[headerName] = value ?? '';
      });
      
      return exportRow;
    });
    
    TableExportUtil.exportToExcel(exportData, fileName);
  }

  // Add new methods for column visibility
  updateDisplayedColumns() {
    const visibleColumnKeys = this.columns
      .filter(col => this.visibleColumns[col.key])
      .map(col => col.key);
    this.displayedColumns = ['select', ...visibleColumnKeys, 'actions'];
    console.log(this.displayedColumns);
    
  }

  toggleColumnVisibility(columnKey: string) {
    this.visibleColumns[columnKey] = !this.visibleColumns[columnKey];
    this.updateDisplayedColumns();
  }

  toggleAllColumns(visible: boolean) {
    this.columns.forEach(col => {
      this.visibleColumns[col.key] = visible;
    });
    this.updateDisplayedColumns();
  }

  // Add new helper methods for column visibility checks
  areAllColumnsVisible(): boolean {
    return this.columns.every(col => this.visibleColumns[col.key]);
  }

  areSomeColumnsVisible(): boolean {
    return this.columns.some(col => this.visibleColumns[col.key]) && 
           !this.columns.every(col => this.visibleColumns[col.key]);
  }

  isColumnVisible(columnKey: string): boolean {
    return this.visibleColumns[columnKey];
  }

  deleteSelectedItems() {
    const selectedIds = this.selection.selected.map(row => row.id); 
    if (selectedIds.length === 0) {
      console.warn('No items selected.');
      return;
    }
    this.deleteAll.callback(selectedIds);
    this.selection.clear();
  }

  onViewDetails(row: any) {
    this.viewDetails.emit(row);
  }
  openSidenav(row: any) {
    console.log(row);
    this.selectedRow = row;
    this.isSidenavOpen = true;
  }
  
  closeSidenav() {
    this.isSidenavOpen = false;
  }

  
}
