export declare class RamenQueryResolver {
  constructor();
  resolveQueryRelations({
    builder,
    relationName,
    value,
  }: {
    builder: any;
    relationName: any;
    value: any;
  }): Promise<object>;
  
  resolveOperator({
    builder,
    columnName,
    comparevalues,
  }: {
    builder: any;
    columnName: any;
    comparevalues: any;
  }): Promise<object>;
}
