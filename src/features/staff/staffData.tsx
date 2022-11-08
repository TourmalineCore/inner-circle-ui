type DataProps = {
  employee: string;
  email: string;
  phone: string;
  skypeId: string;
  telegramId?: string;
};

export const data: DataProps[] = [
  {
    employee: 'Employee 1',
    email: 'emp1@tourmalinecore.com',
    phone: '+71111111111',
    skypeId: '@emp1skype',
    telegramId: '@emp1teleg',
  },
  {
    employee: 'Employee 2',
    email: 'emp2@tourmalinecore.com',
    phone: '+71111111112',
    skypeId: '@emp2skype',
  },
  {
    employee: 'Employee 3',
    email: 'emp3@tourmalinecore.com',
    phone: '+71111111113',
    skypeId: '@emp3skype',
  },
  {
    employee: 'Employee 4',
    email: 'emp4@tourmalinecore.com',
    phone: '+71111111114',
    skypeId: '@emp4skype',
    telegramId: '@emp4teleg',
  },
  {
    employee: 'Employee 5',
    email: 'emp5@tourmalinecore.com',
    phone: '+71111111115',
    skypeId: '@emp5skype',
  },
];
