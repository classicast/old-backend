export function handleError(res, statusCode, err) {
  const code = statusCode || 500;
  return res.status(code).send(err);
}
