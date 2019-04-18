import * as React from 'react';

export class CancellableStateComponent<Props, State> extends React.Component<Props, State> {
  protected cancellableSetState: (state: State) => void;

  constructor(props: Props) {
    super(props);
    this.cancellableSetState = this.setState.bind(this);
  }

  public componentWillUnmount() {
    this.cancellableSetState = () => {}; // tslint:disable-line
  }
}
