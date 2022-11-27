import { Title } from './Title';

export default {
  title: 'Title',
  component: Title,
  args: {
    lv: '2',
    hidden: false,
    focusable: false,
  },
};

const Template = (args) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default Heading',
};

export const WithFocus = Template.bind({});
WithFocus.args = {
  focusable: true,
  children: 'Focusable Heading',
};

export const WithStyle = Template.bind({});
WithStyle.args = {
  style: {
    color: 'red',
    'background-color': 'yellow',
  },
  children: 'Custom styled Heading',
};
