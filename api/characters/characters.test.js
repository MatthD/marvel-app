import Vue from 'vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { createMockClient } from 'mock-apollo-client';
import { createPage, setupTest } from '@nuxt/test-utils';
import VueApollo from 'vue-apollo';
import Characters from '../../pages/characters.vue';

// disable vue warning
Vue.config.silent = true;

const localVue = createLocalVue().use(VueApollo);
const mockClient = createMockClient();
const apolloProvider = new VueApollo({
  defaultClient: mockClient,
});

// Intégra
describe('Characters - Integration', () => {
  it('Should render character page with mock GQL data', async () => {
    const wrapper = shallowMount(Characters, {
      localVue,
      apolloProvider,
    });
    wrapper.setData({
      characters: [
        {
          name: 'Thanos',
          description: 'Biggets vilain',
          thumbnail: 'http://random.url/img.png',
        },
        {
          name: 'Dr Strange',
          description: 'One over other',
          thumbnail: 'http://random.url/strange.png',
        },
      ],
    });
    await new Promise((resolve) => setTimeout(resolve, 200)); // wait for data propagation..
    expect(wrapper.element.textContent).toContain('Thanos');
    expect(wrapper.element.textContent).toContain('over other');
    expect(
      wrapper.element.getElementsByClassName('characterPicture')
    ).toHaveLength(2);
  });
});

describe('Characters - E2E', () => {
  setupTest({ browser: true });

  it('Should be able get marvel characters from API', async () => {
    jest.setTimeout(30000);
    // Should be able to go /characters from home
    const page = await createPage('/');
    await page.click('a[href="/characters"]');
    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for data propagation..

    // Should get characters
    const text = await page.textContent('body');
    expect(text).toContain('3-D Man');
    expect(text).toContain('Absorbing Man');
    expect(text).toContain('Adam Destine');

    const nbOfCharacters = (await page.$$('.characterPicture')).length;
    expect(nbOfCharacters).toBe(10);

    // Should load more characters when user go down the page
    await page.keyboard.press('PageDown');
    await page.keyboard.press('PageDown');
    await new Promise((resolve) => setTimeout(resolve, 2100)); // wait for data propagation..
    const nbOfCharactersAfterScroll = (await page.$$('.characterPicture'))
      .length;
    expect(nbOfCharactersAfterScroll).toBe(20);
  });
});
