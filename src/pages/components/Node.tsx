import React, { useState, useEffect } from 'react';
import styles from './index.less';
/**
 * 判断一个对象是否有子结点
 * @param obj 对象
 *
 */
export const haveChildNode = (obj: any) => {
  let flag = false;
  let val = Object.values(obj);
  let idx = 0;
  while (idx < val.length && !flag) {
    if (typeof val[idx] === 'object') {
      flag = true;
    }
    idx++;
  }
  return flag;
};

export const ObjItem = ({ obj }: { obj: {} }) => (
  <ul className={styles.node}>
    {Object.entries(obj).map(([key, val], idx) => (
      <li key={key}>
        <span>"{key}":</span>
        <span>
          "{val}"{idx == Object.keys(obj).length - 1 ? '' : ','}
        </span>
      </li>
    ))}
  </ul>
);

export const ParentItem = ({ obj, keyName }) => {
  const [flag, setFlag] = useState(false);
  return (
    <li>
      <div className={styles.alignRow}>
        "{keyName}":
        {'{'}
        <div
          className={styles.icon}
          onClick={e => {
            setFlag(!flag);
          }}
        >
          {!flag ? '-' : Object.keys(obj).length}
        </div>
        {flag && ' ...  }'}
      </div>
      {!flag && <ParentNode obj={obj} level={1} />}
    </li>
  );
};

export const ParentNode = ({ obj, level = 0 }: { obj: {}; level?: number }) => {
  const [flag, setFlag] = useState(false);
  // 当前结点是否为最小组件（其值没有子结点）
  if (!haveChildNode(obj)) {
    return <ObjItem obj={obj} />;
  }

  // 否则遍历，将其中值不是对象的部分展示出来
  return (
    <ul className={styles.node}>
      {level === 0 && (
        <li className={styles.alignRow}>
          {'{'}
          <div
            className={styles.icon}
            onClick={e => {
              setFlag(!flag);
            }}
          >
            {!flag ? '-' : Object.keys(obj).length}
          </div>
          {flag && ' ... '}
        </li>
      )}
      {!flag &&
        Object.entries(obj).map(([key, val], idx) => {
          // 值不值对象，直接显示
          if (typeof val !== 'object') {
            return (
              <li key={key}>
                <span>"{key}":</span>
                <span>
                  "{val}"{idx == Object.keys(obj).length - 1 ? '' : ','}
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
