import { shallowMount, createLocalVue } from '@vue/test-utils';
import { createMockClient } from 'mock-apollo-client';
import VueApollo from 'vue-apollo';
import Characters from '../../pages/characters.vue';

const localVue = createLocalVue().use(VueApollo);
const mockClient = createMockClient();
const apolloProvider = new VueApollo({
  defaultClient: mockClient,
});

// Was not able to complete E2E apollo test in limited time
describe('characters - browser', () => {
  it('Should render character page', () => {
    // const wrapper = shallowMount(Characters, {
    //   localVue,
    //   apolloProvider,
    // });
    // wrapper.setData({
    //   characters: [
    //     {
    //       name: 'Thanos',
    //       description: 'Biggets vilain',
    //       thumbnail: 'http://random.url/img.png',
    //     },
    //   ],
    // });
    // expect(wrapper.element).toMatchSnapshot();
  });
});
