import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

const WindowsLayers: React.ComponentType<SvgIconProps> = (props) => (
  <SvgIcon style={{fill:'none'}} stroke="currentColor" fill="none" strokeWidth="4" viewBox="0 0 64 64" {...props} >
    <path d="M20 44H8V8h28v20"/><path d="M20 28h36v28H20z"/>
  </SvgIcon>
);

export default WindowsLayers;
