import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Input } from 'antd';
import { ParentNode } from './components/Node';
import classname from 'classname';
const { TextArea } = Input;

const getObj = (str: string) => {
  let obj: {} | string = {};
  try {
    obj = JSON.parse(str);
  } catch (e) {
    // 报错逻辑
    obj = e.message;
  }
  return obj;
};

const ErrComponent = ({ err, val }) => {
  let errIdx = Number(err.split('at position')[1]);
  return (
    <div>
      {val.split('').map((item, i) => (
        <span
          key={i}
          className={classname({
            [styles.err]: i == errIdx,
          })}
        >
          {item}
        </span>
      ))}
      <br />
      <div style={{ textAlign: 'left', color: '#e23' }}>{err}</div>
    </div>
  );
};

export default function() {
  const [val, setVal] = useState(`
  {
    "name": "john",
    "age": "20",
    "address": {
      "address1": { "country": "china", "city": "beijing", "street": "road1" },
      "address2": { "country": "china", "city": "beijing", "street": "road2" , "username": "张三" }
    },
    "booleanVal":true,
    "float":"2.332",
    "arr":[{ "country": "china", "city": "beijing", "street": "road1" },null,
      { "country": "china", "city": "beijing", "street": "road1" },null
    ]
  }
  `);

  const [data, setData] = useState({});
  const [error, setError] = useState<boolean | string>(false);

  useEffect(() => {
    let obj = getObj(val);

    if (typeof obj === 'string') {
      setError(obj);
      setData({});
      return;
    }
    setError(false);
    setData(obj);
  }, [val]);

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <TextArea
          value={val}
          onChange={e => {
            setVal(e.target.value);
          }}
          rows={30}
        />
      </div>
      <div className={styles.right}>
        {error ? <ErrComponent err={error} val={val} /> : <ParentNode obj={data} />}
      </div>
    </div>
  );
}
