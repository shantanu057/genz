import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ibooks } from 'src/app/Models/book.module';
import { BookService } from 'src/app/Services/Book Details/BookDetails.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  providers:[BookService]
})
export class BookDetailsComponent implements OnInit {

  data:Ibooks[]=[];
  userlocation:Ibooks[]=[];
  usercollege:Ibooks[]=[];
  usercourse:Ibooks[]=[];
  userbooks:Ibooks[]=[];

  constructor(private bookservice:BookService, private _router:Router, private http:HttpClient) { }

  locationControl = new FormControl('', Validators.required);
  collegeControl = new FormControl('', Validators.required);
  courseControl = new FormControl('', Validators.required);
  bookControl = new FormControl('', Validators.required);


  ngOnInit(): void {
    // this.bookservice.getBooksByApi().subscribe((bookdata:Ibooks[])=>{
    //   this.data=bookdata;
    // })

    this.http.get<any>("http://localhost:3000/books").subscribe((bookdata:Ibooks[])=>{
        this.data=bookdata ;
    })
  }

  filterbooks(){
    // this.bookservice.fetchbooks(this.locationControl.value as string,this.collegeControl.value as string, this.courseControl.value as string, this.bookControl.value as string).subscribe((bookdata)=>{
    //   this.data=bookdata as Ibooks[];
    //   console.log(this.data)
    // })

    this.http.get<any>("http://localhost:3000/books").subscribe((bookdata:Ibooks[])=>{
      this.data=bookdata.filter(x=>x.sellerAddress==this.locationControl.value &&  x.collegename==this.collegeControl.value  && x.course==this.courseControl.value && x.bookname==this.bookControl.value);
      if(this.data.length==0)
      {
        // this.data="No Books Found" as Ibooks;
      }
    })

  }

  viewBook(bookdata:any){
    this._router.navigate(['app-display-books',bookdata.bookid]);
  }

}
