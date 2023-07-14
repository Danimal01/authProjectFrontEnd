import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {
  response: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  callBackend(): void {
    this.apiService.getTestEndpoint().subscribe(
      (res: string) => {
        this.response = res;
      },
      (err) => {
        console.error(err);
      }
    );

  }
}
