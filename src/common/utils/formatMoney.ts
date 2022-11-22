export const formatNumber = (number: number) => Intl.NumberFormat('ru-RU').format(number);
export const formatMoney = (number: number) => `${formatNumber(number)} ₽`;
