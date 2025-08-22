export function parseDurationToMs(durationStr: string): number {
  const parts = durationStr.split(":");
  if (parts.length !== 3) return 0;

  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const secondsAndMicros = parseFloat(parts[2]);

  return Math.round(((hours * 60 + minutes) * 60 + secondsAndMicros) * 1000);
}
