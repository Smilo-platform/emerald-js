import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

const Battery50: React.ComponentType<SvgIconProps> = (props) => (
  <SvgIcon style={{fill:'none'}} stroke="currentColor" fill="none" strokeWidth="4" viewBox="0 0 64 64" {...props} >
    <path d="M48 24v-8H8v32h40v-8h8V24h-8zm-32 0v16m8-16v16"/>
  </SvgIcon>
);

export default Battery50;
