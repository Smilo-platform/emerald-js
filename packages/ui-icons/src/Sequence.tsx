import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

const Sequence: React.ComponentType<SvgIconProps> = (props) => (
  <SvgIcon style={{fill:'none'}} stroke="currentColor" fill="none" strokeWidth="4" viewBox="0 0 64 64" {...props} >
    <path d="M56 32l-8 8-8-8m-8 24l-8-8 8-8M8 32l8-8 8 8m8-24l8 8-8 8m8-8H16m0 8v24m32 0H24m24-8V16"/>
  </SvgIcon>
);

export default Sequence;
