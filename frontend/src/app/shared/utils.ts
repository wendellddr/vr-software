//Deleta todas as chaves que forem Null e ''.
export function clearHttpParams(params: any) {
  Object.keys(params).forEach((key) => {
    if (
      params[key] === null ||
      params[key] === '' ||
      params[key] === undefined
    ) {
      delete params[key];
    }
  });

  return params;
}
