import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { contact } from '../models/contact';
import { ContactService } from '../service/contact.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  contactId: number = 0;

  constructor(private formBuilder: FormBuilder, private router: Router, private contactService: ContactService, private toastr: ToastrService,
    private route: ActivatedRoute) {
    if (this.route.snapshot.paramMap.get('id') != undefined) {
      this.contactId = this.route.snapshot.paramMap.get('id') != null ? Number(this.route.snapshot.paramMap.get('id')) : 0;
    }
    this.contactForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]]
    })
  }

  ngOnInit(): void {
    if (this.contactId != 0) {
      this.contactService.getContact(this.contactId).subscribe({
        next: (data) => {
          this.contactForm.controls['firstName'].setValue(data.firstName);
          this.contactForm.controls['lastName'].setValue(data.lastName);
          this.contactForm.controls['email'].setValue(data.email);
        },
        error: (e) => {
          this.toastr.error('Error occured while loading data. Please try again!');
        }
      });
    }
  }

  get controls(): { [p: string]: AbstractControl } {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    //console.info("Form Valid!")

    var contact: contact = {
      id: this.contactId,
      firstName: this.contactForm.controls['firstName'].getRawValue(),
      lastName: this.contactForm.controls['lastName'].getRawValue(),
      email: this.contactForm.controls['email'].getRawValue(),
    };

    if (this.contactId == 0) {
      this.contactService.postContact(contact).subscribe({
        next: (data) => {
          //console.log(data);
          this.toastr.success('Contact added successfuly.');
          this.router.navigate(['/']);
        },
        error: (e) => {
          this.toastr.error('Error occured while adding contact. Please try again!');
          console.error(e);
        }
      });
    } else {
      this.contactService.updateContact(this.contactId, contact).subscribe({
        next: (data) => {
          //console.log(data);
          this.toastr.success('Contact updated successfuly.');
          this.contactId = 0;
          this.router.navigate(['/']);
        },
        error: (e) => {
          this.toastr.error('Error occured while updating contact. Please try again!');
          console.error(e);
        }
      });
    }
  }

  onCancel(){
    this.router.navigate(['/']);
  }

}
