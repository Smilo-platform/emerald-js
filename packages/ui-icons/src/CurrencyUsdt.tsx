import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

const CurrencyUsdt: React.ComponentType<SvgIconProps> = (props) => (
  <SvgIcon style={{fill:'none'}} stroke="currentColor" fill="none" strokeWidth="4" viewBox="0 0 64 64" {...props} >
    <ellipse cx="32" cy="28" rx="24" ry="8"/><path d="M12 8h40M32 56V8"/>
  </SvgIcon>
);

export default CurrencyUsdt;
