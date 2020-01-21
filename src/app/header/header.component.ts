import { Component, OnInit } from "@angular/core";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { ConfigService } from '../config.service';
import {
  faHome,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  // logo = "assets/images/logo.png";
  faHome = faHome;
  faBookmark = faBookmark;
  favoriteCtrlD = "";
  homeSetAlert = "";

  mac = false;
  
  url = "assets/api/intro";
  intro;
  constructor(
    private config: ConfigService,
    private translate: TranslateService
      ) {
    this.mac = navigator.userAgent.toLowerCase().indexOf("mac") !== - 1;
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.ngOnInit();
      if (this.mac) {
        translate.get("FAVORITE-CTRL-D-MAC").subscribe((res: string) => {
          this.favoriteCtrlD = res;
        });
      } else {
        translate.get("FAVORITE-CTRL-D").subscribe((res: string) => {
          this.favoriteCtrlD = res;
        });
      }

      translate.get("HOME-SET-ALERT").subscribe((res: string) => {
        this.homeSetAlert = res;
      });
    });
  }

  ngOnInit() {
    this.config.request(this.url, (data: any) => {
      this.intro = data;
    });
  }

  addToFavorite(win: any, doc: any) {
    try {
      win.sidebar.addPanel(doc.title, win.location.href, "");
    } catch (e) {
      try {
        win.external.AddFavorite(location.href, doc.title);
      } catch (e1) {
        try {
          win.triggerBookmark.attr("rel", "sidebar").attr("title", doc.title).attr("href", win.location.href);
        } catch (e2) {
          alert(this.favoriteCtrlD);
        }
      }
    }
    // If you have something in the `href` of your trigger
    return false;
  }

  addCurrent() {
    console.log("addCurrent");
    this.addToFavorite(window, document);
  }

  setHomepage(url: string, doc: any, win: any) {
    if (doc.all) {
      doc.body.style.behavior = "url(#default#homepage)";
      doc.body.setHomePage(url);

    } else if (win.sidebar) {
      if (win.netscape) {
        try {
          win.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch (e) {
          alert(this.homeSetAlert);
        }
      }
      try {
        const prefs = win.Components.classes["@mozilla.org/preferences-service;1"].getService(win.Components.interfaces.nsIPrefBranch);
        prefs.setCharPref("browser.startup.homepage", url);
      } catch (e) {

      }
    }
  }

  setCurrentHomePage() {
    this.setHomepage(location.href, document, window);
  }
}
