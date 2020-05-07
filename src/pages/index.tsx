import React, { useState } from 'react';
import styles from './index.less';
import { Input } from 'antd';

const { TextArea } = Input;

export default function () {
  const [val, setVal] = useState(`
  {
    "name": "john",
    "age": 20,
    "address1": {
      "address": { "country": "china", "city": "beijing", "street": "road2" },
      "address2": {
        "address": { "country": "china", "city": "beijing", "street": "road3" }
      }
    }
  }
  `);
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <TextArea
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
          }}
          rows={30}
        />
      </div>
      <div className={styles.right}>val</div>
    </div>
  );
}
