import styled from '@emotion/styled';
import React, { createContext, useContext, useMemo, useState } from 'react';

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
  [role='tablist'] {
    min-width: 550px;
  }
`;
const StyledTabListItem = styled.button`
  [role='tab'],
  [role='tab']:focus,
  [role='tab']:hover {
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
  }

  [role='tab'][aria-selected='true'] {
    padding: 2px 2px 4px;
    margin-top: 0;
    border-width: 2px;
    border-top-width: 6px;
    border-top-color: rgb(36 116 214);
    border-bottom-color: hsl(220deg 43% 99%);
    background: hsl(220deg 43% 99%);
  }

  [role='tab'][aria-selected='false'] {
    border-bottom: 1px solid hsl(219deg 1% 72%);
  }

  [role='tab'] span.focus {
    display: inline-block;
    margin: 2px;
    padding: 4px 6px;
  }

  [role='tab']:hover span.focus,
  [role='tab']:focus span.focus,
  [role='tab']:active span.focus {
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

export function Tabs({ children, className, ...restProps }: TabsProps<'div'>) {
  const [selected, setSelected] = useState(0);

  const ctxValue = useMemo(
    (): TabsContextValue => ({ selected, setSelected }),
    [selected]
  );

  return (
    <TabsContext.Provider value={ctxValue}>
      <div className={`tabs ${className}`} {...restProps}>
        {children}
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
    <StyledTabList className={className} {...restProps}>
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
