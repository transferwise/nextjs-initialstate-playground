import * as React from 'react';
import { PureComponent } from 'react';
import './footer.scss';
// import helpGuy from './help-guy.png';
import { Message } from 'retranslate';
import { Locale } from '../../common/locale';
import { track } from '../../common/tracking-client';
import { MixpanelEvent } from '../../common/tracking-client-events';

interface FooterProps {
  locale: Locale;
}

function trackContactUsClicks() {
  track(MixpanelEvent.ContactUsClicked);
}

export class Footer extends PureComponent<FooterProps> {
  public render() {
    return (
      <footer className="bg-primary inner-container text-lg-left text-xs-center">
        <div className="row p-t-section-2">
          <div className="col-xl-4 col-xl-offset-2 col-lg-5 col-lg-offset-1 m-t-4 m-b-4">
            <div className="spacer p-t-3 m-t-5 visible-lg visible-xl" />
            <span className="m-t-2 h1">
              <Message>footer.title</Message>
            </span>
            <p className="text-primary">
              <Message>footer.subtitle</Message>
            </p>
            <a
              href={`/contact?lang=${this.props.locale}`}
              type="button"
              className="btn btn-primary btn-block"
              target="_blank"
              onClick={trackContactUsClicks}
            >
              <Message>footer.contact.label</Message>
            </a>
          </div>
          <div className="col-xl-4 col-lg-5 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-12">
            {/*<img className="img-responsive center-block tw-footer-help-guy" src={helpGuy} />*/}
          </div>
        </div>
      </footer>
    );
  }
}
