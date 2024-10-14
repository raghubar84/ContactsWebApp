import { Component, OnInit } from '@angular/core';
import { ContactService } from './service/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Contact App';

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loadContacts()
  }

  loadContacts() {
    this.contactService.getContacts().subscribe({
      next: (res) => {
        console.log(res);        
      },
      error: (e) => console.error(e)
    });
  }
}
