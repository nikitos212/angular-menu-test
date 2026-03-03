export type MenuItem = {
  id: string;
  label: string;
  value: number;
};

export type MenuSection = {
  id: string;
  title: string;
  items: MenuItem[];
};

export const MENU_DATA: MenuSection[] = [
  {
    id: 'тип1',
    title: 'Тип 1',
    items: [
      { id: 'i1', label: 'Item 1', value: 20 },
      { id: 'i2', label: 'Item 2', value: 30 },
      { id: 'i3', label: 'Item 3', value: 40 },
      { id: 'i4', label: 'Item 4', value: 50 },
    ],
  },
  {
    id: 'тип2',
    title: 'Тип 2',
    items: [
      { id: 'i1', label: 'Item 1', value: 10 },
      { id: 'i2', label: 'Item 2', value: 15 },
      { id: 'i3', label: 'Item 3', value: 25 },
      { id: 'i4', label: 'Item 4', value: 60 },
    ],
  },
  {
    id: 'тип3',
    title: 'Тип 3',
    items: [
      { id: 'i1', label: 'Item 1', value: 5 },
      { id: 'i2', label: 'Item 2', value: 12 },
      { id: 'i3', label: 'Item 3', value: 18 },
    ],
  },
];