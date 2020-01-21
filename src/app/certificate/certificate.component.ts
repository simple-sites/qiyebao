import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConfigService } from '../config.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: "app-certificate",
  templateUrl: "./certificate.component.html",
  styleUrls: ["./certificate.component.scss"]
})
export class CertificateComponent implements OnInit {

  certificates;
  url = "assets/api/certificate";

  page = 1;
  total = 10;
  columns = 5;

  constructor(private route: ActivatedRoute, public config: ConfigService,
    translate: TranslateService) { 
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.config.request(this.url, (data: any) => {
        this.total = data.total;
        this.certificates = data.certificates;
      });
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      const page = parseInt(param.get("page"), 10);
      this.page = page > 1 ? page : 1;
      this.config.request(this.url, (data: any) => {
        this.total = data.total;
        this.certificates = data.certificates;
      });
    });
  }

}
