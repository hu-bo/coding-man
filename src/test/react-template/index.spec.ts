import { describe, expect } from '@jest/globals';
import ReactCodeGenerator, { IPropsOptions, ITSXOptions, IUseEffectOptions } from '@/service/code-generator/react';
import IPageSchema from '@/types/page.schema';
import dsl from '@/mock/tab-case.json';

describe('react-template', () => {
  const react = new ReactCodeGenerator(dsl as unknown as IPageSchema);
  test('should return props string', () => {
    const propsOpt: IPropsOptions = {
      name: 'title',
      variableName: 'buttonTitle',
      variableType: 'string',
      variableValueSource: 'fixed'
    };
    expect(react.generatePropStr(propsOpt)).toStrictEqual('title={buttonTitle}');
  });
  test('should return template sentences array', () => {
    const tsx: ITSXOptions = {
      componentName: 'div',
      children: [
        {
          componentName: 'Button',
          propsStrArr: ['title={buttonTitle}', 'onClick={handleClicking}']
        },
        {
          componentName: 'Input.Search',
          propsStrArr: ['value={inputValue}']
        },
        {
          componentName: 'div',
          children: [
            {
              componentName: 'div'
            },
            {
              componentName: 'p'
            }
          ]
        }
      ]
    };
    expect(react.generateTSX(tsx)).toStrictEqual([
      '<div >',
      '<Button title={buttonTitle} onClick={handleClicking} />',
      '<Input.Search value={inputValue} />',
      '<div >',
      '<div />',
      '<p />',
      '</div>',
      '</div>'
    ]);
  });
  test('should return use effect hook sentence array', () => {
    const effectOpt: IUseEffectOptions = {
      handlerCallingSentence: 'fetchData().then();',
      dependencies: ['value']
    };
    expect(react.generateUseEffect(effectOpt)).toStrictEqual([
      'useEffect(() => {',
      'fetchData().then();',
      '}, [value]);',
    ]);
  });
  test('should return use effect hook sentence array with no dependencies', () => {
    const effectOpt: IUseEffectOptions = {
      handlerCallingSentence: 'fetchData().then();',
      dependencies: []
    };
    expect(react.generateUseEffect(effectOpt)).toStrictEqual([
      'useEffect(() => {',
      'fetchData().then();',
      '}, []);',
    ]);
  });
  test('should return use effect hook sentence array with no dependencies 2', () => {
    const effectOpt: IUseEffectOptions = {
      handlerCallingSentence: 'fetchData().then();',
    };
    expect(react.generateUseEffect(effectOpt)).toStrictEqual([
      'useEffect(() => {',
      'fetchData().then();',
      '});',
    ]);
  });
});
