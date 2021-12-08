export interface IUtils {
  clearString: (str: string) => string;
  renameFile: (file: File, newName: string) => File;
};

class Utils implements IUtils {
  clearString (str: string): string {
    return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^ a-zA-Z0-9]/g, '')
            .toLowerCase()
            .split(" ")
            .join("-");
  };

  renameFile (file: File, newName: string): File {
    const fileName = file.name.replace(/(.+)(\.[^\.]+)$/g, `${newName}$2`);
    return new File([file], fileName, { type: file.type });
  }; 
};

export default Utils;