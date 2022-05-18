import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardStore } from '../../CardStore';
import { ListSchema } from '../../models/listschema';

import { ItemService } from 'src/app/services/item.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
  cardStore?: CardStore;
  lists?: ListSchema[];
  displayAddCard = false;

  constructor(
    private itemService: ItemService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  toggleDisplayAddCard() {
    this.displayAddCard = !this.displayAddCard;
  }

  filterArray(items: Array<any>, status: string) {
    return items
      .filter((item) => status === item.status)
      .map((item) => item._id);
  }

  async setInitialData(): Promise<void> {
    this.cardStore = new CardStore();

    await this.itemService.list().subscribe((data) => {
      data.items.forEach((item: any) =>
        this.cardStore?.newCard(item._id, item.content)
      );

      const lists: ListSchema[] = [
        {
          name: 'Pending',
          cards: this.filterArray(data.items, 'pending'),
        },
        {
          name: 'In Progress',
          cards: this.filterArray(data.items, 'inProgress'),
        },
        {
          name: 'Closed',
          cards: this.filterArray(data.items, 'closed'),
        },
      ];

      this.lists = lists;
    });
  }

  ngOnInit() {
    if (!this.tokenStorage.getToken()) this.router.navigate(['/login']);
    else this.setInitialData();
  }

  onEnter(value: string) {
    this.itemService.create(value).subscribe((data) => {
      this.cardStore?.newCard(data.item.id, data.item.content);
      this.lists?.[0].cards?.push(data.item.id);
    });
  }
}
