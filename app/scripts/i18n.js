
(function() {
	'use strict';

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
		}
	};


	nau.define('i18n', {

		init(language) {
			console.log('i18n language:', language);
			let polyglot = this.polyglot = new Polyglot({ phrases: messages[language] });

			// define a shortcut function nau.t
			nau.define('t', polyglot.t.bind(polyglot));
		},

		switchLocale(language) {
			this.polyglot.extend(messages[language]);
		}

	});
})();
