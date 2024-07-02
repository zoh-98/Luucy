let Cmd = {
  config: {
  name: "eval",
  Auth: 2,
  Owner: "Gry KJ",
  Info: "خاص بزهير",
  Class: "المطور",
  Hide: true,
  How: "eval cmd",
  Time: 0
  },
  onType: async (m, { conn, command,  args, usedPrefix }) => {
    if (!args.join(" ")) return m.reply("❌ اكتب شيئا.");
      try {
      function output(msg) {
          if (typeof msg == "number" || typeof msg == "boolean" || typeof msg == "function")
            msg = msg.toString();
          else if (msg instanceof Map) {
            let text = `Map(${msg.size}) `;
            text += JSON.stringify(mapToObj(msg), null, 2);
            msg = text;
          }
          else if (typeof msg == "object")
            msg = JSON.stringify(msg, null, 2);
          else if (typeof msg == "undefined")
            msg = "undefined";
    
          m.reply(msg);
        }
        function out(msg) {
          output(msg);
        }
        function mapToObj(map) {
          const obj = {};
          map.forEach(function (v, k) {
            obj[k] = v;
          });
          return obj;
        }
        const cmd = `
        (async () => {
          try {
            ${args.join(" ")}
          }
          catch(err) {
            console.log("eval command", err.message);
            out(err.message);
    
            }
        })()`;
        eval(cmd);
      } catch (err) {
        console.log(err);
        out(err);
      }
    },
    xPrefix: async (m, { conn, text }) => {
      if(text == "test") {
        m.reply("handle event work")
      }
    }
  };
    
    
    export default Cmd