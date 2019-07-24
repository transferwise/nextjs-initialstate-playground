import React from 'react';
import { Step1 } from '../components/stepper/step1';
import { VariantWithCallback } from '../components/stepper/variant-with-callback';

// import Link from 'next/link';

interface StepperState {
  lol: any;
}

export default class StepperPage extends React.Component<any, StepperState> {
  public state = {
    lol: null
  };

  constructor(props) {
    super(props);

    this.iHaveGotTheData = this.iHaveGotTheData.bind(this);
  }

  iHaveGotTheData(data: object) {
    console.log('yay', data);

    this.setState({ lol: data });
  }

  render() {
    const { lol } = this.state;

    return (
      <div>
        <div className="row m-t-5">
          <div className="col-lg-10 col-lg-offset-1">
            <h1>Csaóka Putóka</h1>

            <Step1 title={'Lol'}>
              <Variant2 dataCallback={this.iHaveGotTheData}/>
            </Step1>

            <Step1 title="What to do">
              {lol && <Variant2 dataCallback={this.iHaveGotTheData}/>}
            </Step1>
          </div>
        </div>
      </div>

    );
  }
}
