export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
}

export interface Permission {
  id: number;
  name: string;
}
