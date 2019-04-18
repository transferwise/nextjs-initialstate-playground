// import mixpanel from 'mixpanel-browser';
import { MixpanelEvent } from './tracking-client-events';

// mixpanel.init('8ba4a7a5182f05e0a79ded57d5d2f051');

const sessionStorageTrackingKey = 'help-center-tracking';

interface SessionStorageEvent {
  title: string;
  params: any;
}


export interface AdditionalLinkTrackingParameters {
  eventName: string;
  eventParams?: object;
}

export function track(eventName: MixpanelEvent, params: object = {}): Promise<void> {
  const decoratedParams = {
    ...params,
    helpCenterVersion: 'v2',
    // TODO: implement adding general properties for all events
    // country: gb,
    // language: en,
    // viewed_articles: (number)
    // for language see also: https://transferwise.atlassian.net/browse/CSPROD-1311
  };

  return new Promise(resolve => {
    console.log(eventName, decoratedParams);
    // mixpanel.track(eventName, decoratedParams, resolve);
    resolve();
  });
}

export function onclickTracking(title: string, params: any) {
  // we should not block the browser to wait for tracking, so therefore we just save the click event
  sessionStorage.setItem(sessionStorageTrackingKey, JSON.stringify({ title, params }));
}

// until the page works as a Single Page App, we have to take into account that the page will unload
export function sendTrackingCodeFoundInSessionStorage() {
  if (typeof sessionStorage === 'undefined') {
    return Promise.resolve();
  }

  return new Promise(resolve => {
    const eventFromPreviousPageView: SessionStorageEvent | null = JSON.parse(
      sessionStorage.getItem(sessionStorageTrackingKey) || 'null'
    );

    if (eventFromPreviousPageView) {
      sessionStorage.removeItem(sessionStorageTrackingKey);

      track(eventFromPreviousPageView.title as MixpanelEvent, eventFromPreviousPageView.params);
    }

    resolve();
  });
}
