import { useApplication } from './useApplication';
import { useEffect, useReducer } from 'react';

const reducer = function (state, action) {
  switch (action.type) {
    case 'update':
      return {
        item: action.items[0]
      };
    case 'error':
      return {
        ...state,
        error: action.error
      };
    default:
      throw new Error();
  }
};

const useListItem = function (name, id, { observe = false } = {}) {
  if (!name) {
    throw new Error('Name is misssing.');
  }
  if (!id) {
    throw new Error('Id is misssing.');
  }

  const application = useApplication();

  if (!application) {
    throw new Error('Application is misssing.');
  }

  const [ state, dispatch ] = useReducer(
    reducer,
    {
      item: undefined,
      error: undefined
    }
  );

  useEffect(() => {
    const list = application.lists[name];

    if (observe) {
      let stopReading;

      list.
        readAndObserve({ where: { id }, take: 1 }).
        started((newItems, cancel) => {
          stopReading = cancel;
        }).
        updated(newItems => dispatch({ type: 'update', items: newItems })).
        failed(error => dispatch({ type: 'error', error }));

      return () => {
        if (stopReading) {
          stopReading();
        }
      };
    }

    list.
      read({ where: { id }}).
      finished(newItems => dispatch({ type: 'update', items: newItems })).
      failed(error => dispatch({ type: 'error', error }));
  }, [ name, id ]);

  return [ state.item, state.error ];
};

export { useListItem };
