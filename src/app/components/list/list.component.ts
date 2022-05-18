import { Component, Input, OnInit } from '@angular/core';
import { ListSchema } from '../../models/listschema';
import { CardStore } from '../../CardStore';

import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  @Input() list?: ListSchema;
  @Input() cardStore?: CardStore;
  status = {
    'In Progress': 'inProgress',
    Pending: 'pending',
    Closed: 'closed',
  };

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {}

  allowDrop($event: any) {
    $event.preventDefault();
  }

  drop($event: any) {
    $event.preventDefault();
    const data = $event.dataTransfer.getData('text');
    let target = $event.target;
    const targetClassName = target.className.split(' ');

    this.itemService
      .move(
        data,
        this.status[this.list?.name as 'In Progress' | 'Pending' | 'Closed']
      )
      .subscribe(() => {
        while (!target.className.split(' ').includes('list')) {
          target = target.parentNode;
        }
        target = target.querySelector('.cards');
        if (targetClassName.includes('card')) {
          $event.target.parentNode.insertBefore(
            document.getElementById(data),
            $event.target
          );
        } else if (targetClassName.includes('list__title')) {
          if (target.children.length) {
            target.insertBefore(
              document.getElementById(data),
              target.children[0]
            );
          } else {
            target.appendChild(document.getElementById(data));
          }
        } else {
          target.appendChild(document.getElementById(data));
        }
      });
  }
}
