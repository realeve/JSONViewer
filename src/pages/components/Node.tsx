import React, { useState } from 'react';
import styles from './index.less';

export const isNumOrFloat = (str: any) => /^(-|\+|)\d+(\.)\d+$|^(-|\+|)\d+$/.test(String(str));

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
}) => (
  <>
    {keyName && `"${keyName}":`} {'{'}
    <div
      className={styles.icon}
      onClick={e => {
        setFlag(!flag);
      }}
    >
      {!flag ? '-' : Object.keys(obj).length}
    </div>
    {flag && ' ...  }'}
  </>
);

export const ParentItem = ({ obj, keyName }: { obj: {}; keyName: string }) => {
  const [flag, setFlag] = useState(false);
  return (
    <li>
      <div className={styles.alignRow}>
        <CollapseBtn {...{ keyName, obj, flag, setFlag }} />
      </div>
      {!flag && <ParentNode obj={obj} level={1} />}
    </li>
  );
};

export const getVal = (val: any) => {
  if (isNumOrFloat(val) || ['TRUE', 'true', 'FALSE', 'false', true, false].includes(val)) {
    return String(val);
  }
  return `"${val}"`;
};

export const ParentNode = ({ obj, level = 0 }: { obj: {}; level?: number }) => {
  const [flag, setFlag] = useState(false);

  return (
    <ul className={styles.node}>
      {level === 0 && (
        <li className={styles.alignRow}>
          <CollapseBtn {...{ obj, flag, setFlag }} />
        </li>
      )}
      {!flag &&
        Object.entries(obj).map(([key, val], idx) => {
          // 值不值对象，直接显示
          if (typeof val !== 'object') {
            return (
              <li key={key}>
                <span>"{key}": </span>
                <span>
                  {getVal(val)}
                  {idx == Object.keys(obj).length - 1 ? '' : ','}
                </span>
              </li>
            );
          }

          // 如果值为对象，返回组件本身
          return <ParentItem key={key} keyName={key} obj={val} />;
        })}
    </ul>
  );
};
