import { Component, OnInit } from "@angular/core";

import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = "qiyebao";
  supportedLanguages = ["en", "zh"];
  constructor(
    private translate: TranslateService,
    private titleService: Title,
  ) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log('language changed');
      translate.get("TITLE").subscribe((res: string) => {
        titleService.setTitle(res);
      });
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
    this.translate.setDefaultLang(locale);
    this.translate.use(locale);
    localStorage.setItem("locale", locale);
  }
  ngOnInit() {
    let locale = localStorage.getItem("locale");
    if (!locale) {
      locale = this.getLocaleString();
    }
    this.setLocale(locale);
  }
}
