
export interface HtmlElementInterface {
  id?: string;
  class?: string;
}

export interface LinkInterface extends HtmlElementInterface {
  _?: string;
  href?: string;
  name?: string;
  target?: string;
  title?: string;
}

export interface ListInterface extends HtmlElementInterface {
  items: ListItemInterface;
}

export interface ListItemInterface extends HtmlElementInterface {
  _?: string;
}

const obj: LinkInterface = {
  href: '/'
};
