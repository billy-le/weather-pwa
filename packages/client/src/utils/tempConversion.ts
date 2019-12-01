type unit = 'kelvin' | 'metric' | 'imperial';

export const tempConversion = (params: { from: unit; to: unit; value: number }): number => {
  const { from, to, value } = params;
  if (from === to) {
    return value;
  }
  if (from === 'kelvin' && to === 'metric') {
    return value - 273.15;
  }
  if (from === 'kelvin' && to === 'imperial') {
    return ((value - 273.15) * 9) / 5 + 32;
  }
  if (from === 'metric' && to === 'kelvin') {
    return value + 273.15;
  }
  if (from === 'metric' && to === 'imperial') {
    return (value * 9) / 5 + 32;
  }
  if (from === 'imperial' && to === 'kelvin') {
    return ((value - 32) * 5) / 9 + 273.15;
  }
  if (from === 'imperial' && to === 'metric') {
    return ((value - 32) * 5) / 9;
  }
  return value;
};
