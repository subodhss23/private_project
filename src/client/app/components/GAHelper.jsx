import ReactGA from 'react-ga';

export const event = (c, action) => {
  ReactGA.event({
    category: c,
    action: action
  });
};

export const eventWithLabel = (c, action, label) => {
  ReactGA.event({
    category: c,
    action: action,
    label: label
  });
};

export const eventWithValue = (c, action, value) => {
  ReactGA.event({
    category: c,
    action: action,
    value: value
  });
};

export const eventWithLabelAndValue = (c, action, label, value) => {
  ReactGA.event({
    category: c,
    action: action,
    label: label,
    value: value
  });
};

export const pageView = page => {
  ReactGA.pageview(page);
};