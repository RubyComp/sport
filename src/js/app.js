document.addEventListener('DOMContentLoaded', function () {
	console.log('Scripts');

	const HEADER = 'header'
	const COMPACT = HEADER + '_compact'

	const header = document.querySelector('.' + HEADER)

	const checkScrollPosition = () => {
		if (
			window.hasOwnProperty('scrollY')
			&& window.scrollY > 90
		)
			header.classList.add(COMPACT)
		else
			header.classList.remove(COMPACT)
	}

	checkScrollPosition()
	window.addEventListener('scroll', checkScrollPosition)

})

