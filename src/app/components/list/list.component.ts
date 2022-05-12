import { Component, Input, OnInit } from '@angular/core';
import { ListSchema } from '../../models/listschema';
import { CardStore } from '../../CardStore';

import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
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
    const targetClassName = target.className;
    
    this.itemService
      .move(
        data,
        this.status[this.list?.name as 'In Progress' | 'Pending' | 'Closed']
      )
      .subscribe(() => {
        while (target.className !== 'list') {
          target = target.parentNode;
        }
        target = target.querySelector('.cards');
        if (targetClassName === 'card') {
          $event.target.parentNode.insertBefore(
            document.getElementById(data),
            $event.target
          );
        } else if (targetClassName === 'list__title') {
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
