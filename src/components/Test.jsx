import { Tab, TabGroup, TabList, TabMenu, TabPanel } from './TabMenu';
import { Title } from './Title/Title';

export function Test() {
  return (
    <>
      <TabMenu>
        <Title>탭만 있는 탭 메뉴</Title>
        <TabList>
          <Tab>Taab1</Tab>
          <Tab>Taab2</Tab>
          <Tab>Taab3</Tab>
        </TabList>
      </TabMenu>
      <TabMenu>
        <Title>탭 패널과 탭이 묶여있는 탭 메뉴</Title>
        <TabGroup>
          <Tab>Tab1</Tab>
          <TabPanel>리스트가 아닌 탭 패널1</TabPanel>
        </TabGroup>
        <TabGroup>
          <Tab>Tab2</Tab>
          <TabPanel>리스트가 아닌 탭 패널2</TabPanel>
        </TabGroup>
      </TabMenu>
      <TabMenu direction="col">
        <Title>탭 패널과 탭이 떨어져 있는 탭 메뉴</Title>
        <TabList>
          <Tab>Taab1</Tab>
          <Tab>Taab2</Tab>
        </TabList>
        <TabPanel as="ul">
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
        <TabPanel as="ol">
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
      </TabMenu>
    </>
  );
}
