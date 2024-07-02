import sizeOf from 'image-size';
import FormData from 'form-data';
import path from 'path';
let { downloadContentFromMessage } = (await import(global.baileys)).default;

  let upscale = {
  config: {
  name: "جودة",
  Auth: 2,
  Owner: "Gry KJ",
  Info: "رفع جودة",
  Class: "ادوات",
  Hide: false,
  How: "رد عصورة",
  Time: 0
    },

  onType: async (m, { conn, command, args, text, usedPrefix }) => {
    
    
    let si = m.message.extendedTextMessage
 if (!si && !text) {
        return m.reply("رد عا صوره 🙂🚮 او حط رابط");
      }
      let yo;
      if (si) {
      yo = m.message.extendedTextMessage.contextInfo.quotedMessage;
        let no = m.message.extendedTextMessage.contextInfo.quotedMessage.interactiveMessage;
        if (no) {
          yo = m.message.extendedTextMessage.contextInfo.quotedMessage.interactiveMessage.header;
        }
        
      };
  m.react("🫧")
try {
function grn(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ggr = grn(1000000, 999292220822);
const apiUrl = 'https://api.upscalepics.com/upscale-to-size';
let buffer;
if (!yo) {
const imageUrl = args.join(" ");

let ress = await axios.get(imageUrl, { responseType: 'arraybuffer' })
  
     buffer = Buffer.from(ress.data);
} else {
    let type = Object.keys(yo)[0];


let media = await downloadContentFromMessage(yo[type], "image");

 buffer = Buffer.from([]);

for await (const chunk of media) {

buffer = Buffer.concat([buffer, chunk])

};
};
    const dimensions = sizeOf(buffer);

    const formData = new FormData();
    formData.append('image_file', buffer, {
      filename: 'image.jpg',
      contentType: 'image/jpg',
    });
    formData.append('name', ggr);
    formData.append('desiredHeight', dimensions.height*4);
    formData.append('desiredWidth', dimensions.width*4);
    formData.append('outputFormat', 'png');
    formData.append('compressionLevel', 'None');
    formData.append('anime', 'False');

   const res = await axios.post(apiUrl, formData, {
      headers: {
        ...formData.getHeaders(),
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'en-US,en;q=0.9',
                'Origin': 'https://upscalepics.com',
                'Referer': 'https://upscalepics.com/',
                'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
                'Timezone': 'Africa/Cairo',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            }
    })
      
        


const ress = await axios.get(res.data.bgRemoved, {responseType:"arraybuffer"});


 conn.sendFile(m.chat,ress.data , "img.png","♡◄∘ تفضل عزيزي ∘►♡")
  
  
  m.react("✅")

} catch(error) {
    console.log(error)
  m.reply(error)
  m.react("😔")
}
  
  }
  };

  export default upscale;