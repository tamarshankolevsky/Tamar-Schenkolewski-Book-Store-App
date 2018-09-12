import { ValidatorFn } from '@angular/forms';

/**
* @method 
* @param cntName the control name in the fromGroup
* @param min minimum chars the control must contain
* @param max maximum chars the control can contain
* @param pattern the pattern of the string 
* @return array of validators
*/
export function createValidatorArr(cntName: string, min?: number, max?: number, pattern?: RegExp): Array<ValidatorFn> {
   return [
     f => !f.value ? { "val": `${cntName} is required` } : null,
     f => f.value && max && f.value.length > max ? { "val": `${cntName} is max ${max} chars` } : null,
     f => f.value && min && f.value.length < min ? { "val": `${cntName} is min ${min} chars` } : null,
     f => f.value && pattern && !f.value.match(pattern) ? { "val": `${cntName} is contain only english letter` } : null
   ];
 }