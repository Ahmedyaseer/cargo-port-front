import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.scss',
  standalone: true,
  imports: [ 
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatButtonModule
  ]
})
export class AddNewProductComponent {
  register: UntypedFormGroup;
  selectedFile?: File; // Store the selected file

  breadscrums = [
    {
      title: 'Add new product',
      items: ['Basic Info'],
      active: 'New Product',
    },
  ];

  constructor(private fb: UntypedFormBuilder) {
    this.register = this.fb.group({
      product: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      packageType: ['', [Validators.required]],
      details: ['', [Validators.required]]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }

  onRegister() {
    // send data to end point
    if (!this.register.valid) {
      return;
    }

    const formData = new FormData();
    formData.append('product', this.register.get('product')?.value);
    formData.append('packageType', this.register.get('packageType')?.value);
    formData.append('details', this.register.get('details')?.value);

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }
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
