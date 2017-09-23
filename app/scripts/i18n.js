/* © 2017 int3ractive.com
 * @author Thanh
 */

import Polyglot from 'polyglot';

const messages = {
	en: {
		settings: 'Settings',
		wallpaper_mode: 'Wallpaper Mode',
		your_photo: 'Your Photo',
		choose_file: 'Choose a file',
		quick_links: 'Quick Links',
		oss_notice: 'Open source under Apache License v2.0',
		good_morning: 'Good morning',
		good_afternoon: 'Good afternoon',
		good_evening: 'Good evening',
		good_night: 'Please go to bed early',
	},

	vi: {
		settings: 'Cài đặt',
		wallpaper_mode: 'Chế độ wallpaper',
		your_photo: 'Ảnh của bạn',
		choose_file: 'Chọn ảnh từ máy',
		quick_links: 'Liên kết nhanh',
		oss_notice: 'Mã nguồn mở dưới giấy phép Apache v2.0',
		good_morning: 'Chào buổi sáng',
		good_afternoon: 'Chào buổi chiều',
		good_evening: 'Chào buổi tối',
		good_night: 'Ngủ sớm nhé',
	},
};

let polyglot;

/**
 * The i18n object for system to manage translations
 */
export const i18n = {
	init(language) {
		console.log('i18n language:', language);
		polyglot = new Polyglot({ phrases: messages[language] });
	},

	switchLocale(language) {
		polyglot.extend(messages[language]);
	},
};

/**
 * The main translate function of this module
 *
 * @export
 * @param {any} args
 */
export function t(...args) {
	return polyglot.t.apply(polyglot, args);
}
