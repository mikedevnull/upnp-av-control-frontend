import axios from 'axios'

const baseURL = '/api';

var upnpApi = axios.create({
  baseURL
});

export default {
  getMediaRenderers() {
    const url = '/player/devices';
    return upnpApi
      .get(url)
      .then(response => response.data.data)
      .catch(error => console.log(error));
  },
  getLibraryDevices() {
    const url = '/library/devices';
    return upnpApi
      .get(url)
      .then(response => response.data)
      .catch(error => console.log(error));
  },
  setActiveRenderer(udn) {
    const url = '/player/device';
    return upnpApi
      .put(url, {
        udn: udn
      })
      .catch(error => console.log(error));
  },
  setCurrentVolume(volume_percent) {
    const url = '/player/volume';
    return upnpApi
      .put(url, {
        volume_percent: volume_percent
      })
      .catch(error => console.log(error));
  },
  getCurrentPlaybackInfo() {
    const url = '/player';
    return upnpApi
      .get(url)
      .then(response => response.data)
      .catch(error => console.log(error));
  },
  browseServer(udn, objectID) {
    const url = `/library/${udn}/browse`;
    let params = {};
    if (objectID !== undefined) {
      params = { objectID: objectID }
    }

    return upnpApi
      .get(url, { params })
      .then(response => response.data)
  },
  getObjectMetadata(udn, objectID) {
    const url = `/library/${udn}/metadata`;
    let params = {};
    if (objectID !== undefined) {
      params = { objectID: objectID }
    }

    return upnpApi
      .get(url, { params })
      .then(response => response.data)
  }
}
