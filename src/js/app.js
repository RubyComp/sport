document.addEventListener('DOMContentLoaded', function () {
	console.log('Scripts');

	/**/

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

	/* */

	const carousel = document.querySelector('.carousel');

	if (carousel) {

		const firstImg = document.querySelectorAll('.carousel section')[0]

		// const arrowIcons = document.querySelectorAll('.carousel-wrapper i');

		let isDragStart = false,
			isDragging = false,
			prevPageX,
			prevScrollLeft,
			positionDiff;

		// arrowIcons.forEach((icon) => {
		// 	icon.addEventListener('click', () => {
		// 		let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
		// 		// if clicked icon is left, reduce width value from the carousel scroll left else add to it
		// 		carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth;
		// 	});
		// });

		const autoSlide = () => {
			// if there is no image left to scroll then return from here
			if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
				return;

			positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
			let firstImgWidth = firstImg.clientWidth + 14;
			// getting difference value that needs to add or reduce from carousel left to take middle img center
			let valDifference = firstImgWidth - positionDiff;

			if (carousel.scrollLeft > prevScrollLeft) {
				// return console.log('user is scrolling to the right');
				// if user is scrolling to the right
				return (carousel.scrollLeft +=
					positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
			}
			//   console.log('user is scrolling to the left');
			// if user is scrolling to the left
			carousel.scrollLeft -=
				positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
		};

		const dragStart = (e) => {
			// updating global variables value on mouse down event
			isDragStart = true;
			prevPageX = e.pageX || e.touches[0].pageX;
			prevScrollLeft = carousel.scrollLeft;
		};

		const dragging = (e) => {
			// scrolling images/carousel to left according to mouse pointer
			if (!isDragStart) return;
			e.preventDefault();
			isDragging = true;
			carousel.classList.add('dragging');
			positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
			carousel.scrollLeft = prevScrollLeft - positionDiff;
		};

		const dragStop = () => {
			isDragStart = false;
			carousel.classList.remove('dragging');

			if (!isDragging) return;
				isDragging = false;
				autoSlide();
		};

		carousel.addEventListener('mousedown', dragStart);
		carousel.addEventListener('touchstart', dragStart);

		carousel.addEventListener('mousemove', dragging);
		carousel.addEventListener('touchmove', dragging);

		carousel.addEventListener('mouseup', dragStop);
		carousel.addEventListener('mouseleave', dragStop);
		carousel.addEventListener('touchend', dragStop);

	}

	/**/
	const sections = document.querySelectorAll('.accordion__section');

	if (sections) {

		if (sections.length > 0) {
			sections[0].classList.add('active');
			const firstAnswer = sections[0].querySelector('.accordion__answer');
			firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
		}
	
		function collapseAllExceptActive(activeSection) {
			sections.forEach((section) => {
				if (section !== activeSection) {
					section.classList.remove('active');
					section.querySelector('.accordion__answer').style.maxHeight = null;
				}
			});
		}
	
		function toggleAccordion() {
			const answer = this.nextElementSibling;
			const isActive = this.parentNode.classList.contains('active');
		
			collapseAllExceptActive(this.parentNode);
		
			if (isActive) {
				this.parentNode.classList.remove('active');
				answer.style.maxHeight = null;
			} else {
				this.parentNode.classList.add('active');
				answer.style.maxHeight = answer.scrollHeight + 'px';
			}
		}
	
		sections.forEach((section) => {
			const question = section.querySelector('.accordion__question');
			question.addEventListener('click', toggleAccordion);
		});
	}

	
	////////////////////////////////
	// Timer
	const countdownContainer = document.getElementById("countdown-container");

	const targetDate = new Date("2023-12-31T23:59:59").getTime();

	function startCountdown() {
		const currentDate = new Date().getTime();

		const timeRemaining = targetDate - currentDate;

		const daysElement = document.getElementById("days");
		const hoursElement = document.getElementById("hours");
		const minutesElement = document.getElementById("minutes");
		const secondsElement = document.getElementById("seconds");

		let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
		let hours = Math.floor(
			(timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
		hours = String(hours).padStart(2, "0");
		minutes = String(minutes).padStart(2, "0");
		seconds = String(seconds).padStart(2, "0");

		daysElement.textContent = days;
		hoursElement.textContent = hours;
		minutesElement.textContent = minutes;
		secondsElement.textContent = seconds;

	}

	setInterval(startCountdown, 1000);

})