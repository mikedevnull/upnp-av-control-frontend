import { mount, RouterLinkStub } from '@vue/test-utils'
import TheAppBar from '@/components/TheAppBar.vue'


describe('TheAppBar.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(TheAppBar, { stubs: { RouterLink: RouterLinkStub } });
    expect(wrapper.element).toMatchSnapshot();
    wrapper.destroy();
  })
})
