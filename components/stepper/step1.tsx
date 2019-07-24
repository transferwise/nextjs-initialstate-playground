import React from 'react';

interface StepperProps {
  title: string;
  children: Variant
}

interface StepperState {
  open: boolean;
}

export interface VariantMandatory {
  dataCallback: (data: object) => void;
}

export interface Variant extends /* React.Component<VariantMandatory, any>  | */ JSX.Element {
  props: {
    dataCallback: (data: object) => void;
  }
}

export class Step1 extends React.Component<StepperProps, StepperState> {
  state = {
    open: false
  };

  constructor(props) {
    super(props);

    this.handleClickOnTitle = this.handleClickOnTitle.bind(this);
  }

  handleClickOnTitle() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const { title } = this.props;

    return (
      <div>
        <span className="h3" onClick={this.handleClickOnTitle}>{title}</span>
        <hr/>
        <div className={'step-children' + (this.state.open ? '' : ' hidden')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}