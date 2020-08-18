import React from 'react';
import ContainerDimensions from 'react-container-dimensions';

type DynamicPaperProps = {
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

DynamicPaper.defaultProps = defaultProps;

export default function DynamicPaper({
  ratio,
  children,
  style,
  ...restProps
}: DynamicPaperProps & React.PropsWithoutRef<JSX.IntrinsicElements['div']>) {
  const textToContainerRatio = ratio ?? defaultProps.ratio;
  return (
    <ContainerDimensions>
      {({ width }) => (
        <div
          style={{
            ...style,
            width: '100%',
            fontSize: `${textToContainerRatio * (width - 1)}px`,
          }}
          {...restProps}
        >
          {children}
        </div>
      )}
    </ContainerDimensions>
  );
}
