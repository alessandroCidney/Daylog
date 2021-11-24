interface UtilsInterface {
  clearString: (str: string) => string;
};

class Utils implements UtilsInterface {
  clearString (str: string): string {
    return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^ a-zA-Z0-9]/g, '')
            .toLowerCase()
            .split(" ")
            .join("-");
  };
};

export default Utils;