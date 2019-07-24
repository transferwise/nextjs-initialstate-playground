import * as React from 'react';
import { VariantMandatory } from './step1';

export class VariantWithCallback extends React.Component<VariantMandatory> {
  constructor(props) {
    super(props);

    this.lol = this.lol.bind(this);
  }

  lol() {
    this.props.dataCallback({
      lol: 'wat',
    });
  }

  render() {
    return (
      <div>
        {/* If state changes dataCallback() */}
        <input type="radio" title="lol" onClick={this.lol}/>
      </div>
    )
  }
}