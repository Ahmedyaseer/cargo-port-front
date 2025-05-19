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

@Component({
  selector: 'app-add-account-type',
  standalone: true,
  imports: [ BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatButtonModule],
  templateUrl: './add-account-type.component.html',
  styleUrl: './add-account-type.component.scss'
})
export class AddAccountTypeComponent {
  register: UntypedFormGroup;
  hide = true;
  agree = false;
  customForm?: UntypedFormGroup;

  breadscrums = [
    {
      title: 'Add new account',
      items: ['Basic Info'],
      active: 'New Account',
    },
  ];

  constructor(private fb: UntypedFormBuilder) {
    this.register = this.fb.group({
      account: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      details: ['', [Validators.required]]
    });
  }
  onRegister() {
    // send data to end point
    if(!this.register.valid){
      return;
    }
    console.log('Form Value', this.register.value);
  }
}
