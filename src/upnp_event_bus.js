function websocket_url(socket_path) {
  let loc = window.location;
  return ((loc.protocol === "https:") ? "wss://" : "ws://") + loc.host + loc.pathname + socket_path;
}

class ControlPointEventBus {
  constructor(store) {
    this.store = store;
    this.socketUrl = websocket_url('ws/events');
    this.socket = null;
    this.state = 'closed'
  }
  run() {
    this.updateStoreData();
    this.socket = new WebSocket('ws://localhost:8000/ws/events');
    this.socket.onmessage = event => { this.handleMessage(event); };
  }

  handleMessage(event) {
    let payload = JSON.parse(event.data);
    if (this.state == 'closed') {
      // handshake
      if (payload.version != '0.0.1') {
        console.log('Version mismatch: ' + payload.version)
        this.socket.close();
        return;
      }
      this.state = 'connected';
      return;
    }
    if (payload.event_type == 'NEW_DEVICE' || payload.event_type == 'DEVICE_LOST') {
      console.log('devices changed, should update state');
      this.updateStoreData();
    }
  }

  updateStoreData() {
    this.store.dispatch('update_available_renderers');
    this.store.dispatch('update_available_servers');
    this.store.dispatch('update_playback_info');
  }
}

export default ControlPointEventBus
