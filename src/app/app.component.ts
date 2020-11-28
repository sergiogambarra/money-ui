import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  showToaster(){
    this.toastr.success("Hello, I'm the toastr message.")
}

showingNavbar(){
  return this.router.url !== '/login';
}


}
