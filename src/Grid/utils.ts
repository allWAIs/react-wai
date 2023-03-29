import { Breakpoint, getMediaQueries, getPosition, isSameArray } from '../utils';
import { css } from '@emotion/react';
import { GridProps } from './Grid';

export type GridColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
type GridRole = 'container' | 'item' | 'both';

export const GRID_ITEM_CLASSNAME = 'R-wai-GridItem';

export const validateRole = ({ container, item }: { container?: boolean; item?: boolean }): void => {
  if (!container && !item) {
    throw new Error('Grid component must have at least one role: "container" or "item"');
  }
};
export const getRole = ({ container, item }: { container?: boolean; item?: boolean }): GridRole => {
  if (container) {
    return item ? 'both' : 'container';
  } else {
    return 'item';
  }
};

const getGridContainerStyles = ({ direction, spacing }: GridProps) => {
  const spacingStyles = spacing
    ? `
    padding-top: ${spacing}px;
    padding-left: ${spacing}px;
    `
    : '';
  return `
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${direction};
    & > .${GRID_ITEM_CLASSNAME} {
      ${spacingStyles}
    }
  `;
};

const formatGridItemSize = (size: GridColumn): string => `
  max-width: ${size === 'auto' ? size : (100 / 12) * +size + '%'};
  flex-grow: 0;
  flex-basis: ${size === 'auto' ? size : (100 / 12) * +size + '%'};
`;

const getGridItemStyles = (sizes: GridProps): string => {
  const { xs, sm, md, lg, xl } = sizes;
  const mediaQueries = getMediaQueries({ xs: !!xs, sm: !!sm, md: !!md, lg: !!lg, xl: !!xl });
  return Object.entries(sizes)
    .map(
      ([key, size]) => `${mediaQueries[key as Breakpoint]}{
        ${formatGridItemSize(size)}
      }`
    )
    .join('\n');
};

export const getGridStyles = ({
  container,
  item,
  spacing,
  direction = 'row',
  xs,
  sm,
  md,
  lg,
  xl,
}: GridProps): { [key: string]: ReturnType<typeof css> } => {
  const containerCss = css`
    ${container ? getGridContainerStyles({ direction, spacing }) : ''}
  `;
  const itemCss = css`
    ${item ? getGridItemStyles({ xs, sm, md, lg, xl }) : ''}
  `;
  return { containerCss, itemCss };
};

const getColumnSize = ($gridItems: HTMLElement[], breakpoint: Breakpoint): GridColumn | null => {
  const dataKey = `rWaiGrid${breakpoint[0].toUpperCase() + breakpoint.slice(1)}`;

  // INFO: 현재는 불규칙한 레이아웃에는 키보드네비게이션을 적용하지 않음.
  // 모든 row의 모양이 같을 때에만 정렬되었다고 판단

  const hasSize = $gridItems.every(($item) => !!$item.dataset[dataKey]);
  if (!hasSize) return null;

  const hasAuto = !!$gridItems.some(($item) => $item.dataset[dataKey] === 'auto');
  if (hasAuto) return 'auto';

  const itemSizes: number[][] = [[]];
  let accumulatedSize = 0;
  for (let i = 0; i < $gridItems.length; i++) {
    const size = Number($gridItems[i].dataset[dataKey]) as number;
    if (accumulatedSize + size <= 12) {
      itemSizes.at(-1)?.push(size);
      accumulatedSize += size;
    } else {
      itemSizes.push([size]);
      accumulatedSize = size;
    }
  }

  const isAligned =
    itemSizes.slice(0, itemSizes.length - 1).every((row) => isSameArray(row, itemSizes[0])) &&
    itemSizes.at(-1)?.every((val, idx) => val === itemSizes[0][idx]);
  if (!isAligned) {
    return null;
  }

  return itemSizes[0].length as GridColumn;
};

export type GridTable = HTMLElement[][];

export interface GridTables {
  [key: string]: GridTable | null;
}

export const getGridTable = ($gridItems: HTMLElement[], columnSize: number): GridTable | null => {
  const $gridTable = Array.from({ length: Math.ceil($gridItems.length / columnSize) }, () => [] as HTMLElement[]);

  $gridItems.forEach((item, idx) => $gridTable[Math.floor(idx / columnSize)].push(item));

  return $gridTable;
};

export const getGridTables = ($container: HTMLElement): GridTables => {
  const $gridItems = [...$container.children].filter(($item) =>
    $item.classList.contains(GRID_ITEM_CLASSNAME)
  ) as HTMLElement[];
  const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  return breakpoints.reduce<GridTables>((gridTables, breakpoint, idx) => {
    const columnSize = getColumnSize($gridItems, breakpoint);
    if (!columnSize) {
      const prevBreakpoint = breakpoints[idx - 1];
      const prevGridTable = prevBreakpoint ? gridTables[prevBreakpoint] : null;
      gridTables[breakpoint] = prevGridTable;
    } else if (columnSize === 'auto') {
      gridTables[breakpoint] = null;
    } else {
      gridTables[breakpoint] = getGridTable($gridItems, columnSize);
    }
    return gridTables;
  }, {});
};

const moveFocus = ($gridTable: GridTable, direction: 'U' | 'D' | 'L' | 'R') => {
  const $focused = $gridTable.flat().find(($item) => document.activeElement === $item);
  if ($focused) {
    const { row, col } = getPosition($gridTable, $focused) as { row: number; col: number };

    if (direction === 'U') $gridTable[row - 1]?.[col]?.focus();
    else if (direction === 'D') $gridTable[row + 1]?.[col]?.focus();
    else if (direction === 'L') $gridTable[row][col - 1]?.focus();
    else if (direction === 'R') $gridTable[row][col + 1]?.focus();
  }
};

export interface GridNavigator {
  [key: string]: () => void;
}

export interface GridNavigators {
  [key: string]: GridNavigator | null;
}

export const getGridNavigator = ($gridTable: GridTable | null): GridNavigator | null => {
  if (!$gridTable) return null;

  return {
    up() {
      moveFocus($gridTable, 'U');
    },
    down() {
      moveFocus($gridTable, 'D');
    },
    left() {
      moveFocus($gridTable, 'L');
    },
    right() {
      moveFocus($gridTable, 'R');
    },
  };
};

export const getGridNavigators = ($gridTables: GridTables): GridNavigators => {
  const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  return breakpoints.reduce<GridNavigators>((navigators, breakpoint) => {
    navigators[breakpoint] = getGridNavigator($gridTables[breakpoint]);
    return navigators;
  }, {});
};
