import React, { useState } from 'react';
import styles from './index.less';
import classnames from 'classname';

export const isNumOrFloat = (str: any) => /^(-|\+|)\d+(\.)\d+$|^(-|\+|)\d+$/.test(String(str));
export const isArr = (str: any) => Array.isArray(str);
export const isInt = (str: any) => /^\d+$/.test(String(str));

const CollapseBtn = ({
  keyName,
  flag,
  setFlag,
  obj,
}: {
  keyName?: string;
  flag: boolean;
  setFlag: (e: boolean) => void;
  obj: {};
}) => {
  const bArr = isArr(obj);

  return (
    <>
      {!isInt(keyName) && keyName && `"${keyName}":`} {bArr ? '[' : '{'}
      <div
        className={styles.icon}
        onClick={e => {
          setFlag(!flag);
        }}
      >
        {!flag ? '-' : Object.keys(obj).length}
      </div>
      {flag && ' ...  ' + (bArr ? ']' : '}')}
    </>
  );
};

export const ParentItem = ({
  obj,
  keyName,
  isLast = false,
}: {
  obj: {};
  keyName: string;
  isLast?: boolean;
}) => {
  const [flag, setFlag] = useState(false);

  return (
    <>
      <li>
        <div className={styles.alignRow}>
          <CollapseBtn {...{ keyName, obj, flag, setFlag }} />
        </div>
        {!flag && <ParentNode obj={obj} level={1} isLast={isLast} />}
      </li>
    </>
  );
};

export const getVal = (val: any) => {
  if (isNumOrFloat(val) || ['TRUE', 'true', 'FALSE', 'false', true, false].includes(val)) {
    return String(val);
  }
  return `"${val}"`;
};

export const ParentNode = ({
  obj,
  level = 0,
  isLast = false,
}: {
  obj: {};
  level?: number;
  isLast?: boolean;
}) => {
  const [flag, setFlag] = useState(false);

  return (
    <ul
      className={classnames(styles.node, {
        [styles.arr]: isArr(obj),
        [styles.lastItem]: isLast,
      })}
    >
      {level === 0 && (
        <li className={styles.alignRow}>
          <CollapseBtn {...{ obj, flag, setFlag }} />
        </li>
      )}

      {!flag &&
        Object.entries(obj).map(([key, val], idx) => {
          const isLast = idx == Object.keys(obj).length - 1;
          // 值不值对象，直接显示
          if (typeof val !== 'object') {
            return (
              <li key={key}>
                <span>"{key}": </span>
                <span>
                  {getVal(val)}
                  {isLast ? '' : ','}
                </span>
              </li>
            );
          }

          // 如果值为对象，返回组件本身
          return <ParentItem key={key} keyName={key} obj={val} isLast={isLast} />;
        })}
    </ul>
  );
};
