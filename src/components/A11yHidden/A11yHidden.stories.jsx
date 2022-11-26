import { A11yHidden } from './A11yHidden';

export default {
  title: 'A11yHidden',
  component: A11yHidden,
  argTypes: {
    focusable: false,
  },
};

const Template = (args) => <A11yHidden {...args} />;

export const Default = Template.bind({});

export const Focusable = Template.bind({});
Focusable.args = {
  as: 'div',
  focusable: true,
};
