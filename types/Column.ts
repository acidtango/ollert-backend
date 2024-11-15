
interface Column {
  /**
   * Title of the column
   * @example TODO
   */
  title: string;
  /**
   * Color of the column
   * @example #fabada
   */
  color: string;
  additionalProperties?: Map<string, any>;
}
export { Column };