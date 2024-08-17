import { MONTHS } from '@src/components/common/constants';

export function formatDateFromISOString(isoString: string): string {
  const date = new Date(isoString);

  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
