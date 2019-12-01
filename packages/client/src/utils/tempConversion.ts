type unit = 'kelvin' | 'celsius' | 'fahrenheit';

export const tempConversion = (params: { from: unit; to: unit; value: number }): number => {
  const { from, to, value } = params;
  if (from === to) {
    return value;
  }
  if (from === 'kelvin' && to === 'celsius') {
    return value - 273.15;
  }
  if (from === 'kelvin' && to === 'fahrenheit') {
    return ((value - 273.15) * 9) / 5 + 32;
  }
  if (from === 'celsius' && to === 'kelvin') {
    return value + 273.15;
  }
  if (from === 'celsius' && to === 'fahrenheit') {
    return (value * 9) / 5 + 32;
  }
  if (from === 'fahrenheit' && to === 'kelvin') {
    return ((value - 32) * 5) / 9 + 273.15;
  }
  if (from === 'fahrenheit' && to === 'celsius') {
    return ((value - 32) * 5) / 9;
  }
  return value;
};
