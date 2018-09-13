let JDA = new JsdocArtist;

JDA.settingBlock('***');

JDA.register( "member",{
    help : "",
    temp : [ "type", "name", "desc" ],
    output : function(data){
        return `# ${data.name}`;
    }
});

JDA.register( "class",{
    help : "",
    temp : ["name"],
    output : function(data){
        return `## ${data.name}`;
    }
});

JDA.register( "function",{
    help : "",
    temp : ["func"],
    output : function(data){
        return `### ${data.func}`;
    }
});

JDA.register( "desc",{
    help : "",
    temp : ["text"],
    output : function(data){
        return data.text;
    }
});
