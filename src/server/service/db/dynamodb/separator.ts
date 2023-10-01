import { entityNameAttrName } from './config';

export const makePropName = (colPrefix: string, propName: string) => {
  return `${colPrefix}#${propName}`;
};

export const revertPropName = (colPrefix: string, propName: string) => {
  return propName.replace(`${colPrefix}#`, '');
};

export const objectRevertPropName = (colPrefix: string, obj: Record<string, any>) => {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (key === entityNameAttrName) continue;
    newObj[revertPropName(colPrefix, key)] = obj[key];
  }
  return newObj;
};
