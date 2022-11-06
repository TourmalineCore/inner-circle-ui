function printData(
  data: string | number,
  locale: string = 'ru-RU',
  isCurrency: boolean = false,
) {
  if (isCurrency) {
    return (
      <>
        {' '}
        {Intl.NumberFormat(locale).format(data as number)}
        {' '}
        ₽
      </>
    );
  }
  return (
    <>
      {' '}
      {data}
    </>
  );
}

export default printData;
