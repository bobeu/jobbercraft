import { assert, expect } from "chai";

// Compare arrays of strings in order that they're provided 
export const assertEqualString = (actual: Array<string>, expected: Array<string>) => {
  assert.strictEqual(actual.length, expected.length);
  for (let i = 0; i < actual.length; i++) {
    expect(actual[i]).to.equal(expected[i], `Actual: ${actual[i]}\n not equal ${expected[i]}`);
  }
  return true;
};

// Compare arrays of boolean in order that they're provided 
export const assertIsBool = (actual: Array<boolean>, expected: Array<boolean>) => {
  assert.strictEqual(actual.length, expected.length);
  for (let i = 0; i < actual.length; i++) {
    expect(actual[i]).to.equal(expected[i], `Actual: ${actual[i]}\n not equal ${expected[i]}`);
  }
  return true;
};

// Compare arrays of numbers in order that they're provided 
export const assertNumberEquality = (actual: Array<number>, expected: Array<number>) => {
  assert.strictEqual(actual.length, expected.length);
  for (let i = 0; i < actual.length; i++) {
    expect(actual[i]).to.equal(expected[i], `Actual: ${actual[i]}\n not equal ${expected[i]}`);
  }
  return true;
};

export const assertGThan = (valToCheck: number, valToBeABove: number) => {
  expect(valToCheck).to.greaterThan(valToBeABove, `Actual: ${valToCheck}\n not greater than ${valToBeABove}`);
};

