import { MONTH_NAMES } from '@src/common/enums';

export function formatDateFromISOString(isoString: string): string {
  const date = new Date(isoString);

  const month = MONTH_NAMES[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
