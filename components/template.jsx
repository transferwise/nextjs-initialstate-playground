import React from 'react';
import { PublicNavigation, Footer } from '@transferwise/public-navigation';

export function PageTemplate({ children }) {
  return (
    <div>
      <PublicNavigation className="bg-brand-dark" inverse={false}/>

      <div className="bg-default row">
        <header>
          <div className="row inner-container center-block p-y-2">
            <div className="col-lg-7 col-xs-12">
              <h4 className="text-inverse">
                Hi!
              </h4>
            </div>
            <div className="col-lg-5 col-xs-12">
              Search
              {/*<SearchBar value={this.props.searchTerm} />*/}
            </div>
          </div>
        </header>

        <div className="inner-container center-block p-t-section-1 p-b-section-2 col-md-10 col-md-offset-1">
          <div className="row hidden-xs p-t-1">
            <div className={'col-lg-8 col-xs-12 home-page-title-section'}>
              <h1 className="hidden-xs">
                To be titled
              </h1>
            </div>
          </div>

          <div className="row">
            {children}
          </div>
        </div>
      </div>

      <div className="row">
        <Footer
          inverse={true}
        />
      </div>
    </div>
  );
}