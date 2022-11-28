import { Employee } from './types/Profile';

export const datae : Employee = {
  id: 1,
  name: 'Антон',
  surname: 'Антонов',
  middleName: 'Антонович',
  workEmail: 'anton@tourmaline.com',
  personalEmail: 'anton@mail.ru',
  phone: '+79568897630',
  github: '@antonov',
  gitlab: '@antonov',
};

export default function setData(newemp : Employee | undefined) {
  datae.id = newemp?.id;
  datae.name = newemp?.name;
  datae.surname = newemp?.surname;
  datae.middleName = newemp?.middleName;
  datae.workEmail = newemp?.workEmail;
  datae.personalEmail = newemp?.personalEmail;
  datae.phone = newemp?.phone;
  datae.github = newemp?.github;
  datae.gitlab = newemp?.gitlab;
}
