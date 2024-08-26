export const formatNumber = (number: number) => Intl.NumberFormat('ru-RU').format(number);
export const formatMoney = (number: number) => `${formatNumber(number)} ₽`;
export const reformatMoney = (number: string) => {
  if (number.includes('₽')) {
    number = number.replace('₽', '');
  }
  if (number.includes('%')) {
    number = number.replace('%', '');
  }

  if (number.includes(' ')) {
    number = number.replace(/\s/g, '');
  }

  return number;
};
