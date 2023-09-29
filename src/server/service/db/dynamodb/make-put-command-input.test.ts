import { makePutCommandInput } from './make-put-command-input';
import { globalConfig as g } from './schema';

describe(makePutCommandInput.name, () => {
  it('should return correct input', () => {
    const tableName = 'table';
    const colPrefix = 'colPrefix';
    const data = {
      [g.partitionKey]: 'testPartitionKey',
      stringCol: 'bar',
      numberCol: 123,
    };
    const input = makePutCommandInput({ tableName, colPrefix, data });
    expect(input).toEqual({
      TableName: 'table',
      Item: {
        [g.partitionKey]: { S: data[g.partitionKey] },
        [`${colPrefix}id`]: { S: data[g.partitionKey] },
        [`${colPrefix}stringCol`]: { S: data.stringCol },
        [`${colPrefix}numberCol`]: { N: data.numberCol.toString() },
      },
    });
  });
});
