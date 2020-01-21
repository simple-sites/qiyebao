import { Component, OnInit } from "@angular/core";
import { ConfigService } from '../config.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
  url = "assets/api/contact";
  contact;

  constructor(
    private config: ConfigService,
    translate: TranslateService) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.config.request(this.url, (data) => {
        this.contact = data;
      });
    });
  }

  ngOnInit() {
    this.config.request(this.url, (data) => {
      this.contact = data;
    });
  }

}
