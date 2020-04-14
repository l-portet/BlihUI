import sortString from '@/utils/sort-string';

export default function(a, b) {
  a = a.name.toLowerCase();
  b = b.name.toLowerCase();

  return sortString(a, b);
}
