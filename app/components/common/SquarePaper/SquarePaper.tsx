import React from 'react';
import { Paper, PaperProps } from '@material-ui/core';
import classes from './SquarePaper.css';

type SquarePaperProps = {
  /**
   * The amount of padding to apply around the paper element (as JSS value)
   * Default: '1em'
   */
  padding?: string;
};

const defaultProps = {
  padding: '1em',
};

SquarePaper.defaultProps = defaultProps;

export default function SquarePaper({
  padding,
  children,
  ...paperProps
}: SquarePaperProps & PaperProps) {
  return (
    <Paper {...paperProps} className={classes['square-paper__background']}>
      <div className={classes['square-paper__content']}>{children}</div>
    </Paper>
  );
}
