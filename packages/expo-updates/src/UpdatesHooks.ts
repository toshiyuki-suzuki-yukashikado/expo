import { useEffect } from 'react';

import * as Updates from './Updates';
import { UpdateEvent } from './Updates.types';

/**
 * React hook to create an [`UpdateEvent`](#updateevent) listener subscription on mount, using
 * [`addListener`](#updatesaddlistenerlistener). It calls `remove()` on the subscription during unmount.
 *
 * @param listener A function that will be invoked with an [`UpdateEvent`](#updateevent) instance
 * and should not return any value.
 *
 * @example
 * ```ts
 * function App() {
 *   const eventListener = (event) => {
 *     if (event.type === Updates.UpdateEventType.ERROR) {
 *       // Handle error
 *     } else if (event.type === Updates.UpdateEventType.NO_UPDATE_AVAILABLE) {
 *       // Handle no update available
 *     } else if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
 *       // Handle update available
 *     }
 *   };
 *   Updates.useUpdateEvents(eventListener);
 *   // React Component...
 * }
 * ```
 */
export const useUpdateEvents = (listener: (event: UpdateEvent) => void) => {
  useEffect(() => {
    const subscription = Updates.addListener(listener);
    return () => {
      subscription.remove();
    };
  }, []);
};
