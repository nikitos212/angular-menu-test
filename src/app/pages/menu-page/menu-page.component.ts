import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MENU_DATA, MenuSection } from '../../shared/menu-data';

type SelectionMap = Record<string, Set<string>>;

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

  readonly selectedByMenuId = signal<SelectionMap>(this.createInitialSelectionMap());

  private createInitialSelectionMap(): SelectionMap {
    const map: SelectionMap = {};
    for (const m of this.menus) map[m.id] = new Set<string>();
    return map;
  }

  readonly activeMenu = computed<MenuSection | undefined>(() =>
    this.menus.find(m => m.id === this.activeMenuId())
  );

  readonly activeItems = computed(() => this.activeMenu()?.items ?? []);

  readonly activeSelectedIds = computed<Set<string>>(() => {
    const map = this.selectedByMenuId();
    return map[this.activeMenuId()] ?? new Set<string>();
  });

  readonly selectedCount = computed(() => this.activeSelectedIds().size);

  readonly selectedTotal = computed(() => {
    const selected = this.activeSelectedIds();
    return this.activeItems()
      .filter(i => selected.has(i.id))
      .reduce((sum, i) => sum + i.value, 0);
  });

  readonly totalCountAllMenus = computed(() => {
    const map = this.selectedByMenuId();
    return Object.values(map).reduce((acc, set) => acc + set.size, 0);
  });

  readonly totalSumAllMenus = computed(() => {
    const map = this.selectedByMenuId();

    const valueIndex: Record<string, Record<string, number>> = {};
    for (const m of this.menus) {
      valueIndex[m.id] = {};
      for (const it of m.items) valueIndex[m.id][it.id] = it.value;
    }

    let sum = 0;
    for (const [menuId, set] of Object.entries(map)) {
      const idx = valueIndex[menuId] ?? {};
      for (const itemId of set) sum += idx[itemId] ?? 0;
    }
    return sum;
  });

  selectMenu(menuId: string) {
    this.activeMenuId.set(menuId);
  }

  toggleItem(itemId: string) {
    const menuId = this.activeMenuId();

    const currentMap = this.selectedByMenuId();
    const currentSet = currentMap[menuId] ?? new Set<string>();

    const nextSet = new Set(currentSet);
    if (nextSet.has(itemId)) nextSet.delete(itemId);
    else nextSet.add(itemId);

    const nextMap: SelectionMap = { ...currentMap, [menuId]: nextSet };
    this.selectedByMenuId.set(nextMap);
  }

  isChecked(itemId: string) {
    return this.activeSelectedIds().has(itemId);
  }

  clearActiveMenuSelection() {
    const menuId = this.activeMenuId();
    const nextMap: SelectionMap = { ...this.selectedByMenuId(), [menuId]: new Set() };
    this.selectedByMenuId.set(nextMap);
  }
}