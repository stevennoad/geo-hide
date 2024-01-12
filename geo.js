<script>
	window.addEventListener('DOMContentLoaded', function () {
		geoip2.country(
			function (geoipResponse) {
				var isoCode = geoipResponse.country.iso_code;
				var ukBoxes = document.querySelectorAll('.uk');
				var euroBoxes = document.querySelectorAll('.euro');

				ukBoxes.forEach(function (uk, index) {
					var euro = euroBoxes[index];

					if (isoCode === 'GB') {
						uk.classList.remove('hidden');
						euro.classList.add('hidden');
					} else {
						uk.classList.add('hidden');
						euro.classList.remove('hidden');
					}
				});
			},
			function (error) {
				console.log('An error occurred. Please try again.');
			}
		);
	});
</script>
