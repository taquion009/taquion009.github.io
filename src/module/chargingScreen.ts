const chargingScreen = (): Promise<Boolean> => {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      return resolve(true);
    }, 1200);
  });
};

export default chargingScreen;
