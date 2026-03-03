import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';

import { MenuPageComponent } from './menu-page.component';

describe('MenuPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPageComponent],
      // RouterLink в шаблоне требует Router => даём пустой роутер
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MenuPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have zero selected initially', () => {
    const fixture = TestBed.createComponent(MenuPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.selectedCount()).toBe(0);
    expect(component.selectedTotal()).toBe(0);

    // активное меню есть (первое из JSON)
    expect(component.activeMenu()?.title).toBeTruthy();
  });

  it('should update count and total when toggling items', () => {
    const fixture = TestBed.createComponent(MenuPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const firstItem = component.activeItems()[0];
    const secondItem = component.activeItems()[1];

    component.toggleItem(firstItem.id);
    expect(component.selectedCount()).toBe(1);
    expect(component.selectedTotal()).toBe(firstItem.value);

    component.toggleItem(secondItem.id);
    expect(component.selectedCount()).toBe(2);
    expect(component.selectedTotal()).toBe(firstItem.value + secondItem.value);

    component.toggleItem(firstItem.id);
    expect(component.selectedCount()).toBe(1);
    expect(component.selectedTotal()).toBe(secondItem.value);
  });

  it('should keep selection when switching menus (new behavior)', () => {
    const fixture = TestBed.createComponent(MenuPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const firstMenuId = component.menus[0].id;
    const secondMenuId = component.menus[1].id;

    // выбрали item в первом меню
    const firstItemMenu1 = component.activeItems()[0];
    component.toggleItem(firstItemMenu1.id);

    expect(component.selectedCount()).toBe(1);
    expect(component.selectedTotal()).toBe(firstItemMenu1.value);

    // переключились на другое меню — там выбор пустой
    component.selectMenu(secondMenuId);
    expect(component.activeMenuId()).toBe(secondMenuId);
    expect(component.selectedCount()).toBe(0);
    expect(component.selectedTotal()).toBe(0);

    // выбрали item во втором меню
    const firstItemMenu2 = component.activeItems()[0];
    component.toggleItem(firstItemMenu2.id);
    expect(component.selectedCount()).toBe(1);
    expect(component.selectedTotal()).toBe(firstItemMenu2.value);

    // вернулись в первое меню — выбор сохранился
    component.selectMenu(firstMenuId);
    expect(component.selectedCount()).toBe(1);
    expect(component.selectedTotal()).toBe(firstItemMenu1.value);

    // и итог по всем меню = 2 items
    expect(component.totalCountAllMenus()).toBe(2);
    expect(component.totalSumAllMenus()).toBe(firstItemMenu1.value + firstItemMenu2.value);
    });
});