const { ref, onMounted, computed } = Vue;
import $to from '../assets/await-to-js.js';
import * as deviceApi from '../apis/deviceApi.js';
const { useOsTheme, darkTheme, lightTheme, createDiscreteApi } = naive;
export function useVideoWallpaperLoop() {
	const osThemeRef = useOsTheme()
	const configProviderPropsRef = computed(() => ({
		theme: osThemeRef === 'dark' ? darkTheme : lightTheme
	}))

	const { message, modal } = createDiscreteApi(['message', 'modal'], {
		configProviderProps: configProviderPropsRef,
	});

	const change = async () => {
        const [setHomeVideoWallpaperLoopErr,setHomeVideoWallpaperLoopRes] = await $to(deviceApi.setHomeVideoWallpaperLoop())
        if (setHomeVideoWallpaperLoopErr) {
            modal.create({
                title: '设置桌面壁纸循环播放失败',
                type: 'error',
                preset: 'dialog',
                content: '发生异常错误，设置动态壁纸循环播放失败QwQ~',
            });
            return;
        }
        const [setLockVideoWallpaperLoopErr,setLockVideoWallpaperLoopRes] = await $to(deviceApi.setLockVideoWallpaperLoop())
        if (setLockVideoWallpaperLoopErr) {
            modal.create({
                title: '设置锁屏壁纸循环播放失败',
                type: 'error',
                preset: 'dialog',
                content: '发生异常错误，设置动态壁纸循环播放失败QwQ~',
            });
            return;
        }
        modal.create({
            title: '设置循环播放成功',
            type: 'success',
            preset: 'dialog',
			content: '好耶w，已经成功动态壁纸循环播放~实际生效还需要重启壁纸的作用域，确定要继续吗？',
            positiveText: '确定重启作用域',
            negativeText: '稍后手动重启',
            onPositiveClick() {
                deviceApi
                    .killMiWallpaper()
                    .then(async res => {
                        modal.create({
                            title: '重启作用域成功',
                            type: 'success',
                            preset: 'dialog',
                            content: '已经成功为你重启对应的作用域，请查看是否生效~',
                        });
                    })
                    .catch(err => {
                        modal.create({
                            title: '重启作用域失败',
                            type: 'error',
                            preset: 'dialog',
                            content: '发生异常错误，重启壁纸作用域失败QwQ~',
                        });
                    });
            },
        });
    }

	return {
		change
	};
}
