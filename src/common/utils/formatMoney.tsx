export const formatMoney = (number: number) => `${Intl.NumberFormat('ru-RU').format(number)} ₽`;
