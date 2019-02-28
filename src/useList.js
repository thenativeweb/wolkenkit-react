import { useApplication } from './useApplication';
import { useEffect, useReducer } from 'react';

const reducer = function (state, action) {
  switch (action.type) {
    case 'update':
      return {
        items: action.items
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

const useList = function (name, { where, observe = false, orderBy, skip, take } = {}) {
  const application = useApplication();
  const [ state, dispatch ] = useReducer(
    reducer,
    {
      items: [],
      error: undefined
    }
  );

  if (!application) {
    throw new Error('Wolkenkit application not available.');
  }

  useEffect(() => {
    const list = application.lists[name];
    let stopReading;

    if (observe) {
      list.
        readAndObserve({ where, orderBy, skip, take }).
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
      read({ where, orderBy, skip, take }).
      finished(newItems => dispatch({ type: 'update', items: newItems })).
      failed(error => dispatch({ type: 'error', error }));
  }, [ name, where, orderBy, skip, take ]);

  return [ state.items, state.error ];
};

export { useList };