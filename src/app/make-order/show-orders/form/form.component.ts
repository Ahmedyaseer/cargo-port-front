import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Contacts } from '../contacts.model';
import { formatDate, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContactsService } from '../show-orders-service.service';

export interface DialogData {
  id: number;
  action: string;
  contacts: Contacts;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogClose,
    MatCardModule,
    DatePipe,
  ],
})
export class FormComponent {
  action: string;
  dialogTitle?: string;
  isDetails = false;
  contactsForm?: UntypedFormGroup;
  contacts: Contacts;
  url: string | null = null;
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public contactsService: ContactsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.isDetails = false;
      this.dialogTitle = data.contacts.name;
      this.contacts = data.contacts;
      this.contactsForm = this.createContactForm();
    } else if (this.action === 'details') {
      this.contacts = data.contacts;
      this.isDetails = true;
    } else {
      this.isDetails = false;
      this.dialogTitle = 'New Order';
      const blankObject = {} as Contacts;
      this.contacts = new Contacts(blankObject);
      this.contactsForm = this.createContactForm();
    }
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
     //return this.fb.group({
    //   id: [this.contacts.id],
    //   img: [this.contacts.img],
    //   name: [this.contacts.name],
    //   email: [
    //     this.contacts.email,
    //     [Validators.required, Validators.email, Validators.minLength(5)],
    //   ],
    //   });
    return  this.fb.group({
      productName: ['', [Validators.required]],
      description: ['',[Validators.required]],
      PackageType: ['', [Validators.required]],
      })
  }
  onSelectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(target.files[0]); // read file as data url

      reader.onload = (e) => {
        if (e.target) {
          this.url = e.target.result as string; // Explicitly cast to avoid undefined
        }
      };
    }
  }
  submit() {
    if (this.contactsForm?.valid) {
      this.contactsService.addContacts(this.contactsForm?.getRawValue());
      this.dialogRef.close(this.contactsForm?.getRawValue());
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
