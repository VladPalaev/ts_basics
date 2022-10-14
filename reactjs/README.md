# Основные типы

+ JSX.IntrinsicElements
>Этот тип имеют все внутрение элементы HTML-тегов, такие как `<a><div>` и тд

+ React.FunctionComponent\<Props>
> Определение функциональных компонетов

+ React.Component\<Props, State>
> Классовые компоненты

+ React.ReactNode
> Для рендеринга JSX разметки
```
type Props = {
  header: React.ReactNode;
  body: React.ReactNode;
}
class MyComponent extends React.Component<Props, {}> {
    render() {
        return <div>
            {this.props.header}
            {this.props.body}
        </div>;
    }
}

<MyComponent header={<h1>Header</h1>} body={<i>body</i>} />
```
+ React.ReactElement<T>
>В react определениях типов есть React.ReactElement<T>, чтобы вы могли описывать результат создания экземпляра компонента класса <T/>. Например:
```
class MyAwesomeComponent extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}

const foo: React.ReactElement<MyAwesomeComponent> = <MyAwesomeComponent />; // Okay
const bar: React.ReactElement<MyAwesomeComponent> = <NotMyAwesomeComponent />; // Ошибка!
```
+ React.Component<Props>

>Тип React.Component<Props> объединяет React.ComponentClass<P> | React.StatelessComponent<P> так что вы можете принять что-то, что требует типы Props и отрендерить его с помощью JSX, например:
```
const X: React.Component<Props> = foo; // откуда-то

// Рендерим X с некоторыми свойствами:
<X {...props}/>;
```

+ Объявление веб-компонента

>Если вы используете веб-компонент, определения типа React по умолчанию (@types/react) не будут знать об этом. Но вы можете легко сказать об этом, например чтобы объявить веб-компонент под названием my-awesome-slider, который принимает Props MyAwesomeSliderProps, вы должны:

```
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'my-awesome-slider': MyAwesomeSliderProps;
    }

    interface MyAwesomeSliderProps extends React.Attributes {
      name: string;
    }
  }
}

<my-awesome-slider name='amazing'/>
```