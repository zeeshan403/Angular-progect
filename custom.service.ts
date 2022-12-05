import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  constructor(private http:HttpClient) { }

  // post Method

  postuser(data:any){
    return this.http.post<any>("http://localhost:3000/people",data).pipe(map((Response:any)=>{
return Response;
    }))
  }

  // get Method

  getuser(){
    return this.http.get<any>("http://localhost:3000/people").pipe(map((Response:any)=>{
return Response;
    }))
  }

  // put Method

  putuser(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/people/"+id,data).pipe(map((Response:any)=>{
return Response;
    }))
  }

  // delete Method

  deleteuser(id:number){
    return this.http.delete<any>("http://localhost:3000/people/"+id).pipe(map((Response:any)=>{
return Response;
    }))
  }
}
