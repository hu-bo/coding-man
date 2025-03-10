import ISchema from '@/types/schema';

/**
 * @file 属性本身的属性定义
 * @description 这里的 props 是狭义的，也就是说不包含 children 这个属性。
 * 之所以这么设计是为了让 dsl 读写效率更高，且 DSL 类型定义相对简洁一些
 */
export default interface IPropsSchema extends ISchema {
  // 如果是值，那么该属性变更时，可以用 useEffect 监听并做出响应。目前来说，对于一个组件，值属性最多支持一个
  isValue?: boolean;
  // 控制 UI 显隐性
  isVisible?: boolean;
  /**
   * 模板字段路径，如果是空字符串，表明属性本身是就是模板对象
   * path 字段是正则表达式，即便是采用穷举的方式，也要使用正则表达式进行填充
   */
  templateKeyPathsReg?: { path: string; type: 'object' | 'function' }[];

  // 属性的名字
  name: string;
  // 属性值的类型, 这个是组件要求的，它和 value 本身的类型不完全对等，比如 hasTemplate 为真时，valueType 即便是 function，value 的值也是对象
  valueType: 'string' | 'boolean' | 'number' | 'function' | 'object' | 'array';
  /*
   * 这个值的来源
   * editorInput: 创建页面时编辑者输入的常量，会指导代码生成器生成常量声明和赋值代码，存入 const
   * httpRequest: 从后端获取的数据，经过转换（或者直接）存入 state
   * userInput: 用户输入，一般会赋值给 value
   * state: 一般是控制组件显影的状态值
   * computed: 计算数据，主要是通过后端数据源算出来的，或者根据用户输入算出来的，用 useMemo 实现
   * handler: 事件处理器，当用户为事件配置了相应后，会产生这个值
   */
  valueSource: 'editorInput' | 'httpRequest' | 'state' | 'userInput' | 'computed' | 'handler';
  // 如果存在 keyPath，里边的对应值会变成 template 的引用
  value: string | boolean | number | object | ((...params: any[]) => any);
}
