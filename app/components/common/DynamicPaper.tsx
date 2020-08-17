/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Paper, PaperProps } from '@material-ui/core';
import ContainerDimensions from 'react-container-dimensions';

type DynamicPaperProps = {
  /**
   * The ratio of the font size to the size of the container
   */
  ratio: number;
  /**
   * The amount of padding to apply around the paper element (as JSS value)
   * Relative values using 'em' will maintain consistent padding
   *  when resizing.
   * Default: '0.5em'
   */
  padding?: string;
};

const defaultProps = {
  padding: '0.5em',
};

DynamicPaper.defaultProps = defaultProps;

export default function DynamicPaper({
  ratio,
  padding,
  children,
  ...paperProps
}: DynamicPaperProps & PaperProps) {
  return (
    <ContainerDimensions>
      {({ width }) => (
        <div
          style={{
            width: '100%',
            fontSize: `${ratio * (width - 1)}px`,
            padding,
          }}
        >
          <Paper {...paperProps}>{children}</Paper>
        </div>
      )}
    </ContainerDimensions>
  );
}
