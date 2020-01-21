import { Component, OnInit, AfterViewInit } from "@angular/core";

import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { Title } from "@angular/platform-browser";
import { Router, NavigationStart } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

declare var particlesJS: any;
declare var $: any;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, AfterViewInit {
  supportedLanguages = ["en", "zh"];

  active = 0;

  // Company info
  name = "NAV-NAME";
  intro;
  url = "home";
  samples;
  constructor(
    private translate: TranslateService,
    private titleService: Title,
    private router: Router,
    private http: HttpClient,
    public config: ConfigService
  ) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get("TITLE").subscribe((res: string) => {
        titleService.setTitle(res);
      });
      this.config.request("assets/api/intro", (data) => {
        this.intro = data;
      });
    });
    router.events.subscribe(event => {
      // console.log(event);
      if (event instanceof NavigationStart) {
        let tab = event.url.substr(1);
        tab = tab.split("/")[0];
        if (tab) {
          this.url = tab;
        } else {
          this.url = "home";
        }
        if (this.url === "home") {
          // particlesJS.load("particles-js", "assets/particles.json", () => {
             // console.log("callback - particles.js config loaded");
          // });
        }
      }
    });
  }
  getLocaleString() {
    let locale = navigator.language;
    if (this.supportedLanguages.indexOf(locale) !== -1) {
      return locale;
    }
    locale = locale.split("-")[0];
    if (this.supportedLanguages.indexOf(locale) !== -1) {
      return locale;
    }
    return "en";
  }

  setLocale(locale: string) {
    this.config.language = locale;
    this.translate.setDefaultLang(locale);
    this.translate.use(locale);
    $("select").val(locale);
    $(".selectpicker").selectpicker("refresh");
    localStorage.setItem("locale", locale);
  }

  ngAfterViewInit() {
    console.log(this.url);

    $(".carousel").carousel({
      interval: 10000
    });

    $(".selectpicker").selectpicker();
    $(".selectpicker").on("changed.bs.select", e => {
      console.log("change detected!");
      console.log(e.target.value);
      this.setLocale(e.target.value);
    });
  }

  ngOnInit() {
    let locale = localStorage.getItem("locale");
    if (!locale) {
      locale = this.getLocaleString();
    }
    this.setLocale(locale);
    this.config.request("assets/api/intro", (data) => {
      this.intro = data;
    });

    this.config.request("assets/api/product", (data: any) => {
      this.samples = data.products;
    });
  }
}
