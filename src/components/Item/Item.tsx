import React, { FC, useState } from 'react';
import styles from './Item.module.css';
import classNames from 'classnames';

export interface ItemProps {
  id: string;
  text: string;
  compleated: boolean;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const Item: FC<ItemProps> = ({
  id,
  text,
  compleated,
  onComplete,
  onDelete,
}) => {
  const [myText, setMyText] = useState<string>(text);

  return (
    <li
      key={id}
      className={classNames(styles.item, { [styles.compleated]: compleated })}
    >
      <input
        value={myText}
        onChange={(e) => setMyText(e.target.value)}
        className={styles.input}
        placeholder="Write your text here..."
      />
      <input
        className={classNames(styles.button, styles.checkbox)}
        type="checkbox"
        checked={compleated}
        onChange={() => onComplete(id)}
      />
      <button className={styles.button} onClick={() => onDelete(id)}>
        <img src="delete-icon.png" className={styles.image} />
      </button>
    </li>
  );
};

export default Item;
