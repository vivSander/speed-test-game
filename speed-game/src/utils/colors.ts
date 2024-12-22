export const generateColors = (count: number): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    const hue = (i * (360 / count)) % 360;
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }
  return colors.sort(() => Math.random() - 0.5); // Shuffle colors
};