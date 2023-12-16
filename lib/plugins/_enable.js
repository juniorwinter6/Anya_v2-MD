module.exports = {
    cmdName: () => ({
      name: ['enable', 'disable'],
      alias: [],
      react: '🎀',
      category: 'owner',
      desc: 'Enable/disable initial Bot settings'
    }),
    getCommand: async (userOwner, userSudo, userAdmin, command, prefix, pika, args, Bot, Group) => {
      const Config = require('../../config');
      
      const selection = `
  *✦» Type ${prefix + command} autostatus*
  _- Bot will automatically see the status of the contacts_
  
  *✦» Type ${prefix + command} alwaysonline*
  _- Bot will always be online_
  
  *✦» Type ${prefix + command} autoread*
  _- Bot will always mark messages as read_
  
  *✦» Type ${prefix + command} autotyping*
  _- Bot will send presence as typing while replying_
  
  *✦» Type ${prefix + command} reactmsg*
  _- Bot will react to every message if enabled_
  
  *✦» Type ${prefix + command} react*
  _- Bot will react to every cmd if enabled_
  
  *✦» Type ${prefix + command} anticall*
  _- No one will be able to call Bot if enabled_
  
  *✦» Type ${prefix + command} chatbot*
  _- Chatbot will be enabled if enabled_
  
  *✦» Type ${prefix + command} welcome*
  _- Bot will send welcome messages to new group members_
  
  *✦» Type ${prefix + command} goodbye*
  _- Bot will send goodbye messages for leaving members_
  
  *✦» Type ${prefix + command} pdm*
  _- Bot will send promote/demote messages when someone get promoted/demoted in groups_
  
  *✦» Type ${prefix + command} events*
  _- Bot will send group settings changes messages in groups_
  
  *✦» Type ${prefix + command} antilink*
  _- No one will be able to send links in this group if enabled_
  
  *✦» Type ${prefix + command} antibad*
  _- No one will be able to send badwords in this group if enabled_
  
  *✦» Type ${prefix + command} antipic*
  _- No one will be able to send pictures in this group if enabled_
  
  *✦» Type ${prefix + command} antivideo*
  _- No one will be able to send videos in this group if enabled_
  
  *✦» Type ${prefix + command} nsfw*
  _- Everyone will be able to use nsfw commands in groups if enabled_
  `;
  
      /**
       * Enable initial Bot settings
       * @param {string} args[0] - Settings name
       * @returns {Boolean} - Returns true if enabled / Return false if disable
       * {@creator: https://github.com/PikaBotz}
       */
        switch (args[0]) {
          case 'autostatus':
            Bot.set('autoStatusRead', /enable/.test(command) ? true : false)
            .then((res) => response(res.status, `_Already ${command}d automatic status seen._`));
            break;
          case 'alwaysonline':
            Bot.set('alwaysOnline', /enable/.test(command) ? true : false)
            .then((res) => response(res.status, `_Already ${command}d always online seen for bot._`));
            break;
          case 'autoread':
            Bot.set('autoMsgRead', /enable/.test(command) ? true : false)
            .then((res) => response(res.status, `_Already ${command}d automatic message read._`));
            break;
          case 'autotyping':
            Bot.set('autoTyping', /enable/.test(command) ? true : false)
            .then((res) => response(res.status, `_Already ${command}d automatic typing while replying._`));
            break;
          case 'reactmsg':
            Bot.set('autoReactMsg', /enable/.test(command) ? true : false)
            .then((res) => response(res.status, `_Already ${command}d automatic message reacting._`))
            .then(() => {
              if (/enable/.test(command)) {
                Bot.set('react', false).then(() => pika.reply('_🧩 Automatically disabled command reaction if enabled, to avoid spamming_'));
              }
            });
            break;
          case 'react':
            Bot.set('react', /enable/.test(command) ? true : false)
            .then((res) => response(res.status, `_Already ${command}d react 🎀_`))
            .then(() => {
              if (/enable/.test(command)) {
                Bot.set('autoReactMsg', false).then(() => pika.reply('_🧩 Automatically disabled reaction for every message if enabled, to avoid spamming_'));
              }
            });
            break;
          case 'anticall':
            Bot.set('anticall', /enable/.test(command) ? true : false)
            .then((res) => response(res.status, `_Already ${command}d anti-call 📵_`));
            break;
          case 'chatbot':
            Bot.set('chatbot', /enable/.test(command) ? true : false)
            .then((res) => response(res.status, `_Already ${command}d chatbot 🤖_`));
            break;
          case 'welcome':
            Bot.set('welcome', /enable/.test(command) ? true : false)
            .then((res) => response(res.status, `_Already ${command}d welcome message 🎉_`));
            break;
          case 'goodbye':
            Bot.set('goodbye', /enable/.test(command) ? true : false)
            .then((res) => response(res.status, `_Already ${command}d goodbye message 👋🏻_`));
            break;
          case 'pdm':
            Bot.set('promote', /enable/.test(command) ? true : false).then(() => Bot.set('demote', /enable/.test(command) ? true : false))
            .then((res) => response(res.status, `_Already ${command}d promote/demote message 🎉_`));
            break;
          case 'events':
            Bot.set('events', /enable/.test(command) ? true : false)
            .then((res) => response(res.status, `_Already ${command}d events message of group 🎉_`));
            break;
          case 'antilink':
            Group.set(pika.chat, 'antilink', /enable/.test(command) ? true : false)
            .then((res) => responseGrp(res.status, `_Already ${command}d anti-link 🔗 in this group._`));
            break;
          case 'antibad':
            Group.set(pika.chat, 'antitoxic', /enable/.test(command) ? true : false)
            .then((res) => responseGrp(res.status, `_Already ${command}d anti-badword ☣️ in this group._`));
            break;
          case 'antipic':
            Group.set(pika.chat, 'antipicture', /enable/.test(command) ? true : false)
            .then((res) => responseGrp(res.status, `_Already ${command}d anti-picture 🖼️ in this group._`));
            break;
          case 'antivideo':
            Group.set(pika.chat, 'antivideo', /enable/.test(command) ? true : false)
            .then((res) => responseGrp(res.status, `_Already ${command}d anti-video 🎥 in this group._`));
            break;
          case 'nsfw':
            Group.set(pika.chat, 'nsfw', /enable/.test(command) ? true : false)
            .then((res) => responseGrp(res.status, `_Already ${command}d nsfw 🍑 in this group._`));
            break;
          default:
            pika.reply(selection);
            break;
          }
          
    function responseGrp(code, message) {
     if (!pika.isGroup) return pika.reply(Config.message.group);
     if (!userOwner && !userSudo && !userAdmin) return pika.reply(Config.message.admin);
      if (code === 200) return pika.reply(Config.message.success);
      if (code === 208) return pika.reply(message);
      if (code === 500) return pika.reply(Config.message.error);
    }
  
    function response(code, message) {
     if (!userOwner && !userSudo) return pika.reply(Config.message.owner);
     if (code === 200) return pika.reply(Config.message.success);
     if (code === 208) return pika.reply(message);
     if (code === 500) return pika.reply(Config.message.error);
      }
    }
  }
  
