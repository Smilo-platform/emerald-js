import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ArrowDown } from '@emeraldplatform/ui-icons';
import Input from '../../src/components/Input';

storiesOf('Input', module)
  .add('all', () => (
    <div style={{ width: '300px' }}>
      <div>
        <h1>Number</h1>
        <Input type="number" />
      </div>
      <div>
        <h1>Plain Jane</h1>
        <Input onChange={action('onChange')} />
      </div>
      <div>
        <h1>With Value</h1>
        <Input value={Math.random() * 100} onChange={action('onChange')} />
      </div>
      <div>
        <h1>With placeholder</h1>
        <Input placeholder="hint text" onChange={action('onChange')} />
      </div>
      <div>
        <h1>With Left Icon</h1>
        <Input leftIcon={<ArrowDown />} onChange={action('onChange')} />
      </div>
      <div>
        <h1>With Right Icon</h1>
        <Input rightIcon={<ArrowDown />} onChange={action('onChange')} />
      </div>
      <div>
        <h1>With Error</h1>
        <Input errorText="Big ol error" onChange={action('onChange')} />
      </div>
    </div>
  ))
  .add('Number with min and max', () => (
   <Input type="number" min={0.5} max={1.5} onChange={action('onChange')} />
  ));
