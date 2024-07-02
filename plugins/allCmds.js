
let Cmd = {
    config: {
    name: ["allCmd"],
    Auth: 2,
  },
  run: async (m, { conn, command, args, usedPrefix }) => {
    if(m.key.fromMe) return;
    const prefix = ".";
    const prefixRegex = new RegExp(`^\\${prefix}(.*)`);
    const body = command.replace(prefixRegex, '$1');
    if (prefixRegex.test(command)) {
    if (global.yuejin.cmds.has(body)) {
        const DOM = global.yuejin.cmds.get(body);
        return DOM.onType(m, { conn, command: body, args, text: args.join(" "), usedPrefix });
    } else {
       return m.reply("هذا الامر غير موجود.")
    }
} else {
  // handle event //
  
  for(let event of global.yuejin.events) {
    const cmd = global.yuejin.cmds.get(event);
    
    if (cmd) cmd.xPrefix(m, { conn, text: body , args});

    // handle event //

    if (!m.message.extendedTextMessage) return;
    const Reply = global.yuejin.Reply;
    const indexOfHandle = Reply.findIndex(e => e.ID == m.message.extendedTextMessage.contextInfo.stanzaId);
            if (indexOfHandle < 0) return;
            const indexOfMessage = Reply[indexOfHandle];
            const handleNeedExec = global.yuejin.cmds.get(indexOfMessage.name);
            if (!handleNeedExec) return m.reply("missing value handleReply");
            handleNeedExec.onReply(m, { conn, text: body , args, Reply: indexOfMessage});
  }
}
  }
  };
    export default Cmd