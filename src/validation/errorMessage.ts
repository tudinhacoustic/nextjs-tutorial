class ErrorMessage {
  static handleErrorMessage(errorMessage: any) {
    const str = errorMessage.toString();
    return str.replace("ValidationError: ", "");
  }
}
export default ErrorMessage;
