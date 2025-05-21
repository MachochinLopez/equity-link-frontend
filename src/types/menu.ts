export interface MenuItem {
  href: string;
  label: string;
  permission?: string;
  icon?: string;
}

export interface MenuConfig {
  items: MenuItem[];
}

export interface MenuFilter {
  hasPermission: (permission: string) => boolean;
}
