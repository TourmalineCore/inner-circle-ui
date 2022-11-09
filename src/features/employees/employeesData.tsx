type DataProps = {
  fullName: string;
  phone: string;
  workEmail: string;
  personalEmail: string;
  skype: string;
  telegram?: string;
};

export const data: DataProps[] = [
  {
    fullName: 'Employee 1',
    workEmail: 'emp1@tourmalinecore.com',
    personalEmail: 'emp1@mail.ru',
    phone: '+71111111111',
    skype: '@emp1skype',
    telegram: '@emp1teleg',
  },
  {
    fullName: 'Employee 2',
    workEmail: 'emp2@tourmalinecore.com',
    personalEmail: 'emp2@mail.ru',
    phone: '+71111111112',
    skype: '@emp2skype',
  },
  {
    fullName: 'Employee 3',
    workEmail: 'emp3@tourmalinecore.com',
    personalEmail: 'emp3@mail.ru',
    phone: '+71111111113',
    skype: '@emp3skype',
  },
  {
    fullName: 'Employee 4',
    workEmail: 'emp4@tourmalinecore.com',
    personalEmail: 'emp4@mail.ru',
    phone: '+71111111114',
    skype: '@emp4skype',
    telegram: '@emp4teleg',
  },
  {
    fullName: 'Employee 5',
    workEmail: 'emp5@tourmalinecore.com',
    personalEmail: 'emp5@mail.ru',
    phone: '+71111111115',
    skype: '@emp5skype',
  },
];
