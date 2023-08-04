document.addEventListener('DOMContentLoaded', function () {
	console.log('Scripts')

	////////////////////////////////
	// Burger
	document.getElementById('burger').addEventListener('click', function () {
		const menu = document.getElementById('burger-menu')
		menu.classList.toggle('show')
	});

	////////////////////////////////
	// Modal
	const closeModalButtons = document.querySelectorAll('.modal-close');

	for (var i = 0; i < closeModalButtons.length; i++) {
		closeModalButtons[i].addEventListener('click', function () {
			const modal = this.closest('.modal')
			if (modal) {
				modal.style.display = 'none'
			}
		})
	}

	/* */

	const showModalButtons = document.querySelectorAll('.show-modal')

	for (let i = 0; i < showModalButtons.length; i++) {
		showModalButtons[i].addEventListener('click', function () {
			const modalId = this.getAttribute('data-modal')
			const modalElement = document.getElementById(modalId)

			if (modalElement) {
				modalElement.style.display = 'block'
			}
		})
	}




	////////////////////////////////
	// Cookie

	const hideCookieNotification = () => {
		document.getElementById('cookie').style.display = 'none'
	}
	
	const acceptCookie = () => {
		localStorage.setItem('cookieAccepted', true)
		hideCookieNotification()
	}
	
	const closeCookieNotification = () => {
		hideCookieNotification()
	}
	
	if (localStorage.getItem('cookieAccepted') !== 'true') {
		document.getElementById('cookie').style.display = 'flex'
	
		document.getElementById('cookie-ok')
			.addEventListener('click', acceptCookie)

		document.getElementById('cookie-close')
			.addEventListener('click', closeCookieNotification)
	}

	/**/

	// const HEADER = 'header'
	// const COMPACT = HEADER + '_compact'

	// const header = document.querySelector('.' + HEADER)

	// const checkScrollPosition = () => {
	// 	if (
	// 		window.hasOwnProperty('scrollY')
	// 		&& window.scrollY > 90
	// 	)
	// 		header.classList.add(COMPACT)
	// 	else
	// 		header.classList.remove(COMPACT)
	// }

	// checkScrollPosition()
	// window.addEventListener('scroll', checkScrollPosition)

	/* */

	const carousel = document.querySelector('.carousel')

	if (carousel) {

		const firstImg = document.querySelectorAll('.carousel section')[0]

		// const arrowIcons = document.querySelectorAll('.carousel-wrapper i')

		let isDragStart = false,
			isDragging = false,
			prevPageX,
			prevScrollLeft,
			positionDiff

		// arrowIcons.forEach((icon) => {
		// 	icon.addEventListener('click', () => {
		// 		let firstImgWidth = firstImg.clientWidth + 14 // getting first img width & adding 14 margin value
		// 		// if clicked icon is left, reduce width value from the carousel scroll left else add to it
		// 		carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth
		// 	})
		// })

		const autoSlide = () => {
			// if there is no image left to scroll then return from here
			if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
				return

			positionDiff = Math.abs(positionDiff) // making positionDiff value to positive
			let firstImgWidth = firstImg.clientWidth + 14
			// getting difference value that needs to add or reduce from carousel left to take middle img center
			let valDifference = firstImgWidth - positionDiff

			if (carousel.scrollLeft > prevScrollLeft) {
				// return console.log('user is scrolling to the right')
				// if user is scrolling to the right
				return (carousel.scrollLeft +=
					positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff)
			}
			//   console.log('user is scrolling to the left')
			// if user is scrolling to the left
			carousel.scrollLeft -=
				positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff
		}

		const dragStart = (e) => {
			// updating global variables value on mouse down event
			isDragStart = true
			prevPageX = e.pageX || e.touches[0].pageX
			prevScrollLeft = carousel.scrollLeft
		}

		const dragging = (e) => {
			// scrolling images/carousel to left according to mouse pointer
			if (!isDragStart) return
			e.preventDefault()
			isDragging = true
			carousel.classList.add('dragging')
			positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX
			carousel.scrollLeft = prevScrollLeft - positionDiff
		}

		const dragStop = () => {
			isDragStart = false
			carousel.classList.remove('dragging')

			if (!isDragging) return
				isDragging = false
				autoSlide()
		}

		carousel.addEventListener('mousedown', dragStart)
		carousel.addEventListener('touchstart', dragStart)

		carousel.addEventListener('mousemove', dragging)
		carousel.addEventListener('touchmove', dragging)

		carousel.addEventListener('mouseup', dragStop)
		carousel.addEventListener('mouseleave', dragStop)
		carousel.addEventListener('touchend', dragStop)

	}

	/**/
	const sections = document.querySelectorAll('.accordion__section')

	if (sections) {

		if (sections.length > 0) {
			sections[0].classList.add('active')
			const firstAnswer = sections[0].querySelector('.accordion__answer')
			firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px'
		}
	
		function collapseAllExceptActive(activeSection) {
			sections.forEach((section) => {
				if (section !== activeSection) {
					section.classList.remove('active')
					section.querySelector('.accordion__answer').style.maxHeight = null
				}
			})
		}
	
		function toggleAccordion() {
			const answer = this.nextElementSibling
			const isActive = this.parentNode.classList.contains('active')
		
			collapseAllExceptActive(this.parentNode)
		
			if (isActive) {
				this.parentNode.classList.remove('active')
				answer.style.maxHeight = null
			} else {
				this.parentNode.classList.add('active')
				answer.style.maxHeight = answer.scrollHeight + 'px'
			}
		}
	
		sections.forEach((section) => {
			const question = section.querySelector('.accordion__question')
			question.addEventListener('click', toggleAccordion)
		})
	}


	////////////////////////////////
	// Timer
	// Дата на следующее 5 либо 15 но только чтобы до следующей даты было более двух дней, наверное.

	const timer = document.getElementById('timer')

	if (timer) {

		const getNextDate = () => {
			const currentDate = new Date()
			const currentMonth = currentDate.getMonth()
			let targetDay = 5
		
			if (currentDate.getDate() > 15) {
				targetDay = 15
				currentMonth += 1
			} else if (currentDate.getDate() <= 5) {
				targetDay = 5
			} else {
				const daysTo5 = 5 - currentDate.getDate()
				const daysTo15 = 15 - currentDate.getDate()
				targetDay = daysTo5 < daysTo15 ? 5 : 15
			}
		
			const targetDate = new Date(currentDate.getFullYear(), currentMonth, targetDay)
		
			targetDate.setDate(targetDate.getDate() + 2)
		
			if (targetDate.getTime() - currentDate.getTime() < 2 * 24 * 60 * 60 * 1000) {
				targetDate.setMonth(targetDate.getMonth() + 1)
			}
		
			return targetDate
		}

		const targetDate = new Date(getNextDate()).getTime()

		function startCountdown() {
			const currentDate = new Date().getTime()

			const timeRemaining = targetDate - currentDate

			const daysElement = document.getElementById("days")
			const hoursElement = document.getElementById("hours")
			const minutesElement = document.getElementById("minutes")
			const secondsElement = document.getElementById("seconds")

			let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
			let hours = Math.floor(
				(timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			)
			let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
			let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

			days = String(days).padStart(2, "0")
			hours = String(hours).padStart(2, "0")
			minutes = String(minutes).padStart(2, "0")
			seconds = String(seconds).padStart(2, "0")

			daysElement.textContent = days
			hoursElement.textContent = hours
			minutesElement.textContent = minutes
			secondsElement.textContent = seconds

		}

		setInterval(startCountdown, 1000)
	}

})