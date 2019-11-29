export const queryString = (params: { [key: string]: number | string | boolean | undefined } = {}): string => {
  const entries = Object.entries(params);
  let strings: string[] = [];
  for (const [key, value] of entries) {
    strings = strings.concat(`${key}=${value}`);
  }

  return `?${strings.length ? strings.join('&') : ''}`;
};
