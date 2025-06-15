export function groupConsecutiveDates(dates: Date[]): Date[][] {
  if (!dates.length) return [];

  const sorted = [...dates].sort((a, b) => a.getTime() - b.getTime());
  const groups: Date[][] = [[sorted[0]]];

  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const current = sorted[i];

    const diffInDays =
      (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      groups[groups.length - 1].push(current);
    } else {
      groups.push([current]);
    }
  }

  return groups;
}
