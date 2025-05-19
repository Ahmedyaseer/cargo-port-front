import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-measurement',
  standalone: true,
  imports: [BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatButtonModule],
  templateUrl: './add-new-unit.component.html',
  styleUrl: './add-new-unit.component.scss'
})
export class AddNewUnitComponent {
  register: UntypedFormGroup;
  hide = true;
  agree = false;
  customForm?: UntypedFormGroup;

  breadscrums = [
    {
      title: 'Add new Unit',
      items: ['Basic Info'],
      active: 'New Unit',
    },
  ];

  constructor(private fb: UntypedFormBuilder) {
    this.register = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    });
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
          if(!this.register.valid ){
            return;
          }
          console.log('Form Value', this.register.value);
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
