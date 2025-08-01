const elesToSaveData = [
  // Inputs
  {
    id: "#website-password",
    type: "input",
    settingIds: ["server-website", "server-password"],
  },
  {
    id: "#server-name",
    type: "input",
    settingIds: ["server-name"],
  },
  {
    id: "#playlist-code",
    type: "input",
    settingIds: ["playlist-code"],
  },
  {
    id: "#host-device-name",
    type: "input",
    settingIds: ["host-device-name"],
  },
  {
    id: "#host-name",
    type: "input",
    settingIds: ["host-name"],
  },
  {
    id: "#first-join-msg",
    type: "input",
    settingIds: ["first-time-join-msg"],
  },
  {
    id: "#kick-msg",
    type: "input",
    settingIds: ["warns", "after-warn-kick-msg"],
  },
  {
    id: "#coop-level",
    type: "input",
    settingIds: ["coop", "level"],
  },
  {
    id: "#coop-campaign",
    type: "input",
    settingIds: ["coop", "campaign"],
  },
  {
    id: "#first-team-name",
    type: "input",
    settingIds: ["teams", 0, "name"],
  },
  {
    id: "#second-team-name",
    type: "input",
    settingIds: ["teams", 1, "name"],
  },
  {
    id: "#message-1",
    type: "input",
    settingIds: ["screen-msgs", "message-1"],
  },
  {
    id: "#message-2",
    type: "input",
    settingIds: ["screen-msgs", "message-2"],
  },
  {
    id: "#message-3",
    type: "input",
    settingIds: ["screen-msgs", "message-3"],
  },
  {
    id: "#message-4",
    type: "input",
    settingIds: ["screen-msgs", "message-4"],
  },
  {
    id: "#message-5",
    type: "input",
    settingIds: ["screen-msgs", "message-5"],
  },
  {
    id: "#message-6",
    type: "input",
    settingIds: ["screen-msgs", "message-6"],
  },
  {
    id: "#message-7",
    type: "input",
    settingIds: ["screen-msgs", "message-7"],
  },
  {
    id: "#message-8",
    type: "input",
    settingIds: ["screen-msgs", "message-8"],
  },
  {
    id: "#warn-msg",
    type: "input",
    settingIds: ["warns", "warn-msg"],
  },
  {
    id: "#regular-welcome-msg",
    type: "input",
    settingIds: ["regular-welcome-msg"],
  },
  // Switches
  {
    id: "#in-game-chat",
    type: "switch",
    settingIds: ["in-game-chat"],
  },
  {
    id: "#public-party",
    type: "switch",
    settingIds: ["public-party"],
  },
  {
    id: "#playlist-shuffle",
    type: "switch",
    settingIds: ["playlist-shuffle"],
  },
  {
    id: "#team-chat",
    type: "switch",
    settingIds: ["team-chat"],
  },
  {
    id: "#votes",
    type: "switch",
    settingIds: ["voting", "enable"],
  },
  {
    id: "#default-kick-voting",
    type: "switch",
    settingIds: ["voting", "default-kick-voting"],
  },
  {
    id: "#queue",
    type: "switch",
    settingIds: ["queue"],
  },
  {
    id: "#telnet",
    type: "switch",
    settingIds: ["telnet"],
  },
  {
    id: "#character-chooser",
    type: "switch",
    settingIds: ["character-chooser"],
  },
  {
    id: "#colorful-explosion",
    type: "switch",
    settingIds: ["colorful-explosion"],
  },
  {
    id: "#auto-team-balance",
    type: "switch",
    settingIds: ["auto-team-balance"],
  },
  {
    id: "#colorful-maps",
    type: "switch",
    settingIds: ["colorful-maps"],
  },

  {
    id: "#contribute-data",
    type: "switch",
    settingIds: ["contribute-data"],
  },
  {
    id: "#hit-text",
    type: "switch",
    settingIds: ["hit-text"],
  },
  {
    id: "#tag-animation",
    type: "switch",
    settingIds: ["tag-animation"],
  },
  {
    id: "#top-5-effects",
    type: "switch",
    settingIds: ["top-5-effect"],
  },
  {
    id: "#effects",
    type: "switch",
    settingIds: ["effects"],
  },
  {
    id: "#hp-tag",
    type: "switch",
    settingIds: ["hp-tag"],
  },
  {
    id: "#rank",
    type: "switch",
    settingIds: ["rank"],
  },
  {
    id: "#stats",
    type: "switch",
    settingIds: ["stats"],
  },
  {
    id: "#auth-clients",
    type: "switch",
    settingIds: ["auth-clients"],
  },
  {
    id: "#anti-id-revealer",
    type: "switch",
    settingIds: ["anti-id-revealer"],
  },
  {
    id: "#show-kick-vote-starter-name",
    type: "switch",
    settingIds: ["voting", "show-kick-vote-starter-name"],
  },
  {
    id: "#stumbled-score-screen",
    type: "switch",
    settingIds: ["stumbled-score-screen"],
  },
  {
    id: "#chat-commands",
    type: "switch",
    settingIds: ["chat-commands"],
  },
  {
    id: "#tags",
    type: "switch",
    settingIds: ["tags"],
  },
  {
    id: "#score-screen-announcement",
    type: "switch",
    settingIds: ["screen-msgs", "enable"],
  },
  {
    id: "#afk-remove",
    type: "switch",
    settingIds: ["afk-settings", "afk-remove"],
  },
  {
    id: "#kick-from-lobby",
    type: "switch",
    settingIds: ["afk-settings", "kick-idle-from-lobby"],
  },
  {
    id: "#fireflies",
    type: "switch",
    settingIds: ["auto-night", "fireflies"],
  },
  {
    id: "#random-fireflies",
    type: "switch",
    settingIds: ["auto-night", "random-fireflies"],
  },
  {
    id: "#srv-website",
    type: "switch",
    settingIds: ["server-website", "enable"],
  },
  {
    id: "#coop",
    type: "switch",
    settingIds: ["coop", "enable"],
  },
  {
    id: "#web-hook",
    type: "switch",
    settingIds: ["hook", "discord-hook"],
  },
  {
    id: "#discord-bot",
    type: "switch",
    settingIds: ["discord-bot", "enable"],
  },
  {
    id: "#discord-bot-live-chat",
    type: "switch",
    settingIds: ["discord-bot", "live-chat"],
  },
  {
    id: "#powerups",
    type: "switch",
    settingIds: ["powerups", "enable"],
  },
  {
    id: "#powerups-shield",
    type: "switch",
    settingIds: ["powerups", "powerup-shield"],
  },
  {
    id: "#powerups-name",
    type: "switch",
    settingIds: ["powerups", "powerup-name"],
  },
  {
    id: "#powerups-time",
    type: "switch",
    settingIds: ["powerups", "powerups-time"],
  },
  {
    id: "#powerups-gravity",
    type: "switch",
    settingIds: ["powerups", "powerup-gravity"],
  },
  {
    id: "#leader-board",
    type: "switch",
    settingIds: ["leader-board", "enable"],
  },
  {
    id: "#leader-board-bars",
    type: "switch",
    settingIds: ["leader-board", "bars-behind-names"],
  },
  {
    id: "#mikirog",
    type: "switch",
    settingIds: ["mikirog"],
  },
  {
    id: "#new-result-board",
    type: "switch",
    settingIds: ["new-result-board"],
  },
  {
    id: "#gloves",
    type: "switch",
    settingIds: ["player-mod", "default-gloves"],
  },
  {
    id: "#shield",
    type: "switch",
    settingIds: ["player-mod", "default-shield"],
  },
  {
    id: "#same-char-for-team",
    type: "switch",
    settingIds: ["same-character-for-team"],
  },
  {
    id: "#white-list",
    type: "switch",
    settingIds: ["white-list"],
  },
  {
    id: "#use-v2-account",
    type: "switch",
    settingIds: ["use-v2-account"],
  },
  // Numbers Choosers
  {
    id: "#max-party-size",
    type: "number-chooser",
    settingIds: ["party-size"],
  },
  {
    id: "#ffa-series-length",
    type: "number-chooser",
    settingIds: ["ffa-series-length"],
  },
  {
    id: "#clean-exit-time",
    type: "number-chooser",
    settingIds: ["clean-exit-time"],
  },

  {
    id: "#warn-cooldown-time",
    type: "number-chooser",
    settingIds: ["warns", "warn-cooldown-time"],
  },
  {
    id: "#in-game-idle",
    type: "number-chooser",
    settingIds: ["afk-settings", "in-game-idle"],
  },
  {
    id: "#lobby-idle",
    type: "number-chooser",
    settingIds: ["afk-settings", "lobby-idle"],
  },
  {
    id: "#min-player-to-exit-coop",
    type: "number-chooser",
    settingIds: ["coop", "min-players-to-exit"],
  },
  {
    id: "#health-damage",
    type: "number-chooser",
    settingIds: ["powerups", "health-shield-ptg"],
  },
  {
    id: "#powerups-scale",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-scale"],
  },
  {
    id: "#curse-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "curse"],
  },
  {
    id: "#fire-bomb-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "fire-bomb"],
  },
  {
    id: "#fly-bomb-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "fly-bomb"],
  },
  {
    id: "#goodbye-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "goodbye"],
  },
  {
    id: "#healing-bomb-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "healing-bomb"],
  },
  {
    id: "#health-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "health"],
  },
  {
    id: "#ice-bomb-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "ice-bomb"],
  },
  {
    id: "#ice-man-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "ice-man"],
  },
  {
    id: "#impact-bomb-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "impact-bomb"],
  },
  {
    id: "#expansive-bomb-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "expansive-bomb"],
  },
  {
    id: "#mine-bomb-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "mine-bomb"],
  },
  {
    id: "#punch-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "punch"],
  },
  {
    id: "#shield-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "shield"],
  },
  {
    id: "#speed-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "speed"],
  },
  {
    id: "#sticky-bomb-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "sticky-bomb"],
  },
  {
    id: "#tank-shield-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "tank-shield"],
  },
  {
    id: "#triple-bomb-quantity",
    type: "number-chooser",
    settingIds: ["powerups", "powerups-quantity", "triple-bomb"],
  },
  {
    id: "#max-accounts-per-id",
    type: "number-chooser",
    settingIds: ["max-accounts-per-id"],
  },
  {
    id: "#max-players-per-device",
    type: "number-chooser",
    settingIds: ["max-players-per-device"],
  },
  {
    id: "#max-warn-count",
    type: "number-chooser",
    settingIds: ["warns", "max-warn-count"],
  },
  {
    id: "#min-age-to-chat",
    type: "number-chooser",
    settingIds: ["min-age-to-chat"],
  },
  {
    id: "#default-bomb-count",
    type: "number-chooser",
    settingIds: ["player-mod", "default-bomb-count"],
  },
  {
    id: "#stats-reset",
    type: "number-chooser",
    settingIds: ["stats-reset-after"],
  },
  // Color Choosers
  {
    id: "#first-team-color",
    type: "color-chooser",
    settingIds: ["teams", 0, "color"],
  },
  {
    id: "#second-team-color",
    type: "color-chooser",
    settingIds: ["teams", 1, "color"],
  },
  // Time Choosers
  {
    id: "#start-time-auto-night",
    type: "time-chooser",
    settingIds: ["auto-night", "auto-night-start"],
  },
  {
    id: "#end-time-auto-night",
    type: "time-chooser",
    settingIds: ["auto-night", "auto-night-end"],
  },
];

const radioElesToSaveData = [
  {
    group: "default-bomb",
    settingIds: ["player-mod", "default-bomb"],
    elesSelector: "data-bombname",
  },
];

const roles = [
  "owner",
  "co-owner",
  "lead-staff",
  "moderator",
  "trial-moderator",
  "senior-complain-staff",
  "complain-staff",
  "trial-complain-staff",
  "admin",
  "vip",
];

export { elesToSaveData, radioElesToSaveData , roles };
