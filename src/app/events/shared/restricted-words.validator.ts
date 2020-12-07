import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class RESTRICTEDWORS {
  constructor() {}
  // tslint:disable-next-line: typedef
  restrictedWords(words) {
    return (control: FormControl): { [key: string]: any } => {
      if (!words) {
        return null;
      }

      const invalidsWords = words
        .map((w) => (control.value.includes(w) ? w : null))
        .filter((w) => w != null);
      return invalidsWords && invalidsWords.length > 0
        ? { restrictedWords: invalidsWords.join(',') }
        : null;
    };
  }
}
