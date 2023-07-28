import {describe, expect, test} from '@jest/globals';
import listSort from '../utils/listsort';


describe('listSort.sortByString', () => {
  test('test ascending sorting of string key on a list object', () => {
    expect(
        listSort.sortByString([{"fruit": "orange"}, {"fruit":"apple"}, {"fruit":"papaya"}], "fruit", true)).toStrictEqual(
            [{"fruit": "apple"}, {"fruit":"orange"}, {"fruit":"papaya"}]
        );
  });
});