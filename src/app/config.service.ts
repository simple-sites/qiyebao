import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  hash = "#";
  public language = "zh";
  constructor(
    private http: HttpClient,
  ) {
    this.initAddToHome();
  }

  request(url, cb, params = undefined) {
    this.http.get(url + "/" + this.language + ".json", { params }).subscribe(cb);
  }

  initAddToHome() {
    console.log("init add to home screen");
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      // Stash the event so it can be triggered later.
      console.log("beforeinstallprompt");
      deferredPrompt = e;
    });

  }
}
