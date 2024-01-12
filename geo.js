<script>
	window.addEventListener('DOMContentLoaded', function () {
		const storedData = JSON.parse(localStorage.getItem('geo-hide'));

		if (storedData && isNotExpired(storedData.timestamp)) {
			showHideClasses(storedData.isoCode);
		} else {
			geoip2.country(
				function (geoipResponse) {
					const isoCode = geoipResponse.country.iso_code;
					const dataToStore = {
						isoCode: isoCode,
						timestamp: Date.now()
					};

					localStorage.setItem('geo-hide', JSON.stringify(dataToStore));
					showHideClasses(isoCode);
				},
				function (error) {
					console.log('An error occurred. Please try again.');
				}
			);
		}
	});

	function isNotExpired(timestamp) {
		return Date.now() - timestamp < 30 * 24 * 60 * 60 * 1000;
	}

	function showHideClasses(isoCode) {
		const isUk = document.querySelectorAll('.uk');
		const isEuro = document.querySelectorAll('.euro');

		isUk.forEach(function (uk, index) {
			const euro = isEuro[index];

			if (isoCode === 'GB') {
				uk.classList.remove('hidden');
				euro.classList.add('hidden');
			} else {
				uk.classList.add('hidden');
				euro.classList.remove('hidden');
			}
		});
	}
</script>
