/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  arrowNavigation,
  getTabbableChildren,
  KEYS,
  getCompatibleKey,
  removeTabbable,
  restoreTabbable,
  toggleTabbable,
  getFocusableChildren,
} from '../utils';
import { TabContext } from './context';

export function TabMenu({ as, direction, children, ...restProps }) {
  const containerRef = useRef(null);

  let tabs = null;
  let tabpanels = null;
  let firstTabbable = null;
  let lastTabbable = null;

  useEffect(() => {
    initTab();
  }, []);

  const labelTabsById = (tab, tabpanel) => {
    const identifier = tab.getAttribute('id').split('-').at(-1);
    tabpanel.setAttribute('id', `r-wai-tabpanel-${identifier}`);
    tab.setAttribute('aria-controls', `r-wai-tabpanel-${identifier}`);
    tabpanel.setAttribute('aria-labelledby', `r-wai-tab-${identifier}`);
  };

  const initTab = () => {
    const $container = containerRef.current;

    tabs = Array.from($container.querySelectorAll('[role="tab"]'));
    tabpanels = Array.from($container.querySelectorAll('[role="tabpanel"]'));

    if (tabpanels.length > 0) {
      if (tabs.length !== tabpanels.length) {
        throw new Error('tab과 tabpanel의 개수가 일치하지 않습니다.');
      }
      tabs.forEach((tab, idx) => labelTabsById(tab, tabpanels[idx]));
    }

    const tabbables = getTabbableChildren($container);
    firstTabbable = tabbables[0];
    lastTabbable = tabbables.at(-1);
  };

  const handleFocus = ({ target: focusedNode }) => {
    const role = focusedNode.getAttribute('role');
    if (role === 'tab') {
      tabs.forEach((tab) => {
        removeTabbable(tab);
        tab.removeAttribute('aria-selected');
      });

      tabpanels.forEach((tabpanel) => {
        const isMatched = tabpanel.getAttribute('aria-labelledby') === focusedNode.id;
        getTabbableChildren(tabpanel).forEach((node) => toggleTabbable(node, isMatched));
      });
    } else if (role !== 'tabpanel') {
      const selectedTabId = focusedNode.closest('[role="tabpanel"]')?.getAttribute('aria-labelledby');
      if (!selectedTabId) {
        return;
      }

      tabs.find((tab) => tab.id === selectedTabId).setAttribute('aria-selected', true);

      tabpanels.map(getTabbableChildren).flat().forEach(removeTabbable);
    }
    restoreTabbable(focusedNode);
  };

  const handleKeyDown = (e) => {
    const key = getCompatibleKey(e);

    switch (key) {
      case KEYS.HOME:
        e.preventDefault();
        e.ctrlKey ? firstTabbable.focus() : tabs[0].focus();
        break;
      case KEYS.END:
        e.preventDefault();
        e.ctrlKey ? lastTabbable.focus() : tabs.at(-1).focus();
        break;
      case KEYS.ARROW_UP:
      case KEYS.ARROW_DOWN:
      case KEYS.ARROW_LEFT:
      case KEYS.ARROW_RIGHT:
        e.preventDefault();
        arrowNavigation(direction, tabs, key);
        break;
      default:
        break;
    }
    e.stopPropagation();
  };
  // handle focus when tab Enter&Space key pressed
  const handleClick = ({ target }) => {
    const role = target.getAttribute('role');
    if (role === 'tab') {
      const tabId = target.getAttribute('id');

      const matchedTabpanel = tabpanels.find((tabpanel) => tabpanel.getAttribute('aria-labelledby') === tabId);
      const focusableChildren = getFocusableChildren(matchedTabpanel);
      (focusableChildren.find((node) => node.getAttribute('tabindex') === '0') ?? focusableChildren[0]).focus();
    }
  };

  return (
    <TabContext.Provider value={{ direction }}>
      <StyledTabMenu
        as={as}
        ref={containerRef}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        {...restProps}
      >
        {children}
      </StyledTabMenu>
    </TabContext.Provider>
  );
}

TabMenu.defaultProps = {
  as: 'div',
  direction: 'row',
};

const { oneOfType, oneOf, string, node } = PropTypes;

TabMenu.propTypes = {
  /**
  네이티브 태그 또는 커스텀 컴포넌트(권장하지는 않음)
   */
  as: oneOfType([string, node]),
  /**
   키보드 네비게이션을 적용하기 위한 탭 방향
   */
  direction: oneOf(['row', 'col']),
};

const StyledTabMenu = styled.div``;
