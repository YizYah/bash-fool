export function updateSessionValues(session: any, value: string) {
  Object.keys(session).forEach((key) => {
    value = value.replace(`$${key}`, session[key]);
  });
  return value;
}
