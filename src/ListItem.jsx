import { List } from './List';
import React from 'react';

const ListItem = ({ observe = false, list, id, children } = {}) => (
  <List name={ list } where={{ id }} observe={ observe }>
    { items => {
      if (items.length === 1) {
        return children(items[0]);
      }

      return null;
    }}
  </List>
);

export { ListItem };
