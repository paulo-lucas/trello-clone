import { Component, Input, OnInit } from "@angular/core";
import { CardSchema } from "../../models/cardschema";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
})
export class CardComponent implements OnInit {
  @Input() card?: CardSchema;
  constructor() {}
  ngOnInit() {}
  dragStart(ev: any) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
}
