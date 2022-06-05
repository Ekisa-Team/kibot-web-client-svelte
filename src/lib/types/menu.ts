export type MenuItem = {
  path?: string;
  name: string;
  icon: string;
  badge?: {
    type: 'info' | 'success' | 'warning' | 'danger';
    text: string;
  };
  isDisclosed?: boolean;
  children?: Array<MenuItem>;
};

export type Menu = MenuItem[];
