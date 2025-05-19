import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-declar-account',
  imports: [
    BreadcrumbComponent,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelect,
    MatOption
  ],
  standalone: true,
  templateUrl: './declar-account.component.html',
  styleUrls: ['./declar-account.component.scss']
})
export class DeclarAccountComponent implements OnInit {
  isLinear = true;
  VFormGroup1!: UntypedFormGroup;
  VFormGroup2!: UntypedFormGroup;
  VFormGroup3!: UntypedFormGroup;
  VFormGroup4!: UntypedFormGroup;

  breadscrums = [
    {
      title: 'Create Account',
      items: ['Accounts Managment'],
      active: 'Create Account',
    },
  ];

  accountName = [
    { id: 1, name: 'accountType1' },
    { id: 2, name: 'accountType2' }
  ];

  ports = [
    { id: 1, name: 'port1' },
    { id: 2, name: 'port2' },
    { id: 3, name: 'port3' },
    { id: 4, name: 'port4' }
  ];

  constructor(private fb: UntypedFormBuilder, private dialog: MatDialog) {}

  ngOnInit() {
    this.VFormGroup1 = this.fb.group({
      accountName: ['', Validators.required],
      accountType: ['', Validators.required]
    });

    this.VFormGroup2 = this.fb.group({
      address: ['', Validators.required]
    });

    this.VFormGroup3 = this.fb.group({
      port1: ['', Validators.required],
      port2: ['', Validators.required],
      port3: ['', Validators.required],
      port4: ['',],
      port5: ['',]
    });

    this.VFormGroup4 = this.fb.group({
      taxNumber: ['', [Validators.required,Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      telePhone: ['',[Validators.required,Validators.pattern('^[0-9]+$')]]
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
          if (!this.VFormGroup1.valid && !this.VFormGroup2.valid && !this.VFormGroup3.valid && !this.VFormGroup4.valid) {
            console.error('Form is invalid!');
            return;
          }
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
