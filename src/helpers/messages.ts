export function errorMessages(message: any) {
  if (typeof message == "string") {
    return { errors: [message] };
  }
  const errors = Object.entries(message);
  const arrayErrors = new Array();
  errors.map((error) => {
    arrayErrors.push(error[1]);
  });
  return { errors: arrayErrors };
}
