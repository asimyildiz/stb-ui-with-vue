import { expect } from 'chai';
import { cloneDeep } from 'lodash';
import { mount } from 'vue-test-utils';
import VolumeWidget from '@/components/commons/VolumeWidget.vue';

require('../init');

describe('VolumeWidget.vue', () => {
    beforeEach(() => {
    });

    // check component props and/or data, methods, computed properties
    it('should have correct props', () => {
        expect(VolumeWidget.props.numberOfSteps).to.be.an('object');
        expect(typeof VolumeWidget.methods.classObject).to.equal('function');
    });

    it('can calculate volumeSteps correctly', () => {
        const vue = bein.vue;
        const store = bein.store;
        const wrapper = mount(VolumeWidget, { vue, store });
        const volumeStep = wrapper.vm.classObject(20);
        expect(volumeStep.step).to.equal(true);
        expect(volumeStep.highLight).to.equal(true);
    });
});
