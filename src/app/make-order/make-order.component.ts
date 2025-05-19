import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
  

import Swal from 'sweetalert2';

@Component({
  selector: 'app-make-order',
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
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  
  templateUrl: './make-order.component.html',
  styleUrl: './make-order.component.scss'
})
export class MakeOrderComponent {
units:{id:number,name:string}[]=[];
materials:{id:number,name:string}[]=[];

    // Form 1
    register: UntypedFormGroup;
    hide = true;
    agree = false;
    customForm?: UntypedFormGroup;
  
    breadscrums = [
      {
        title: 'Make Order',
        items: ['Make Order'],
        active: 'Create Order',
      },
    ];

    products=[
      {id:1,name:"Product1"},
      {id:2,name:"product2"},
      {id:3,name:"product3"}
    ]

    matrials =[
      {id:1,name:"Matrial1"},
      {id:2,name:"Matrial2"},
      {id:3,name:"Matrial3"},
      {id:4,name:"Matrial4"},

    ]
  
    constructor(private fb: UntypedFormBuilder) {
      this.register = this.fb.group({
        productName: ['', Validators.required],
        material: ['', Validators.required],
        quantity: ['', [Validators.required, Validators.min(1)]],
        unit: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(0)]],
        date: ['', Validators.required], // Date field
      });
    }

    onDateChange(event: MatDatepickerInputEvent<Date>): void {
      const selectedDate = event.value;
      if (selectedDate) {
        this.register.get('date')?.setValue(selectedDate);
      } else {
        this.register.get('date')?.setErrors({ required: true });
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
  
