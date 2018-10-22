import { List } from './List';
import React from 'react';

const ListItem = ({ observe = false, list, id, children } = {}) => {
  if (!list) {
    throw new Error('List is missing.');
  }
  if (!id) {
    throw new Error('Id is missing.');
  }

  return (
    <List name={ list } where={{ id }} observe={ observe }>
      { items => {
        if (items.length === 1) {
          if (typeof children === 'function') {
            return children(items[0]);
          }

          return React.Children.map(children, Child => (
            <Child item={ items[0] } />
          ));
        }

        return null;
      }}
    </List>
  );
};

export { ListItem };
