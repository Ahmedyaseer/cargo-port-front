import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent, NgxDatatableModule, SortType } from '@swimlane/ngx-datatable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-material',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MatButtonModule,
    MatIconModule,
    NgxDatatableModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
  ],
  templateUrl: './show-unit.component.html',
  styleUrls: ['./show-unit.component.scss'],
})
export class ShowUnitsComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table!: DatatableComponent;
  data: any[] = []; // Table data
  filteredData: any[] = []; // Filtered table data for search
  columns = [
    { name: 'Unit Name' },

  ];
  editForm: FormGroup;
  SortType = SortType;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {
    // Initialize the edit form
    this.editForm = this.fb.group({
      id: [null],
      UnitName: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    // Dummy data for testing
    this.data = [
      {
        id: 1,
        UnitName: 'Kilogram',
      },
      {
        id: 2,
        UnitName: 'Liter',
      },
      {
        id: 3,
        UnitName: 'Piece',
      },
    ];
    this.filteredData = [...this.data]; // Initialize filtered data
  }

  // Method to filter table data
  filterDatatable(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value)
      )
    );
    this.table.offset = 0; // Reset to the first page
  }

  // Method to delete a row with confirmation popup
  deleteRow(row: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.data = this.data.filter((item) => item.id !== row.id);
        this.filteredData = [...this.data]; // Update filtered data
        Swal.fire('Deleted!', 'The record has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your data is safe.', 'info');
      }
    });
  }

  // Method to edit a row and show a popup with editable fields
  editRow(row: any): void {
    // Pre-fill the form with the selected row's data
    this.editForm.patchValue(row);

    Swal.fire({
      title: 'Edit Unit',
      html: `
        <form id="editForm">
          <div class="form-group">
          <div class="form-group">
            <label>Unit Name</label>
            <input id="UnitName" class="form-control" value="${row.UnitName}" />
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const UnitName = (document.getElementById('UnitName') as HTMLInputElement).value;

        // Validate fields
        if (!UnitName) {
          Swal.showValidationMessage('All fields are required');
          return null;
        }

        return {UnitName };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Update the row with the new values
        const updatedRow = {
          ...row,
          UnitName: result.value?.UnitName,
        };

        // Update the data array
        const index = this.data.findIndex((item) => item.id === row.id);
        if (index !== -1) {
          this.data[index] = updatedRow;
          this.filteredData = [...this.data]; // Refresh the filtered data
        }

        this.showNotification('bg-blue', 'Record updated successfully!');
      }
    });
  }

  // Show notifications
  showNotification(colorClass: string, message: string): void {
    this._snackBar.open(message, '', {
      duration: 2000,
      panelClass: colorClass,
    });
  }
}
