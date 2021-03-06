// For convenience we organize every component classes in his own file, but if you are planning to
// create your own theme (and you prefer) remember that you can also define the classes directly.
// 为了方便起见，我们将每个组件类组织在自己的文件中，
// 但是如果您打算创建你自己的主题（你更喜欢）记住你也可以直接定义类。
// So instead of importing the file:
// 所以不要导入文件：
// `import TInput from './default/TInput'`
// 
// You can define have all your classes in your theme file like:
// 您可以定义在主题文件中包含所有类，如：
// ```
// const NButton = {
//   baseClass: 'border block w-full rounded',
//   ...
// }
// ...

import NButton from './default/NButton'

const DefaultTheme = {
  NButton
}

export {
  NButton
}

export default DefaultTheme
