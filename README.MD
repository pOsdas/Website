# Web Stop-Watch

Браузерный секундомер 

## Содержание
- [Библиотеки](#библиотеки)
- [Начало работы](#начало-работы)
  - [Для windows](#Windows)
  - [Для Linux](#Linux)
- [Использование](#использование) 
- [License](#license)
- [Автор проекта](#author)

## Библиотеки

* flask
* threading

## Начало работы

1. Скопируйте репозиторий.
2. Создайте и активируйте ваше виртуально пространство:
    ### Windows:
    ```commandline
    python -m venv venv
    source venv/Scripts/activate
    ```
    ### Linux:
    ```commandline
    python -m venv venv
    source venv/bin/activate
    ``` 
3. Установите зависимости:
    ```commandline
    pip install -r requirements.txt
    ```

## Использование
Находясь на уровень выше директории `app`, пропишите следующие команды:
### windows:
```
set FLASK_APP=app/script.py
```
```
flask run
```
### linux:
```
export FLASK_APP=app/script.py
```
```
flask run
```

## License
Распространяется под лицензией MIT.\
Дополнительная информация в файле `LICENSE.txt`.

## Author
* [pOsdas](https://github.com/pOsdas)