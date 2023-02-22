// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PropsWithHTMLAttr<T> extends React.DetailedHTMLProps<React.HTMLAttributes<T>, T> {}

interface PropsWithHTMLAttrAndRestProps<T> extends PropsWithHTMLAttr<T> {
  [key: string]: unknown;
}
