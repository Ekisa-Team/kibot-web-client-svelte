export type MenuItem = {
  path?: string;
  name: string;
  icon: string;
  isDisclosed?: boolean;
  children?: Array<MenuItem>;
};

export type Menu = MenuItem[];
