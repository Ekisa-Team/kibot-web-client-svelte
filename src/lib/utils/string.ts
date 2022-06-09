const replaceAt = (source: string, start: number, end: number, value: string) => {
  return source.substring(0, start) + value + source.substring(end);
};

export { replaceAt };
