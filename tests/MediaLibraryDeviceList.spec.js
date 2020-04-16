import { shallowMount, createLocalVue } from '@vue/test-utils'
import MediaLibraryDeviceList from '@/components/MediaLibraryDeviceList.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('MediaLibraryDeviceList.vue', () => {
  let state;
  let store;

  beforeEach(() => {
    state = {
      available_servers: [{ friendly_name: 'FooServer', udn: '1234-5678' }, { friendly_name: 'BarServer', udn: 'abcd' }],
    }
    store = new Vuex.Store({ state });
  })


  it('renders li for each item in props.items', () => {
    const wrapper = shallowMount(MediaLibraryDeviceList, { store, localVue, stubs: ['router-link', 'router-view'] });
    expect(wrapper.findAll('li')).toHaveLength(2);
  })
})
