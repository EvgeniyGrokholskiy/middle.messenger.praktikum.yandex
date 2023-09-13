// Функция getTime принимает один аргумент dateInMS, представляющий дату и время в миллисекундах.
// Она возвращает строку, представляющую время сообщения в заданном формате.
export const getTime = (dateInString: string): string => {
  if (!dateInString) {
    return '';
  }

  const messageSendDate = new Date(dateInString);
  const dateInMs = messageSendDate.getTime();
  const nowDate = new Date();

  const nowDay = nowDate.getDate();
  const messageDay = messageSendDate.getDate();

  if (nowDay === messageDay) {
    const hours = messageSendDate.getHours().toString().padStart(2, '0');
    const minutes = messageSendDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const nowDateInMS = nowDate.getTime();
  const timeDifference = nowDateInMS - dateInMs;
  const oneDayInMS = 24 * 60 * 60 * 1000;

  if (timeDifference < oneDayInMS) {
    return 'вчера';
  }

  const day = messageSendDate.getDate().toString().padStart(2, '0');
  const month = (messageSendDate.getMonth() + 1).toString().padStart(2, '0');
  const year = messageSendDate.getFullYear().toString().slice(2);

  return `${day}.${month}.${year}`;
};
