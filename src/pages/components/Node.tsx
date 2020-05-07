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

export const ObjItem = ({ obj }: { obj: {} }) => {
  // 是否折叠
  const [flag, setFlag] = useState(false);
  if (flag) {
    return <ul onClick={() => setFlag(true)}>{'{...}'}</ul>;
  }

  return (
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
};

export const ParentNode = ({ obj }: { obj: {} }) => {
  // 当前结点是否为最小组件（其值没有子结点）
  if (!haveChildNode(obj)) {
    return <ObjItem obj={obj} />;
  }

  // 否则遍历，将其中值不是对象的部分展示出来
  return (
    <ul className={styles.node}>
      {Object.entries(obj).map(([key, val], idx) => {
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
        return (
          <li key={key}>
            <span>"{key}":</span> <ParentNode obj={val} />
          </li>
        );
      })}
    </ul>
  );
};
