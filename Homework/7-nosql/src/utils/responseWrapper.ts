export function responseWrapper(data: any = null, status = 200, message = 'OK') {
  return {
    statusCode: status,
    message,
    data,
  };
}
