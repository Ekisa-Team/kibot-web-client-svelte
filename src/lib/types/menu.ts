export type MenuItem = {
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
