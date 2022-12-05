import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomService } from '../share/custom.service';
import { person } from './person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  userform!:FormGroup;
personobj:person = new person;

allperson:any;
showadd!:boolean;
showupdate!:boolean;
  constructor(private fb:FormBuilder,private apiservices:CustomService) { }

  ngOnInit(): void {
    this.userform = this.fb.group({
      name:[''],
      email:[''],
      dob:[''],
      country:[''],
      avatar:['']
    })
    this.allpersondata();
  }
  allbtn(){
    this.userform.reset();
    this.showadd = true;
    this.showupdate = false;
  }
// now subscribeing data which map via services

addperson(){
  this.personobj.name = this.userform.value.name;
  this.personobj.email = this.userform.value.email;
  this.personobj.dob = this.userform.value.dob;
  this.personobj.country = this.userform.value.country;
  this.personobj.avatar = this.userform.value.avatar

  this.apiservices.postuser(this.personobj).subscribe(Response=>{
    console.log(Response);
    alert("Person Record Added Succseefull ♥");
    //clear fill form data
    let ref = document.getElementById('clear')
    ref?.click();

    this.userform.reset();
    this.allpersondata();
  },
  err=>{
    alert("Person Record Not Found");
  }
  )
}
//show data method
allpersondata(){
  this.apiservices.getuser().subscribe(Response=>{
    this.allperson = Response;
  })
}
//delete data method
deletedata(data:any){
  this.apiservices.deleteuser(data.id).subscribe(Response=>{
    alert("Person Data Deleted ♥");
    this.allpersondata();
  },
  err=>{
    alert("Data not Delete Error ♥")
  })
}
//set edit value
oneditperson(data:any){
  this.showadd = false;
  this.showupdate = true;
this.personobj.id = data.id;
  this.userform.controls['name'].setValue(data.name),
  this.userform.controls['email'].setValue(data.email),
  this.userform.controls['dob'].setValue(data.dob),
  this.userform.controls['country'].setValue(data.country),
  this.userform.controls['avatar'].setValue(data.avatar)
}
//update data
updateperson(){
  this.personobj.name = this.userform.value.name;
  this.personobj.email = this.userform.value.email;
  this.personobj.dob = this.userform.value.dob;
  this.personobj.country = this.userform.value.country;
  this.personobj.avatar = this.userform.value.avatar

   this.apiservices.putuser(this.personobj,this.personobj.id).subscribe(Response=>{
    alert("♥ Person Data has updated ♥");
    //clear fill form data
    let ref = document.getElementById('clear')
    ref?.click();

    this.userform.reset();
    this.allpersondata();
   },
   err=>{
    alert("♥ Data Not Update Error ♥")
   })
}
}
