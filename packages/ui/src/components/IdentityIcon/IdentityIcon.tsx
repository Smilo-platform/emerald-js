import * as React from 'react';
import { CSSProperties } from 'react';
import { withStyles } from '@material-ui/core/styles';
import blockies from './blockies';


const getStyles = (theme?:any) => ({
  clickable: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const noop = () => {};

interface Props {
  id: string;
  size: number;
  onClick: any;
  classes: any;
}

export class IdentityIcon extends React.Component<Props> {
  static defaultProps = {
    size: 40,
    onClick: noop,
  }

  render() {
    const {
      id, size, onClick, classes,
    } = this.props;

    const seed = id.toLowerCase();
    const icon = blockies.create({ seed }).toDataURL();
    const iconSize = Number.isInteger(size) ? size : 40;

    const mainStyle = {
      height: `${iconSize}px`,
      width: `${iconSize}px`,
      minWidth: `${iconSize}px`,
      background: `url(${icon})`,
      borderRadius: '50%',
      position: 'relative',
    } as CSSProperties;

    const identiconProps = {
      onClick,
      className: onClick === noop ? '' : classes.clickable,
    };

    return (
      <div style={mainStyle} {...identiconProps} />
    );
  }
}

export default withStyles(getStyles)(IdentityIcon);
