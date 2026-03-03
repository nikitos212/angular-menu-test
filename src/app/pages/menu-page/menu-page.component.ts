import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MENU_DATA, MenuSection } from '../../shared/menu-data';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.css',
})
export class MenuPageComponent {
  readonly menus = MENU_DATA;

  readonly activeMenuId = signal(this.menus[0]?.id ?? '');

  readonly selectedItemIds = signal<Set<string>>(new Set());

  readonly activeMenu = computed<MenuSection | undefined>(() =>
    this.menus.find(m => m.id === this.activeMenuId())
  );

  readonly activeItems = computed(() => this.activeMenu()?.items ?? []);

  readonly selectedCount = computed(() => this.selectedItemIds().size);

  readonly selectedTotal = computed(() => {
    const selected = this.selectedItemIds();
    return this.activeItems()
      .filter(i => selected.has(i.id))
      .reduce((sum, i) => sum + i.value, 0);
  });

  selectMenu(menuId: string) {
    this.activeMenuId.set(menuId);
    this.selectedItemIds.set(new Set());
  }

  toggleItem(itemId: string) {
    const next = new Set(this.selectedItemIds());
    if (next.has(itemId)) next.delete(itemId);
    else next.add(itemId);
    this.selectedItemIds.set(next);
  }

  isChecked(itemId: string) {
    return this.selectedItemIds().has(itemId);
  }
}