import { makeDeleteCommandInput } from './make-delete-command-input';
import { globalConfig as g } from './schema';

describe(makeDeleteCommandInput.name, () => {
  it('should return a valid input', () => {
    const input = makeDeleteCommandInput({
      tableName: 'users',
      partitionKey: '123',
    });
    expect(input).toEqual({
      TableName: 'users',
      Key: {
        [g.partitionKey]: {
          S: '123',
        },
      },
    });
  });
});
