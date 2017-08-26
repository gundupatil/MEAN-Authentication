import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ContactService} from '../../services/contact.service';
import {Contact} from '../../contact';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[ContactService]
})
export class ProfileComponent implements OnInit {
  user:Object;
  contacts:Contact[]=[];
  conatct:Contact;
  first_name:string;
  last_name:string;
  phone:string;
  constructor(private authService:AuthService, private router:Router, private contactService:ContactService) { }

  addContact(){
    const newContact={
      first_name:this.first_name,
      last_name:this.last_name,
      phone: this.phone
    }
    this.contactService.addContact(newContact)
    .subscribe(contact=> {
      this.contacts.push(contact);
      this.contactService.getContacts()
    .subscribe(contacts => this.contacts=contacts);
    });
  }

  deleteContact(id:any){
    var contacts = this.contacts;
    this.contactService.deleteContact(id)
    .subscribe(data => {
      if(data.n==1)
      {
          for(var i = 0; i < contacts.length; i++){
              if(contacts[i]._id==id){
                contacts.splice(i,1);
              }

          }
      }
    });
  }


  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });

  }

}
