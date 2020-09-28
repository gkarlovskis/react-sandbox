export enum PersonTitle {
  DR = "DR",
  MISS = "MISS",
  MR = "MR",
  MRS = "MRS",
  MS = "MS"
}

export class PersonTitleEnumUtils {
  public static getValues(): string[] {
    const result: string[] = [];
    for (const key of enumKeys(PersonTitle)) {
      result.push(PersonTitle[key]);
    }
    return result;
  }

  public static getKeys(): string[] {
    const result: string[] = [];
    for (const key of enumKeys(PersonTitle)) {
      result.push(key);
    }
    return result;
  }

}

export function enumKeys<E>(e: E): (keyof E)[] {
  return Object.keys(e) as (keyof E)[];
}


