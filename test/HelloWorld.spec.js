import {shallow} from 'vue-test-utils'
import HelloWorld from '@/components/HelloWorld'

describe('TaskListItem.vue', () => {

  it('renders correct contents', () => {
    const wrapper = shallow(HelloWorld, {})
    expect(wrapper.html()).toMatchSnapshot()
  })
})
