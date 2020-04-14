import sortString from '@/utils/sort-string';

export default function(a, b) {
  a = a.year;
  b = b.year;

  return sortString(a, b);
}
