import folderIcon from "@/assets/folder-24px.svg";
import albumIcon from "@/assets/album-24px.svg";
import personIcon from "@/assets/person-24px.svg";
import trackIcon from "@/assets/music_note-black-24dp.svg";

function iconForUpnpClass(upnpclass) {
  if (
    upnpclass.startsWith("object.container.person.musicArtist")
  ) {
    return personIcon;
  } else if (
    upnpclass.startsWith("object.container.album.musicAlbum")
  ) {
    return albumIcon;
  } else if (
    upnpclass.startsWith("object.item.audioItem.musicTrack")
  ) {
    return trackIcon;
  } else {
    return folderIcon;
  }
}

function filterByUpnpClass(items, upnpclass) {
  if (items) {
    return items.filter(x => x.upnpclass.startsWith(upnpclass));
  }
  return [];
}

function imageForItem(item) {
  if (item) {
    if (item.albumArtURI) {
      return '/api' + item.albumArtURI;
    }
    else if (item.aristDiscographyURI) {
      return '/api' + item.aristDiscographyURI;
    }
    else {
      return iconForUpnpClass(item.upnpclass);
    }
  }
}

function itemBrowseChildrenRoute(udn, objectID) {
  return {
    name: "browse",
    params: { udn },
    query: { objectID }
  };
}

export default {
  iconForUpnpClass,
  filterByUpnpClass,
  imageForItem,
  itemBrowseChildrenRoute,
  folderIcon,
  albumIcon,
  personIcon,
}

