# Книга Typescript deep dive

## Не используйте для валидности undefined
---
Для  примера ужасная функция
```
function toInt(str:string) {
  return str ? parseInt(str) : undefined;
}
----------------------------------------------

type ValidNumber = {
    valid: boolean;
    int?: number;
}

function toInt(str: string): ValidNumber {
    if (!str.trim()) {
        return {valid: false};
    }
    const int = parseInt(str);

    if (isNaN(int)) {
        return {valid: false};
    }

    return {valid: true, int}
}
```
## Паттерн раскрывающегося модуля
---
Грубо говоря, с помощью замыкания которое реализованно в js, можно создать что-то наподобие класса. Хотя щас это все решается благодаря файловой модульности, чтобы не засорять глобальную область видимости.
```
function foo() {
    let someProperty;

    // инициализация каких-нибудь свойств

    function someMethod() {
        // выполнение операций над `someProperty`
        // и другими свойствами
    }
    // Несколько дополнительных методов

    return {
        someMethod,
        // и остальные методы
    };
}
```
## Статические свойства у класса
---
Решил создать класс с ограничение на создание игрок больше 3.
```
class Player {
    static  maxPlayers: number = 3;
    static countRequestPlayer: number = 0;

    constructor(
        public name: string,
        public role: string,
        public level: number
    ){
        Player.countRequestPlayer++;
        if (Player.countRequestPlayer > Player.maxPlayers) {
            throw new Error('max player, await please')
        }
    }
}
```
## tsconfig.json

```
{
  "compilerOptions": {

    /* Основные параметры */                       
    "target": "es5",                       /* Указать итоговую версию ECMAScript: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */
    "module": "commonjs",                  /* Указать тип модулей для генерируемого кода: 'commonjs', 'amd', 'system', 'umd' or 'es2015'. */
    "lib": [],                             /* Указать файлы библиотеки для включения их в контекст компиляции:  */
    "allowJs": true,                       /* Разрешить компиляцию JavaScript файлов. */
    "checkJs": true,                       /* Сообщить об ошибках в .js файлах. */
    "jsx": "preserve",                     /* Указать компилировать ли JSX: 'preserve', 'react-native', or 'react'. */
    "declaration": true,                   /* Создавать ли соответствующий файл '.d.ts'. */
    "sourceMap": true,                     /* Создавать ли соответствующий файл '.map'. */
    "outFile": "./",                       /* Объединить и выдать вывод в один файл. */
    "outDir": "./",                        /* Перенаправить результат вывода в каталог. */
    "rootDir": "./",                       /* Указать корневой каталог исходников, а вывод с помощью --outDir. */
    "removeComments": true,                /* Убрать комментарии из итоговых файлов. */
    "noEmit": true,                        /* Не выводить выходные данные. */
    "importHelpers": true,                 /* Импортировать хелперы вывода из 'tslib'. */
    "downlevelIteration": true,            /* Обеспечить полную поддержку итераций в 'for-of', spread, and destructuring в 'ES5' или 'ES3' */
    "isolatedModules": true,               /* Транспилировать каждый файл как отдельный модуль (аналогично «ts.transpileModule»). */
                                              
    /* Параметры для строгой проверки типов */        
    "strict": true,                        /* Включить все параметры для строгой проверки типов.*/
    "noImplicitAny": true,                 /* Выдавать ошибку в выражениях и объявлениях с неявным типом 'any'. */
    "strictNullChecks": true,              /* Включить строгие проверки на null. */
    "noImplicitThis": true,                /* Выдавать ошибку в выражениях this с неявным типом any. */
    "alwaysStrict": true,                  /* Парсить в строгом режиме и использовать директиву "use strict" для каждого исходного файла. */
                                              
    /* Дополнительные проверки */                   
    "noUnusedLocals": true,                /* Выдать ошибку об неиспользованных переменных. */
    "noUnusedParameters": true,            /* Выдать ошибку об неиспользованных параметрах. */
    "noImplicitReturns": true,             /* Выдать ошибку когда не все "пути" функции возвращают значение. */
    "noFallthroughCasesInSwitch": true,    /* Выдать ошибку об возможных невалидных исходах в операторе switch. */
                                              
    /* Параметры анализа модуля */           
    "moduleResolution": "node",            /* Указать вариант анализа модуля: 'node' (Node.js) или 'classic' (TypeScript pre-1.6). */
    "baseUrl": "./",                       /* Базовый каталог для анализа не абсолютных имен модулей. */
    "paths": {},                           /* Набор записей чтобы перенастроить отображение импортов относительно 'baseUrl'. */
    "rootDirs": [],                        /* Список корневых папок, объединенное содержимое которых представляет структуру проекта во время выполнения. */
    "typeRoots": [],                       /* Список папок для включения определений типов. */
    "types": [],                           /* Расширения файлов для определения типов которые будут включены в компиляцию. */
    "allowSyntheticDefaultImports": true,  /* Разрешить импорт по умолчанию из модулей без экспорта по умолчанию. Это не влияет на генерацию кода, просто проверка типов. */
                                              
    /* Параметры Source Map */                  
    "sourceRoot": "./",                    /* Указать местоположение, где отладчик должен находить файлы TypeScript вместо исходных расположений источника. */
    "mapRoot": "./",                       /* Указать местоположение, где отладчик должен находить map файлы вместо сгенерированных местоположений. */
    "inlineSourceMap": true,               /* Создать единый файл с source maps вместо отдельных файлов. */
    "inlineSources": true,                 /* Выпустить источник вместе с sourcemaps в одном файле; требуется установить '--inlineSourceMap' или '--sourceMap'. */
                                              
    /* Экспериментальные параметры*/                
    "experimentalDecorators": true,        /* Включить экспериментальную поддержку для декораторов ES7. */
    "emitDecoratorMetadata": true          /* Включить экспериментальную поддержку выдачи типа метаданных для декораторов. */
  }
}
```







Todo:
https://github.com/etroynov/typescript-book/blob/master/docs/classes-emit.md 
> прочитать про __proto и prototype
> вернуться к главе promise
> прочитать про генераторы