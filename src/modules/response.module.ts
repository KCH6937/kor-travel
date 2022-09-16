const success = (status: number, message: string, data?: any) => {
  return {
    status,
    message,
    data,
  };
};

const fail = (status: number, message: string, errorMessage?: any) => {
  return {
    status,
    message,
    errorMessage,
  };
};

export { success, fail };
