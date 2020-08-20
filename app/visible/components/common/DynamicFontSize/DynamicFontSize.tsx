import React from 'react';
import ContainerDimensions from 'react-container-dimensions';
import classes from './DynamicFontSize.css';

type DynamicFontSizeProps = {
  /**
   * The content of the component
   */
  children?: React.ReactNode;
  /**
   * The ratio of the font size to the size of the container.
   *
   * Default: 1
   */
  ratio?: number;
};

const defaultProps = {
  children: undefined,
  ratio: 1,
};

DynamicFontSize.defaultProps = defaultProps;

export default function DynamicFontSize({
  ratio,
  children,
  style,
  ...restProps
}: DynamicFontSizeProps & React.PropsWithoutRef<JSX.IntrinsicElements['div']>) {
  const textToContainerRatio = ratio ?? defaultProps.ratio;
  return (
    <ContainerDimensions>
      {({ width }) => (
        <div
          className={classes.fullwidth}
          style={{
            ...style,
            fontSize: `${Math.floor(textToContainerRatio * width)}px`,
          }}
          {...restProps}
        >
          {children}
        </div>
      )}
    </ContainerDimensions>
  );
}
