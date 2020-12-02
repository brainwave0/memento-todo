var AndroidAlarm = {
  create: function (hour, minutes, message, options) {
    i = intent("android.intent.action.SET_ALARM");
    i.extraInt("android.intent.extra.alarm.HOUR", hour);
    i.extraInt("android.intent.extra.alarm.MINUTES", minutes);
    if (message !== undefined)
      i.extra("android.intent.extra.alarm.MESSAGE", message);
    if (options !== undefined) {
      if (options.days !== undefined)
        i.extraArrayInt("android.intent.extra.alarm.DAYS", options.days);
      if (options.vibrate !== undefined)
        i.extraBool("android.intent.extra.alarm.VIBRATE", options.vibrate);
      if (options.skipUI !== undefined)
        i.extraBool("android.intent.extra.alarm.SKIP_UI", options.skipUI);
    }
    i.send();
  },
  timer: function (length, message, skipUI) {
    i = intent("android.intent.action.SET_TIMER");
    i.extraInt("android.intent.extra.alarm.LENGTH", length);
    if (message !== undefined)
      i.extra("android.intent.extra.alarm.MESSAGE", message);
    if (skipUI !== undefined)
      i.extraBool("android.intent.extra.alarm.SKIP_UI", skipUI);
    i.send();
  },
};
