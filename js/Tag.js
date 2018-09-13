class Tag extends ModuleBase {

    constructor( name, head ){
        super("Tag");
        this.name = name;
        this.validate( "help", head.help, "", false );
        this.validate( "temp", head.temp, [], false );
        this.validate( "output", head.output, ()=>{}, true );
    }

    /**
     * @function validate(name,data,request,required)
     * @desc 驗證參數，驗證通過後變成自己的物件
     */

    validate( name, data, request, required ){
        if( required && data == null ){
            this.systemError("validate", `Tag ${name} must required`);
        }
        if( typeof data !== typeof request ){
            this.systemError("validate", `Tag ${name} type must a ${typeof request}`, data);
        }
        this[name] = data == null ? request : data;
    }

    getNewData( name, text, line, params ){
        return {
            error : null,
            output : {},
            params : JSON.parse(JSON.stringify(params)),
            text : text,
            line : line,
            name : name,
            data : {},
        }
    }

    read( name, text, params, line ){
        let data = this.getNewData( name, text, line, params );
        for( let i = 0; i < this.temp.length ; i++ ){
            if( data.params[i] ){
                data.data[this.temp[i]] = i === this.temp.length - 1 ? params.join(" ") : params.shift();
            }else{
                data.error = `Params ${this.temp[i]} not found`;
            }
        }
        data.output = this.output( data.data, this.error.bind(data) );
        return data;
    }

    error(message){
        this.error = message;
    }

}