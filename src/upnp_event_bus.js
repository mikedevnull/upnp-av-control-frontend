/*
 * This is currently a silly, inefficient implementation
 * that polls the backend regularly and updates the internal
 * state.
 *
 * Will/should/must be replaced with something more efficient 
 * based on events send via websockets.
 */
class ControlPointEventBus {
  constructor(store) {
    this.store = store
    this.timerId = null
  }
  run() {
    this.updateStoreData()
    this.timerId = setInterval(() => this.updateStoreData(), 2000)
  }

  updateStoreData() {
    this.store.dispatch('update_available_renderers')
    this.store.dispatch('update_playback_info')
  }
}

export default ControlPointEventBus
