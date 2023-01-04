import styled from '@emotion/styled';
import React, {
  createContext,
  KeyboardEventHandler,
  useContext,
  useMemo,
  useState,
} from 'react';

type Component<T extends React.ElementType> = {
  className?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithRef<T>;

interface TabsContextValue {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

type TabsProps<T extends React.ElementType> = Component<T>;
type TabListProps<T extends React.ElementType> = Component<T>;
type TabListItemProps<T extends React.ElementType> = Component<T>;
type TabPanelProps<T extends React.ElementType> = {
  dataIndex?: TabsContextValue['selected'];
} & Component<T>;
type TabTitleProps<T extends React.ElementType> = Component<T>;

const StyledTabList = styled.div`
  min-width: 550px;
`;

const StyledTabListItem = styled.button`
  position: relative;
  z-index: 2;
  top: 2px;
  margin: 0;
  margin-top: 4px;
  padding: 3px 3px 4px;
  border: 1px solid hsl(219deg 1% 72%);
  border-bottom: 2px solid hsl(219deg 1% 72%);
  border-radius: 5px 5px 0 0;
  overflow: visible;
  background: hsl(220deg 20% 94%);
  outline: none;
  font-weight: bold;

  padding: ${(props) => (props['aria-selected'] ? '2px 2px 4px' : '')};
  color: ${(props) => (props['aria-selected'] ? 'red' : '')};
  border-width: ${(props) => (props['aria-selected'] ? '2px' : '')};
  border-top-width: ${(props) => (props['aria-selected'] ? '6px' : '')};
  border-top-color: ${(props) =>
    props['aria-selected'] ? 'rgb(36 116 214)' : ''};
  border-bottom-color: ${(props) =>
    props['aria-selected'] ? 'hsl(220deg 43% 99%)' : ''};
  background: ${(props) =>
    props['aria-selected'] ? 'hsl(220deg 43% 99%)' : ''};

  & span.focus {
    display: inline-block;
    margin: 2px;
    padding: 4px 6px;
  }

  & span.focus:hover,
  & span.focus:focus,
  & span.focus:active {
    padding: 2px 4px;
    border: 2px solid rgb(36 116 214);
    border-radius: 3px;
  }
`;

const StyledTabPanel = styled.div<TabPanelProps<'div'>>`
  padding: 5px;
  border: 2px solid hsl(219deg 1% 72%);
  border-radius: 0 5px 5px;
  background: hsl(220deg 43% 99%);
  min-height: 10em;
  min-width: 550px;
  overflow: auto;
  display: ${(props) =>
    props.dataIndex === +(props.id?.slice(-1) as unknown as number)
      ? 'block'
      : 'none'};
`;

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const ctx = useContext(TabsContext);

  if (!ctx) {
    throw new Error('Tabs 컴포넌트 안에서만 사용해야합니다.');
  }

  return ctx;
};

const tabData = [
  { id: 0, title: 'tab1', content: 'tab1 Content' },
  { id: 1, title: 'tab2', content: 'tab2 Content' },
  { id: 2, title: 'tab3', content: 'tab3 Content' },
];

export function Tabs({ children, className, ...restProps }: TabsProps<'div'>) {
  const [selected, setSelected] = useState(0);

  const ctxValue = useMemo(
    (): TabsContextValue => ({ selected, setSelected }),
    [selected]
  );

  const handleListClick = (id: number) => {
    setSelected(id);
  };

  const handleListKeydown: KeyboardEventHandler = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSelected((selected) => {
        if (selected === tabData.length - 1) return 0;
        return selected + 1;
      });
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSelected((selected) => {
        if (selected === 0) return tabData.length - 1;
        return selected - 1;
      });
    }
  };

  return (
    <TabsContext.Provider value={ctxValue}>
      <div className={`tabs ${className}`} {...restProps}>
        <Tabs.Title id="tablist-1">TEST Title</Tabs.Title>
        <Tabs.List
          role="tablist"
          aria-labelledby="tablist-1"
          className="automatic"
        >
          {tabData.map((tab) => (
            <Tabs.List.Item
              key={tab.id}
              id={`tab-${tab.id}`}
              aria-selected={tab.id === selected}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => handleListClick(tab.id)}
              onKeyDown={(e) => handleListKeydown(e)}
              tabIndex={tab.id === selected ? 0 : -1}
            >
              <span className="focus">{tab.title}</span>
            </Tabs.List.Item>
          ))}
        </Tabs.List>
        {tabData.map((tab) => (
          <Tabs.Panel
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
          >
            {tab.content}
          </Tabs.Panel>
        ))}
      </div>
    </TabsContext.Provider>
  );
}

function TabTitle({ children, className, ...restProps }: TabTitleProps<'h3'>) {
  return (
    <h3 className={className} {...restProps}>
      {children}
    </h3>
  );
}

function TabList({ children, className, ...restProps }: TabListProps<'div'>) {
  return (
    <StyledTabList
      role="tablist"
      aria-labelledby="tablist-1"
      className={`automatic ${className}`}
      {...restProps}
    >
      {children}
    </StyledTabList>
  );
}

function TabListItem({
  children,
  className,
  ...restProps
}: TabListItemProps<'button'>) {
  return (
    <StyledTabListItem
      type="button"
      role="tab"
      className={className}
      {...restProps}
    >
      {children}
    </StyledTabListItem>
  );
}

function TabPanel({ children, className, ...restProps }: TabPanelProps<'div'>) {
  const { selected, setSelected } = useTabsContext();

  return (
    <StyledTabPanel
      role="tabpanel"
      tabIndex={0}
      dataIndex={selected}
      className={className}
      {...restProps}
    >
      {children}
    </StyledTabPanel>
  );
}

Tabs.List = TabList;
Tabs.Title = TabTitle;
TabList.Item = TabListItem;
Tabs.Panel = TabPanel;
