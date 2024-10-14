import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {

  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'edit', 'delete'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private contactService: ContactService, private router: Router, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.loadContacts()
  }

  loadContacts() {
    this.contactService.getContacts().subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => console.error(e)
    });
  }

  openCreatePage() {
    this.router.navigateByUrl('/create-contact');
  }

  editContact(id: number) {
    this.contactService.setData(id);
    this.router.navigate(['/create-contact', id]);
  }

  deleteContact(id: number) {
    if (confirm('Are you sure want to delete?')) {
      this.contactService.deleteContact(id).subscribe({
        next: (data) => {
          //console.log(data);
          this.toastr.success('Contact deleted successfuly.');
          this.loadContacts();
        },
        error: (e) => {
          this.toastr.error('Error occured. Please try again!');
          console.error(e);
        }
      });
    }
  }
}
