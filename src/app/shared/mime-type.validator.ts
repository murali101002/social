import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";

/*
since file reading is async, we return an async (Promise | Observable) value
since we aren't aware of return type object, we pass
{[key: string]: any} which represents a dynamic object type whose value can be of any type
*/
export const mimeType = (
  control: AbstractControl
): Promise<{}> | Observable<{}> => {
  if (typeof(control.value) === 'string') {
    return of(null);
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  /*
    this function should return an observable, so we create it.
    It takes observer as an argument which will have same return type of this function
  */
  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
      fileReader.addEventListener("loadend", () => {
        /*
      Uint8Array will convert File to 8-bit encoded format
      This check will read the file info to get the mime type rather just identifying the extension
      0 - 4 sub-arrays will have info about extension type
       */
        const arr = new Uint8Array(fileReader.result).subarray(0, 4);
        let header = "";
        let isFileValid = false;
        for (let i = 0; i < arr.length; i++) {
          // convert each item in sub-array to hexadecimal value
          header += arr[i].toString(16);
        }
        // various hex codes that represent png/jpeg
        switch (header) {
          case "89504e47":
            isFileValid = true;
            break;
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
            isFileValid = true;
            break;
          default:
            isFileValid = false;
            break;
        }
        if (isFileValid) {
          /*
          empty object determines File valid, else invalid
           */
          observer.next({});
        } else {
          observer.next({invalidMimeType: true});
        }
        observer.complete();
      });
      /*
    readAsArrayBuffer gives mime information of the File
    this statement will trigger 'loadend' event listener, once the file loading is complted
    */
      fileReader.readAsArrayBuffer(file);
    }
  );
  return frObs;
};
