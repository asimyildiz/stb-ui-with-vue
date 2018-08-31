import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import VolumeWidget from '@/components/VolumeWidget.vue';

describe('VolumeWidget.vue', () => {
    it('renders props.msg when passed', () => {
        const wrapper = shallowMount(VolumeWidget, {
            propsData: { numberOfSteps: 16, currentVolume: 20 }
        });
    // TODO check wrapper number of divs
    });
});
