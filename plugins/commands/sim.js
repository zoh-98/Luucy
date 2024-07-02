let sim = {
  config: {
    name: "سيم",
    KJ: ["sim"],
    Owner: "عبدالرحمن",
    Auth: 0,
    Time: 0,
    Info: "سمسم 🐢",
    Class: "ثريدز",
  },

  onType: async function(m, { conn, command, args, usedPrefix }) {
      
    const coj = args.join(" ")
    if (!coj) return m.reply('اكتب شي');
fetch("https://simsimi.vn/web/simtalk", {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-GB,en;q=0.9,fr-MA;q=0.8,fr;q=0.7,en-US;q=0.6",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "Referer": "https://simsimi.vn/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": `text=${coj}&lc=ar&=`,
  "method": "POST"
}).then(async res => {
var data = await res.json();
  var rd = data.success;
  const yo = await m.reply(rd);
  global.yuejin.Reply.push({
    name: this.config.name,
    author: m.sender,
    ID: yo.key.id,
  });
    
  });
},
onReply: async (m, { conn, text , args, Reply}) => {
  fetch("https://simsimi.vn/web/simtalk", {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-GB,en;q=0.9,fr-MA;q=0.8,fr;q=0.7,en-US;q=0.6",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua": "\"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": "\"Android\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "Referer": "https://simsimi.vn/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": `text=${text}&lc=ar&=`,
    "method": "POST"
  }).then(async res => {
  var data = await res.json();
    var rd = data.success;
    const yo = await m.reply(rd);
    global.yuejin.Reply.push({
      name: "سيم",
      author: m.sender,
      ID: yo.key.id,
    });
});
}
};
export default sim;