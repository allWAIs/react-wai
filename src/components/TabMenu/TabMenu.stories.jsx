/* eslint-disable jsx-a11y/anchor-is-valid */
import { TabMenu } from './TabMenu';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { TabList } from './TabList';
import { TabGroup } from './TabGroup';
import { Title } from '../Title/Title';

export default {
  title: 'TabMenu',
  component: TabMenu,
  subComponents: { Title, Tab, TabList, TabPanel, TabGroup },
  parameters: {
    docs: {
      description: {
        component: `
        키보드 네비게이션을 제공하는 탭 메뉴 컴포넌트
        - direction prop을 통해 네비게이션 방향을 결정한다.(row일 경우 ←→, col일 경우 ↑↓로 이동)
        - Tab키를 통해 계층 간 이동 / 방향키를 통해 계층 내 이동을 지원하며, 특수키를 통한 이동 또한 가능하다.
        - 키 설명
          - Tab: 다음 계층으로 포커스 이동. 현재 포커스된 요소가 컴포넌트의 마지막 계층일 경우 컴포넌트 바깥으로 탈출
          - Shift+Tab: 이전 계층으로 포커스 이동. 현재 포커스된 요소가 컴포넌트의 처음 계층일 경우 컴포넌트 바깥으로 탈출
          - ↑/←: 계층 내 이전 요소로 포커스 이동. 현재 포커스된 요소가 계층 내 처음 요소일 경우 이동하지 않음.
          - ↓/→: 계층 내 다음 요소로 포커스 이동. 현재 포커스된 요소가 계층 내 마지막 요소일 경우 이동하지 않음.
          - Home(macOS의 경우 ⌘+↑/←): 계층 내 첫번째 요소로 포커스 이동
          - End(macOS의 경우 ⌘+↓/→): 계층 내 마지막 요소로 포커스 이동
          - Ctrl+Home: 컴포넌트 내 첫번째 요소로 포커스 이동
          - Ctrl+End: 컴포넌트 내 마지막 요소로 포커스 이동
        - 구성 요소
          - Title(필수)
            - 접근성을 지키기 위한 헤딩 요소
          - Tab
            - 탭 버튼 컴포넌트
            - TabList 또는 TabGroup 내부에서만 사용 가능
          - TabPanel
            - Tab 컴포넌트와 연결된 콘텐츠를 담은 컴포넌트
            - as prop에 'ul'/'ol'을 전달하여 리스트로 사용할 경우 direction을 덮어씌워 사용할 수 있음
          - TabList
            - Tab을 묶어주는 컴포넌트
            - Tab과 TabPanel을 분리하여 마크업할 때 사용
          - TabGroup
            - Tab과 TabPanel을 묶어주는 컴포넌트
            - Tab과 TabPanel을 같은 컨테이너로 묶어서 마크업할 때 사욜
        `,
      },
    },
  },
};

/* -------------------------------------------------------------------------- */

// export const Empty = (args) => <TabMenu {...args} />;

export const HorizontalTabListWithoutTabPanel = (args) => (
  <TabMenu {...args}>
    <Title>탭만 있는 탭 메뉴 - 가로</Title>
    <TabList>
      <Tab>Taab1</Tab>
      <Tab>Taab2</Tab>
      <Tab>Taab3</Tab>
    </TabList>
  </TabMenu>
);
export const VerticalTabListWithoutTabPanel = (args) => (
  <TabMenu direction="col" {...args}>
    <Title>탭만 있는 탭 메뉴 - 세로</Title>
    <TabList>
      <Tab>Tab1</Tab>
      <Tab>Tab2</Tab>
      <Tab>Tab3</Tab>
    </TabList>
  </TabMenu>
);

export const TextPanelWithTabGroup = (args) => (
  <TabMenu {...args}>
    <Title
      stype={{
        width: '100%',
      }}
    >
      탭 패널과 탭이 묶여있는 탭 메뉴
    </Title>
    <div
      style={{
        display: 'flex',
      }}
    >
      <TabGroup>
        <Tab>Tab1</Tab>
        <TabPanel>리스트가 아닌 탭 패널1</TabPanel>
      </TabGroup>
      <TabGroup>
        <Tab>Tab2</Tab>
        <TabPanel>리스트가 아닌 탭 패널2</TabPanel>
      </TabGroup>
    </div>
  </TabMenu>
);
export const TextPanelWithTabList = (args) => (
  <TabMenu {...args}>
    <Title>탭 패널과 탭이 떨어져 있는 탭 메뉴</Title>
    <TabList>
      <Tab>Taab1</Tab>
      <Tab>Taab2</Tab>
    </TabList>
    <div
      style={{
        display: 'flex',
        gap: '30px',
      }}
    >
      <TabPanel>텍스트 패널1</TabPanel>
      <TabPanel>텍스트 패널2</TabPanel>
    </div>
  </TabMenu>
);

export const ListPanelWithTabList = (args) => (
  <TabMenu {...args}>
    <Title>탭 패널과 탭이 떨어져 있는 탭 메뉴 - 리스트 탭 패널</Title>
    <TabList>
      <Tab>Taab1</Tab>
      <Tab>Taab2</Tab>
    </TabList>
    <div
      style={{
        display: 'flex',
      }}
    >
      <TabPanel direction="col" as="ul">
        <li>
          <a href="#">리스트 탭 아이템1</a>
        </li>
        <li>
          <a href="#">리스트 탭 아이템2</a>
        </li>
        <li>
          <a href="#">리스트 탭 아이템3</a>
        </li>
      </TabPanel>
      <TabPanel direction="col" as="ol">
        <li>
          <a href="#">리스트 탭 아이템1</a>
        </li>
        <li>
          <a href="#">리스트 탭 아이템2</a>
        </li>
        <li>
          <a href="#">리스트 탭 아이템3</a>
        </li>
      </TabPanel>
    </div>
  </TabMenu>
);
export const ListPanelWithTabGroup = (args) => (
  <TabMenu {...args}>
    <Title>탭 패널과 탭이 묶여있는 탭 메뉴 - 리스트 탭 패널</Title>
    <div
      style={{
        display: 'flex',
      }}
    >
      <TabGroup>
        <Tab>Tab1</Tab>
        <TabPanel direction="col" as="ol">
          <li>
            <a href="#">리스트 탭 아이템1</a>
          </li>
          <li>
            <a href="#">리스트 탭 아이템2</a>
          </li>
          <li>
            <a href="#">리스트 탭 아이템3</a>
          </li>
        </TabPanel>
      </TabGroup>
      <TabGroup>
        <Tab>Tab2</Tab>
        <TabPanel direction="col" as="ol">
          <li>
            <a href="#">리스트 탭 아이템1</a>
          </li>
          <li>
            <a href="#">리스트 탭 아이템2</a>
          </li>
          <li>
            <a href="#">리스트 탭 아이템3</a>
          </li>
        </TabPanel>
      </TabGroup>
    </div>
  </TabMenu>
);
