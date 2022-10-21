export const getCode = (): number =>
  Number((Math.floor(Math.random() * 10000) + 10000).toString().substring(1));
