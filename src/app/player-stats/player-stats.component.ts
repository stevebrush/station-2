import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Enemy,
         Location,
         Player,
         Character,
         Item,
         Inventory,
         InventorySlot } from '../shared/classes';
import { ItemService,
         LocationService,
         PlayerService } from '../shared/services';

@Component({
  selector: 'station-player-stats',
  template: require('./player-stats.component.html')
})
export class PlayerStatsComponent implements OnInit {
  player: Player;

  constructor(
    private playerService: PlayerService) {}

  public use(slot: InventorySlot<any>): void {
    slot.item.actOn(this.player);
    slot.modifyQuantity(-1);
    this.player.inventory.clean();
  }

  public ngOnInit(): void {
    this.playerService.getPlayer().then(data => {
      this.player = data;
    });
  }
}
