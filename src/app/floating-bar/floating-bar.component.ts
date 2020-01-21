import {
  Component,
  OnInit,
  AfterViewChecked
} from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faQq, faWeibo, faWeixin, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faFax } from "@fortawesome/free-solid-svg-icons";
import { ConfigService } from '../config.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

declare var $: any;

@Component({
  selector: "app-floating-bar",
  templateUrl: "./floating-bar.component.html",
  styleUrls: ["./floating-bar.component.scss"]
})
export class FloatingBarComponent implements OnInit, AfterViewChecked {
  stores;
  socials;
  urlStore = "assets/api/store";
  urlSocials = "assets/api/social";

  constructor(private config: ConfigService, private library: FaIconLibrary,
    translate: TranslateService) {
    library.addIcons(faQq, faWeibo, faWeixin, faTwitter, faFacebook, faPhone, faFax);
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.ngOnInit();
    });
  }

  ngAfterViewChecked() {
    this.tooltip();
  }

  tooltip() {
    $('[data-toggle="tooltip"]').tooltip({
      animated: "fade",
      placement: "left",
      html: true
    });
  }

  ngOnInit() {
    this.config.request(this.urlStore, (data: any) => {
      this.stores = data;
    });

    this.config.request(this.urlSocials, (data: any) => {
      this.socials = data;
    });
  }
}
