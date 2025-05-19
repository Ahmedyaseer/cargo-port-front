import { Component } from "@angular/core";
import { ReactiveFormsModule, UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { BreadcrumbComponent } from "@shared/components/breadcrumb/breadcrumb.component";
import {MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-account-type',
  standalone: true,
  imports:[
    BreadcrumbComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatExpansionPanel,
    MatExpansionModule
    
  ],
  templateUrl: './add-account-type.component.html',
  styleUrls: ['./add-account-type.component.scss']
})
export class AddAccountTypeComponent {
  register: UntypedFormGroup;

  breadscrums = [
    {
      title: 'Define Account Type',
      items: ['Account Management'],
      active: 'Define New Account Type',
    },
  ];

  modulesAndScreens = {
    'Orders Screens': ['Order List', 'Order Details', 'Order History'],
    'Basic Data Screens': ['User Profiles', 'Settings', 'Data Overview'],
    'Account Management Screens': ['Create Account', 'Account Permissions', 'Manage Roles']
  };

  selectedScreens : any = {
    'Orders Screens': [],
    'Basic Data Screens': [],
    'Account Management Screens': []
  };

  constructor(private fb: UntypedFormBuilder) {
    this.register = this.fb.group({
      account: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      details: ['', Validators.required]
    });
  }

  onCheckboxChange(screenType: string, option: string, isChecked: boolean) {
    const selectedScreenList = this.selectedScreens[screenType];
  
    if (isChecked) {
      // Add the option if not already selected
      if (!selectedScreenList.includes(option)) {
        selectedScreenList.push(option);
      }
    } else {
      // Remove the option if already selected
      const index = selectedScreenList.indexOf(option);
      if (index > -1) {
        selectedScreenList.splice(index, 1);
      }
    }
  
    console.log('Updated selectedScreens:', this.selectedScreens);
  }
  




// Handle Form Submission
passParameter() {
  if (this.register.valid) {
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
            'Submitted!',
            'Your form has been submitted.',
            'success'
          );
          if (!this.register.valid) {
            return;
          }
      
          const formData = {
            ...this.register.value,
            selectedScreens: this.selectedScreens
          };
      
          console.log('Form Data:', formData);
          console.log('Form Data:', this.register.value);

          // Reset the form and clear validation errors
          this.register.reset();
          this.register.markAsPristine();
          this.register.markAsUntouched();
          Object.keys(this.register.controls).forEach((key) => {
            this.register.get(key)?.setErrors(null);
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Cancelled', 'Submission cancelled.', 'info');
        }
      });
  } else {
    Swal.fire('Error', 'Please complete all required fields.', 'error');
  }
}


}
