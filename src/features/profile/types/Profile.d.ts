export type ProfileNavItems = {
  text?: string;
  icon?: ReactNode;
  href: string;
  onClick?: () => unknown;
  active?: boolean;
};

export type Employee = {
  id: number | undefined;
  fullName: string | undefined;
  corporateEmail: string | undefined;
  personalEmail: string | undefined;
  phone: string | undefined;
  gitHub: string | undefined;
  gitLab: string | undefined;
};
