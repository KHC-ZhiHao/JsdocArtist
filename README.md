# JsdocArtist

解讀JSDOC的語法並輸出自定義的文字，這並不是泛用的規範，但不是每次都需要搞得這麼複雜，對吧？

>這裡提供了一個簡易的markdown template，快速體驗:<br>
>https://khc-zhihao.github.io/JsdocArtist/

## How to use

---

### example
html :

``` html
    <script src="./dist/index.js"></script>
```

js :
``` js
    let JDA = new JsdocArtist;
    //設定每個註解區塊的分隔符號
    JDA.settingBlock('***');
    //註冊一個jsdoc註解
    JDA.register( "class",{
        help : "這是一個類別",
        temp : [ "name" ],
        output : function(data, err){
            if( /[a-z|A-Z]/.test(data.name) ){
                return `# ${data.name}`;
            }
            err("Name必須是英文");
        }
    });

    let output = JDA.read(
    `/**
        @class demo
    */`
    );

    //output.text => # demo \n ***

```