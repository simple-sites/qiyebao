import { Component, Input, SimpleChanges, OnChanges } from "@angular/core";

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.scss"]
})

export class PaginatorComponent implements OnChanges {

  @Input()
  hash = "#";

  @Input()
  url = "/";

  @Input()
  page = 1;

  @Input()
  total = 10;

  @Input()
  columns = 5;

  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    for (const name of ["page", "total", "columns"]) {
      if (changes[name]) {
        this[name] = parseInt("" + changes[name].currentValue, 10);
      }
    }
  }
}
