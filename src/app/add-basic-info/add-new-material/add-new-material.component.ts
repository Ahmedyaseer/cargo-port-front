import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { ProductList, MeasurmentList } from './ProductListInterface.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-material',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './add-new-material.component.html',
  styleUrls: ['./add-new-material.component.scss']
})
export class AddNewMaterialComponent implements OnInit {
  register: UntypedFormGroup;
  productList: Array<ProductList> = [];
  measurementList: Array<MeasurmentList> = [];

  breadscrums = [
    {
      title: 'Add new Material',
      items: ['Basic Info'],
      active: 'New Material',
    },
  ];

  constructor(private fb: UntypedFormBuilder) {
    // Initialize form
    this.register = this.fb.group({
      product: ['', [Validators.required]],
      packageType: ['', [Validators.required]],
      measurement: ['', [Validators.required]]
    });
    
  }

  ngOnInit(): void {
    // Initialize data (simulate API call)
    this.productList = [
      { id: 1, name: 'Sample Product' },
      { id: 2, name: 'Another Product' }
    ];
    this.measurementList = [
      { id: 1, name: 'Measurement 1' },
      { id: 2, name: 'Measurement 2' }
    ];
  }




  passParameter() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, submit it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Submited!',
            'Your form has been submited.',
            'success'
          );
          if (!this.register.valid) {
            console.error('Form is invalid!');
            return;
          }
          console.log('Form submitted:', this.register.value);
          console.log('will send this dataaaaaaaaaaaaaaaaaaaaaa')
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
          );
        }
      });
  }
}
