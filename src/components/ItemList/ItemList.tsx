import React, { FC, useEffect, useState } from 'react';
import styles from './ItemList.module.css';
import Item, { ItemProps } from '../Item/Item';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';

interface ItemListProps {}

const ItemList: FC<ItemListProps> = () => {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [filter, setFilter] = useState<number>(0);

  const addItem = () => {
    let newItem: ItemProps = {
      id: uuid(),
      text: '',
      compleated: false,
      onComplete: completeItem,
      onDelete: deleteItem,
    };

    setItems((items) => [...items, newItem]);
    localStorage.setItem('items', JSON.stringify([...items, newItem]));
  };

  const deleteItem = (id: any) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((i) => i.id !== id);
      localStorage.setItem('items', JSON.stringify(newItems));
      return newItems;
    });
  };

  const completeItem = (id: string) => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, compleated: !item.compleated };
        }
        return item;
      });
      localStorage.setItem('items', JSON.stringify(newItems));
      return newItems;
    });
  };

  const getItems = () => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else {
      setItems([]);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const filteredItems = items.filter((item) => {
    if (filter === 0) return true;
    if (filter === 1) return item.compleated;
    if (filter === 2) return !item.compleated;
  });

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <button
          className={classNames(styles.filter_option, {
            [styles.active]: filter === 0,
          })}
          onClick={() => setFilter(0)}
        >
          All
        </button>
        <button
          className={classNames(styles.filter_option, {
            [styles.active]: filter === 1,
          })}
          onClick={() => setFilter(1)}
        >
          Done
        </button>
        <button
          className={classNames(styles.filter_option, {
            [styles.active]: filter === 2,
          })}
          onClick={() => setFilter(2)}
        >
          ToDo
        </button>
      </div>
      <div className={styles.scroll_container}>
        <ul className={styles.list}>
          {filteredItems.map((item) => {
            return (
              <Item
                key={item.id}
                id={item.id}
                text={item.text}
                compleated={item.compleated}
                onComplete={completeItem}
                onDelete={deleteItem}
              />
            );
          })}
        </ul>
      </div>
      <button onClick={addItem} className={styles.button}>
        <img className={styles.image} src="add-icon.png" />
      </button>
    </div>
  );
};

export default ItemList;
