import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConfigService } from '../config.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"]
})
export class NewsComponent implements OnInit {
  url = "assets/api/news";

  page = 1;
  total = 10;
  columns = 5;
  news = [];

  constructor(private route: ActivatedRoute, public config: ConfigService,
    translate: TranslateService) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.config.request(this.url, (data: any) => {
        this.total = data.total;
        this.news = data.news;
      });
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      const page = parseInt(param.get("page"), 10);
      this.page = page > 1 ? page : 1;

      this.config.request(this.url, (data: any) => {
        this.total = data.total;
        this.news = data.news;
      });
    });
  }
}
