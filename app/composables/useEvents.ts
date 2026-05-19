// ============================================================================
// Imports
// ============================================================================
import { useEventBus } from '@vueuse/core'

// ============================================================================
// Composable
// ============================================================================
/**
 * Global Event Bus Composable
 * Provides a standardized way to emit and listen to application-wide events.
 */
export const useEvents = () => {
  const bus = useEventBus<string>('app-events')
  
  /**
   * Emit an event with an optional payload
   * @param event The name of the event to emit
   * @param payload Optional data to pass with the event
   */
  const emit = (event: string, payload?: any) => bus.emit(event, payload)

  /**
   * Listen to a specific event
   * @param event The name of the event to listen for
   * @param callback Function to execute when the event is emitted
   * @returns A function to unregister the listener
   */
  const on = (event: string, callback: (payload?: any) => void) => {
    return bus.on((e, payload) => {
      if (e === event) callback(payload)
    })
  }

  return { emit, on }
}
