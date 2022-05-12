import { Component, OnInit } from '@angular/core';
import { CardStore } from '../../CardStore';
import { ListSchema } from '../../models/listschema';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  cardStore?: CardStore;
  lists?: ListSchema[];
  constructor() { }
  setMockData(): void {
    this.cardStore = new CardStore();
    const lists: ListSchema[] = [
      {
        name: 'A Fazer',
        cards: []
      },
      {
        name: 'Em Progresso',
        cards: []
      },
      {
        name: 'Concluido',
        cards: []
      }
    ]
    this.lists = lists;
  }

  ngOnInit() {
    this.setMockData();
  }

}