export type MenuItem = {
  type: 'link' | 'group';
  path?: string;
  name: string;
  icon: string;
  badge?: {
    color: string;
    text: string;
  };
  isDisclosed?: boolean;
  children?: Array<MenuItem>;
};

export type Menu = MenuItem[];
