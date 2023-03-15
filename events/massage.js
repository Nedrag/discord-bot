const {Events} = require("discord.js");
const { execute } = require("./ready");
const COMMAND_PREFIX = '$';
const ROLES = ['inInstance', 'AFK'];

function checkValidChannel(channels, name)
{
    for(const channel of channels)
    {
        //if(!channel.isTextBased()) continue;//Da mozes da napravi isto ime kao voice channel
        //console.log(`TESTING => ${channel.name}`);
        if(channel.name.toUpperCase() == name.toUpperCase())//Ako postoji
        {
            //console.log(`${name} alredy exists...`);
            return false;
        }
        //console.log(`Comparing ${channel.name.toUpperCase()} <=> ${name.toUpperCase()}`);
        
    }
    return true;
}

function handleCreateInstance(guild, channels, name, author)
{
    
    if(!checkValidChannel(channels, name)){return;} // valid
    else{guild.channels.create({'name' : name, 'reason' : 'New Dungeon instance', 'type' : 0, 'position' : 0, 'user_limit' : 1});}//Napravi kanal za instance
    
    
    let ch = guild.channels.cache.find(channel => channel.name === name);//Trazi kanal
    //console.log('Channel found! ', ch.name, ch.id);
    ch.permissionOverwrites.create(author, {SendMessages: false}).then(console.log("ok")).catch(console.error);

    //console.log("Uspesno!"); 
    return true;


}
async function resolveRole(members, roles, uniqueRoleId)
{
    roles.create({name: `${uniqueRoleId}`, color: 'Green'});//Pravi role sa unique id
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));//Sacekaj da se napravi
    wait(0.5 * 1000)//Cekaj da napravi pa onda handle roles
    .then(() => handleRoles(members, roles, uniqueRoleId))
    return;//Trazi role
}

async function handleRoles(members,roles,uniqueRoleId)
{
    let role = roles.cache.find(r => r.name === `${uniqueRoleId}`)
    if(!role){console.log("role not found"); return;}

    for(member of members)
    {
        if(member.id != uniqueRoleId) continue;//Dodaje role samo onome ko je pozvao komandu
        //console.log(`ID : ${member.user.id}, NAME: ${member.displayName}`); 
        if( member.roles.cache.find(r => r.name === role.name)) return;
        await member.roles.add(role).catch(console.error);//Dodaje role 
    }
}

module.exports = 
{
    name: Events.MessageCreate,
    async execute(interaction)
    {
        if(!(interaction.content.charAt(0) === COMMAND_PREFIX)) return; // Checks if command
        await interaction.guild.members.list().then(
            member => resolveRole(member.values(), interaction.guild.roles, interaction.author)
        )

        interaction.guild.channels.fetch().then(
            channels => {
                switch(interaction.content.toUpperCase()){
                    case "$CREATEINSATNCE":
                    case "$CI"://Alternative za komandu
                    handleCreateInstance(interaction.guild,channels.values(), "" + interaction.author, interaction.author);//Neki weird ass interaction, mora ovako da bih bio string

                    
                    break;
                    
                } 
            }
        )


    }

}
