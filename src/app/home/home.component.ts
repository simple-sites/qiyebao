import { Component, OnInit } from "@angular/core";
import { ConfigService } from '../config.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  products = [];
  news = [];
  newsUrl = "assets/api/news";
  productUrl = "assets/api/product";
  hash = "#";
  page = 1;

  constructor(private config: ConfigService,
    translate: TranslateService) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.config.request(this.newsUrl, (data: any) => {
      this.news = data.news;
    });

    this.config.request(this.productUrl, (data: any) => {
      const itemPerRow = 3;
      const row = Math.floor(data.products.length / itemPerRow);
      this.products = data.products.slice(0, row * itemPerRow);
    });
  }
}
