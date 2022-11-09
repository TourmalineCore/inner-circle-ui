export const formatMoney = (number: number, local: string = 'ru-RU') => `${Intl.NumberFormat(local).format(number)} ₽`;
