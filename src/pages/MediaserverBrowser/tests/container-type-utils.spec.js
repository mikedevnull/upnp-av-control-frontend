import utils from '../container-type-utils';

describe('imageForItem', () => {
  it('should use albumArtURI with api prefix if available', () => {
    const testItem = { upnpclass: 'object.container.person.musicArtist', albumArtURI: "/foo" }
    let result = utils.imageForItem(testItem);
    expect(result).toBe('/api/foo');
  })
  it('should use artistDiscographyURI with api prefix if available', () => {
    const testItem = { upnpclass: 'object.container.person.musicArtist', artistDiscographyURI: "/bar" }
    let result = utils.imageForItem(testItem);
    expect(result).toBe('/api/bar');
  })

  it('should map musicArtist upnpclass to correct svg', () => {
    const testItem = { upnpclass: 'object.container.person.musicArtist' }
    let result = utils.imageForItem(testItem);
    expect(result).toEqual(utils.personIcon);
  })

  it('should map musicAlbum upnpclass to correct svg', () => {
    const testItem = { upnpclass: 'object.container.album.musicAlbum' }
    let result = utils.imageForItem(testItem);
    expect(result).toEqual(utils.albumIcon);
  })

  it('should map musicTrack upnpclass to correct svg', () => {
    const testItem = { upnpclass: 'object.item.audioItem.musicTrack' }
    let result = utils.imageForItem(testItem);
    expect(result).toEqual(utils.trackIcon);
  })

  it('should map unkown upnpclasses to a fallback svg', () => {
    const testItem = { upnpclass: 'object.item.photoItem' }
    let result = utils.imageForItem(testItem);
    expect(result).toEqual(utils.fallbackIcon);
  })
})

describe('itemBrowseChildrenRoute', () => {
  it('should format a correct route definition', () => {
    let result = utils.itemBrowseChildrenRoute('1234-5678', 'foo')
    expect(result).toEqual({ name: "browse", params: { udn: '1234-5678' }, query: { objectID: 'foo' } })
  })
})

describe('filterByUpnpClass', () => {
  it('should filter items by upnpclass', () => {
    let items = [{ name: 'foo', upnpclass: 'object.container.album.musicAlbum' },
    { name: 'item2', upnpclass: 'object.item.audioItem' },
    { name: 'item42', upnpclass: 'object.container.album.fooBar' },
    { name: 'noname', upnpclass: 'object.container.playlist' }]
    let expectResult = [items[0], items[2]];
    let result = utils.filterByUpnpClass(items, 'object.container.album');
    expect(result).toEqual(expectResult);
  })

  it('should return an empty list for undefined input', () => {
    let result = utils.filterByUpnpClass(undefined, 'foo.bar')
    expect(result.length).toBe(0);
  })
})
