export default class ArrayUtils {
  
  /**
   * Remove array duplicates
   * @param {Array} array 
   * @returns {Array}
   */
  static removeDuplicates(array) {
    array.sort();
    for (let i = array.length -1; i > 0; i--) {
      if(array[i].toLowerCase() === array[i - 1].toLowerCase()) {
        array.splice(i, 1);
      }
    }

    return array;
  }

}
