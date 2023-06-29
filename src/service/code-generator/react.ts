import IPageSchema from '@/types/page.schema';

export interface ITSXOptions {
  componentName: string;
  propsStrArr?: string[];
  children?: ITSXOptions[];
}

export interface IPropsOptions {
  name: string;
  variableName: string;
  variableType: string;
  variableValueSource: 'fixed' | 'dataSource' | 'calculation';
}

export interface IUseEffectOptions {
  dependencies?: string[];
  handlerCallingSentence: string;
}

export default class ReactCodeGenerator {
  constructor(dsl: IPageSchema) {
    this.dsl = dsl;
  }

  dsl: IPageSchema;

  generateTSX(opt: ITSXOptions, sentences: string[] = []): string[] {
    const { propsStrArr = [], componentName, children = [] } = opt;
    const startTagStr = `<${componentName}${propsStrArr?.length ? ' ': ''}${propsStrArr.join(' ')} ${children?.length ? '' : '/'}>`;
    sentences.push(startTagStr);
    if (children?.length) {
      children?.forEach(child => {
        this.generateTSX(child).forEach(item => {
          sentences.push(item);
        });
      });
      const closeTagStr = `</${componentName}>`;
      sentences.push(closeTagStr);
    }
    return sentences;
  }

  generatePropStr(opt: IPropsOptions): string {
    const { name, variableName, variableType } = opt;
    if (variableType === 'function') {
      return `${name}={(...args) => ${variableName}(...args)}`;
    }
    return `${name}={${variableName}}`;
  }

  generateUseEffect(opt: IUseEffectOptions): string[] {
    const { handlerCallingSentence, dependencies } = opt;
    const result: string[] = [];
    const useEffectHeadStr = 'useEffect(() => {';
    result.push(useEffectHeadStr);
    result.push(handlerCallingSentence);
    let dependenciesStr = '';
    if (dependencies) {
      dependenciesStr = `[${dependencies.join(', ')}]`;
    } else {
      dependenciesStr = '';
    }
    const tailSentence = `}${dependenciesStr ? ', ' : ''}${dependenciesStr});`;
    result.push(tailSentence);
    return result;
  }
}