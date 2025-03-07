import { exec } from "../assets/kernelsu/index.js";
import webConfig from "../web.config.js";

export const openAiWallpaperList = () => {
  const shellCommon = `am start 'intent://settings/#Intent;action=android.intent.action.VIEW;launchFlags=0x14400000;component=com.android.thememanager/.activity.ai.AiWallpaperListActivity;end'`;
  return new Promise(async (resolve, reject) => {
    if (webConfig.env === "dev") {
      resolve(`am start command executed successfully.`);
    } else {
      const { errno, stdout, stderr } = await exec(shellCommon);
      errno ? reject(stderr) : resolve(stdout);
    }
  });
};

export const setHomeVideoWallpaperLoop = () => {
  const shellCommon = `sed -i 's/loopVideo="false"/loopVideo="true"/g' /data/system/theme_magic/users/0/wallpaper/data/home.xml`;
  return new Promise(async (resolve, reject) => {
    if (webConfig.env === "dev") {
      resolve(`success`);
    } else {
      const { errno, stdout, stderr } = await exec(shellCommon);
      errno ? reject(stderr) : resolve(stdout);
    }
  });
};

export const setLockVideoWallpaperLoop = () => {
  const shellCommon = `sed -i 's/loopVideo="false"/loopVideo="true"/g' /data/system/theme_magic/users/0/wallpaper/data/lock.xml`;
  return new Promise(async (resolve, reject) => {
    if (webConfig.env === "dev") {
      resolve(`success`);
    } else {
      const { errno, stdout, stderr } = await exec(shellCommon);
      errno ? reject(stderr) : resolve(stdout);
    }
  });
};

export const killMiWallpaper = () => {
  const shellCommon = `pkill -9 -f com.miui.miwallpaper && echo "kill command executed successfully." || echo "kill command failed."`;
  return new Promise(async (resolve, reject) => {
    if (webConfig.env === "dev") {
      resolve(`kill command executed successfully.`);
    } else {
      const { errno, stdout, stderr } = await exec(shellCommon);
      errno
        ? reject(stderr)
        : stdout === "kill command executed successfully."
        ? resolve(stdout)
        : reject(stdout);
    }
  });
};
