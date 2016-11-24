import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Player } from '../shared/classes';

import { PlayerService } from '../shared/services';

@Component({
  selector: 'station-player-stats',
  template: require('./player-stats.component.html')
})
export class PlayerStatsComponent implements OnInit {
  player: Player;
  isInventoryOpen: boolean = false;

  constructor(
    private playerService: PlayerService) {}

  public toggleInventory(): void {
    this.isInventoryOpen = !this.isInventoryOpen;
  }

  public ngOnInit(): void {
    this.playerService.getPlayer().then(data => {
      this.player = data;
    });
  }
}
