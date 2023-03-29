/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Grid, GridProps } from './Grid';

export default {
  title: 'Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component: `
        키보드 네비게이션을 지원하는 그리드 컴포넌트입니다.
        - direction prop을 통해 그리드 아이템의 정렬 방법을 결정하며
        - 키보드 네비게이션은 시각적 방향과 일치하도록 모든 방향으로 제공됩니다.
        - Tab키를 통해 계층 간 이동 / 방향키를 통해 계층 내 이동을 지원합니다.
        `,
      },
    },
  },
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args: GridProps) => <Grid {...args} />;

export const Default = Template.bind({});
Default.args = {
  container: true,
  spacing: 16,
  style: { width: '400px', backgroundColor: 'pink' },
  children: [1, 2, 3].map((key) => (
    <Grid key={key} item xs={2} sm={6} style={{ height: '200px', backgroundColor: '#373829' }}>
      <div style={{ width: '100%', height: '100%', backgroundColor: '#823843' }}>li {key}</div>
    </Grid>
  )),
};

export const NestedGrid = Template.bind({});
NestedGrid.args = {
  container: true,
  spacing: 16,
  style: { width: '800px', backgroundColor: 'pink' },
  children: [1, 2, 3].map((key) => (
    <Grid
      key={key}
      container
      item
      spacing={10}
      xs={4}
      sm={6}
      style={{ position: 'relative', backgroundColor: '#373829' }}
    >
      <span style={{ position: 'absolute', top: 0, color: '#fff' }}>outer-Grid {key}</span>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((key) => (
        <Grid key={key} item xs={4} sm={12} style={{ height: '200px', backgroundColor: '#c23843' }}>
          <div style={{ width: '100%', height: '100%', backgroundColor: '#68901a' }}>inner-Grid {key}</div>
        </Grid>
      ))}
    </Grid>
  )),
};
