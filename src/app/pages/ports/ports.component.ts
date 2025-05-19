import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '@shared/components/table/table.component';
import { Port, PortService } from './services/port.service';
import { DeleteComponent } from 'app/add-basic-info/show-products/delete/delete.component';
import { AddEditPortComponent } from './components/add-edit-port/add-edit-port.component';


@Component({
  selector: 'app-port',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    ReactiveFormsModule,
    TranslateModule,
    TableComponent,
  ],
  templateUrl: './ports.component.html',
  styleUrls: ['./ports.component.scss']
})
export class PortComponent implements OnInit {
  // Use signals for reactive state
  data = signal<Port[]>([]);
  totalElements = signal<number>(0);
  isLoading = signal<boolean>(false);
  
  // Dependency injection
  private portService = inject(PortService);
  private dialog = inject(MatDialog);

  // Table configuration
  columns = [
    { key: 'name', label: 'اسم الميناء', sortable: true, filterable: true },
    { key: 'address', label: 'العنوان', sortable: true, filterable: true },
    { key: 'countryName', label: 'الدولة', sortable: true, filterable: true },
    { key: 'cityName', label: 'المدينة', sortable: true, filterable: true }
  ];

  // Pagination and sorting properties
  pageSize = signal<number>(5);
  pageIndex = signal<number>(0);
  sortBy = signal<string>('id');
  sortDirection = signal<string>('desc');
  searchText = signal<string>('');
  columnName = signal<string>('');

  // Action buttons for table rows
  actions = [
    {
      label: 'تعديل',
      icon: 'edit',
      callback: (row: Port) => this.editPort(row)
    },
    {
      label: 'حذف',
      icon: 'delete',
      callback: (row: Port) => this.openDeleteDialog(row)
    }
  ];

  ngOnInit(): void {
    this.loadPorts();
    console.log('this.loadPorts', this.loadPorts());
  }

  /**
   * Load ports with current pagination and filter settings
   */
  loadPorts(): void {
    this.isLoading.set(true);
    
    const pageParams = {
      pageIndex: this.pageIndex(),
      pageSize: this.pageSize()
    };

    const searchParams = this.searchText() ? {
      searchText: this.searchText(),
      columnName: this.columnName()
    } : undefined;

    const sortParams = this.sortBy() ? {
      active: this.sortBy(),
      direction: this.sortDirection() as 'asc' | 'desc' | ''
    } : undefined;

    this.portService.getPorts().subscribe({
      next: (response) => {
        if (response && response.content) {
          this.data.set(response.content);
          this.totalElements.set(response.totalElements);
        } else {
          this.data.set([]);
          this.totalElements.set(0);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading ports:', error);
        this.data.set([]);
        this.totalElements.set(0);
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Open dialog to add a new port
   */
  addPort(): void {
    const dialogRef = this.dialog.open(AddEditPortComponent, {
      width: '600px',
      direction: 'rtl',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPorts();
      }
    });
  }

  /**
   * Open dialog to edit an existing port
   */
  editPort(port: Port): void {
    const dialogRef = this.dialog.open(AddEditPortComponent, {
      width: '600px',
      direction: 'rtl',
      disableClose: true,
      data: { port }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPorts();
      }
    });
  }

  /**
   * Open delete confirmation dialog
   */
  openDeleteDialog(port: Port): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { deleteFunction: () => this.portService.deletePort(port.id!) }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPorts();
      }
    });
  }

  /**
   * Delete multiple ports
   */
  deleteAllCall(ids: number[], onComplete?: () => void): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { count: ids.length }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.portService.deletePorts(ids).subscribe({
          next: () => {
            this.loadPorts();
            if (onComplete) {
              onComplete();
            }
          },
          error: (err) => {
            console.error('Delete Error:', err);
            if (onComplete) {
              onComplete();
            }
          }
        });
      } else if (onComplete) {
        onComplete();
      }
    });
  }

  /**
   * Handle page change event from the paginator
   */
  onPageChange(event: { pageIndex: number; pageSize: number }): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadPorts();
  }

  /**
   * Handle sort change event from the table
   */
  onSortChange(event: { active: string; direction: string }): void {
    this.sortBy.set(event.active);
    this.sortDirection.set(event.direction || 'asc');
    this.loadPorts();
  }

  /**
   * Handle search change event from the search input
   */
  onSearchChange(event: { searchText: string, columnName: string }): void {
    this.searchText.set(event.searchText);
    this.columnName.set(event.columnName);
    this.pageIndex.set(0); // Reset to first page when searching
    this.loadPorts();
  }

  /**
   * Configuration for the add button
   */
  getAddButtonConfig(): { isrender: boolean; callback: () => void } {
    return { 
      isrender: true, 
      callback: () => this.addPort() 
    };
  }

  /**
   * Configuration for the delete all button
   */
  getDeleteAll(): { isrender: boolean; callback: (ids: number[], onComplete?: () => void) => void } {
    return { 
      isrender: true, 
      callback: (ids: number[], onComplete?: () => void) => this.deleteAllCall(ids, onComplete) 
    };
  }
}