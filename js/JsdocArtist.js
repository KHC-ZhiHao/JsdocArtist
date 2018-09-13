class JsdocArtist extends ModuleBase {

    constructor(){
        super("JsdocArtist");
        this.tags = {};
        this.block = null;
        this.injsdoc = false;
    }

    /**
     * @function register(data)
     * @desc 註冊一個tag
     */

    register( name, data ){
        if( this.tags[name] == null ){
            this.tags[name] = new Tag( name, data );
        }else{
            this.systemError( "useTags", "Tag name is conflict or no name.", name );
        }
    }

    /**
     * @function settingBlock(text)
     * @desc 設置遭遇區塊所顯示的文字
     */

    settingBlock(text){
        if( typeof text === "string" ){
            this.block = text;
        }else{
            this.systemError("settingBlock", "Value only string", text);
        }
    }

    /**
     * @function getInJSDoc(output,text)
     * @desc 判斷是否存在於JSDOC的範圍內
     */

    getInJSDoc( output, text ){
        let t = text.trim();
        if( t === "/**" && !this.injsdoc ){
            this.injsdoc = true;
            return false;
        }
        if( t === "*/" && this.injsdoc ){
            if( this.block ){
                output.data.push(this.block);
            }
            this.injsdoc = false;
        }
        return this.injsdoc;
    }

    /**
     * @function readTag(out,text,line)
     * @desc 讀取一串文字並解析成tag
     */

    readTag( output, text, line ){
        let params = text.slice( text.indexOf("@") + 1 ).split(" ").filter((t)=>{
            return t.trim() !== "";
        });
        let name = params.shift();
        if( this.tags[name] != null ){
            let tag = this.tags[name].read( name, text, params, line );
            if( tag.error ){
                output.error.push(tag);
            }else{
                output.data.push(tag);
            }
        }else{
            output.miss.push({
                name : name,
                line : line,
                text : text,
            });
        }
    }

    /**
     * @function read(text,callback)
     * @desc 讀取一個文本
     */

    read(text){
        if( typeof text === "string" ){
            let line = text.split('\n');
            let len = line.length;
            let output = this.getOutputBase();
            this.injsdoc = false;
            for( let i = 0 ; i < len ; i++ ){
                if( this.getInJSDoc( output, line[i] ) && line[i].match("@") ){
                    this.readTag( output, line[i], i );
                }
            }
            for( let i = 0 ; i < output.data.length ; i++ ){
                output.text += (typeof output.data[i] === "string" ? output.data[i] : output.data[i].output) + "\n";
            }
            return output;
        }else{
            this.systemError( "read", "Text must a string", text );
        }
    }

    /**
     * @function getOutputBase()
     * @desc 獲取輸出物件的型態
     */

    getOutputBase(){
        return {
            text : "",
            data : [],
            miss : [],
            error : [],
        }
    }

}