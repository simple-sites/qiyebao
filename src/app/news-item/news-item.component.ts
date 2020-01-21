import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: "app-news-item",
  templateUrl: "./news-item.component.html",
  styleUrls: ["./news-item.component.scss"]
})
export class NewsItemComponent implements OnInit {
  id = "";
  item;

  // hash = "#";
  page = 1;

  url = "assets/api/item";


  constructor(private route: ActivatedRoute, public config: ConfigService,
    translate: TranslateService) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.config.request(this.url, (data: any) => {
        this.item = data;
      }, { id: this.id });
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.page = parseInt(param.get("page"), 10);
      this.id = param.get("id");
      this.config.request(this.url, (data: any) => {
        this.item = data;
      }, { id: this.id });
    });
  }

}
