import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConfigService } from '../config.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: "app-factory",
  templateUrl: "./factory.component.html",
  styleUrls: ["./factory.component.scss"]
})
export class FactoryComponent implements OnInit {
  factories;
  url = "assets/api/factory";

  page = 1;
  total = 10;
  columns = 5;
  hash = "#";

  constructor(private route: ActivatedRoute, public config: ConfigService,
    translate: TranslateService) { 
      translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.config.request(this.url, (data: any) => {
          this.total = data.total;
          this.factories = data.factories;
        });
      });
    }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      const page = parseInt(param.get("page"), 10);
      this.page = page > 1 ? page : 1;

      this.config.request(this.url, (data: any) => {
        this.total = data.total;
        this.factories = data.factories;
      });
    });
  }

}
