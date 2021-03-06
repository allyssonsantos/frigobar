/* eslint-disable global-require */
import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';
import dracula from 'prism-react-renderer/themes/nightOwl';
import { transform } from '@babel/core';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { MDXContext } from '@mdx-js/react';

import { useComponent } from '../../contexts/component';
import {
  Container,
  Tab,
  ComponentBackground,
  EditorBackground,
  Error,
  HighlightBackground,
} from './styles';

const Code = ({
  codeString,
  language,
  'react-live': reactLive,
  noInline,
  height,
  fileName,
}) => {
  const { name } = useComponent();

  if (reactLive) {
    return (
      <Container height={height}>
        <MDXContext.Consumer>
          {scope => (
            <LiveProvider
              scope={{
                ...scope,
                useState,
                useRef,
                styled,
                _styled: styled,
                css,
              }}
              code={codeString}
              language={language}
              noInline={noInline}
              theme={dracula}
              transformCode={code => {
                try {
                  if (
                    typeof document !== 'undefined' &&
                    typeof window !== 'undefined'
                  ) {
                    const transformed = transform(code, {
                      plugins: [
                        require('@babel/plugin-syntax-jsx'),
                        require('@frigobar/babel-plugin'),
                        require('babel-plugin-styled-components'),
                      ],
                    }).code;

                    const withoutImport = transformed.replace(
                      /import _?styled[0-9]? from "styled-components"/gi,
                      '',
                    );
                    const withoutStyled = withoutImport.replace(
                      /_Styled/g,
                      'Styled',
                    );

                    return withoutStyled;
                  }
                } catch (e) {
                  return code;
                }

                return undefined;
              }}
            >
              <EditorBackground>
                <Tab>{fileName || `${name}.jsx`}</Tab>
                <LiveEditor
                  style={{ height: '100%', fontSize: 14 }}
                  className="live-editor"
                />
              </EditorBackground>
              <ComponentBackground>
                <LivePreview />
              </ComponentBackground>
              <Error>
                <LiveError />
              </Error>
            </LiveProvider>
          )}
        </MDXContext.Consumer>
      </Container>
    );
  }
  return (
    <HighlightBackground>
      <Highlight
        {...defaultProps}
        code={codeString}
        language={language}
        theme={dracula}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </HighlightBackground>
  );
};

Code.propTypes = {
  codeString: PropTypes.string,
  language: PropTypes.string,
  'react-live': PropTypes.string,
  noInline: PropTypes.bool,
  height: PropTypes.string,
  fileName: PropTypes.string,
};

Code.defaultProps = {
  codeString: '',
  language: '',
  'react-live': undefined,
  noInline: false,
  height: '500',
  fileName: undefined,
};

export default Code;
