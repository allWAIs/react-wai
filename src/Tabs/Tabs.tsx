import styled from '@emotion/styled';
import React, {
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

type Component<T extends React.ElementType> = {
  className?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithRef<T>;

type TabsProps<T extends React.ElementType> = Component<T>;
type TabPanelProps<T extends React.ElementType> = {
  dataIndex?: number;
} & Component<T>;

const StyledTabListItem = styled.button`
  position: relative;
  z-index: 2;
  top: 2px;
  margin-top: 4px;
  border: 1px solid hsl(219deg 1% 72%);
  border-bottom: 2px solid hsl(219deg 1% 72%);
  border-radius: 5px 5px 0 0;
  overflow: visible;
  outline: none;
  font-weight: bold;

  padding: ${(props) =>
    props['aria-selected'] ? '2px 2px 4px' : '3px 3px 4px'};
  color: ${(props) => (props['aria-selected'] ? 'red' : '')};
  border-width: ${(props) => (props['aria-selected'] ? '2px' : '')};
  border-top-width: ${(props) => (props['aria-selected'] ? '6px' : '')};
  border-top-color: ${(props) =>
    props['aria-selected'] ? 'rgb(36 116 214)' : ''};
  border-bottom-color: ${(props) =>
    props['aria-selected'] ? 'hsl(220deg 43% 99%)' : ''};
  background: ${(props) =>
    props['aria-selected'] ? 'hsl(220deg 43% 99%)' : 'hsl(220deg 20% 94%)'};

  /* :focus {
    background-color: yellow;
  } */

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
    z-index: 10;
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

const tabData = [
  { id: 0, title: 'tab1', content: 'tab1 Content' },
  { id: 1, title: 'tab2', content: 'tab2 Content' },
  { id: 2, title: 'tab3', content: `tab3 Content` },
];

export function Tabs({ children, className, ...restProps }: TabsProps<'div'>) {
  const [selected, setSelected] = useState(0);

  const handleListClick = (id: number) => {
    setSelected(id);
  };
  const tabListRef = useRef(null);

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
    // if (e.key === 'Enter') {
    //   console.log(e.target);
    // }
  };

  // useEffect(() => {
  //   tabListRef.current.focus();
  // }, [tabListRef]);

  return (
    <div className={`tabs ${className}`} {...restProps}>
      <h3 id="tablist-1">TEST Title</h3>
      <div role="tablist" aria-labelledby="tablist-1" className="automatic">
        {tabData.map((tab) => (
          <StyledTabListItem
            ref={tabListRef}
            type="button"
            role="tab"
            key={tab.id}
            id={`tab-${tab.id}`}
            aria-selected={tab.id === selected}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => handleListClick(tab.id)}
            onKeyDown={(e) => handleListKeydown(e)}
            tabIndex={tab.id === selected ? 0 : -1}
          >
            <span className="focus">{tab.title}</span>
          </StyledTabListItem>
        ))}
      </div>
      {tabData.map((tab) => (
        <StyledTabPanel
          key={tab.id}
          id={`tabpanel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          dataIndex={selected}
          role="tabpanel"
          tabIndex={0}
        >
          {tab.content}
        </StyledTabPanel>
      ))}
    </div>
  );
}
