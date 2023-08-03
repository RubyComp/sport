document.addEventListener('DOMContentLoaded', function () {

	// Number:

	const numberInputs = document.querySelectorAll('.number__input')

	function decreaseValue(event) {
		const input = event.target.nextElementSibling
		const currentValue = parseInt(input.value, 10)
		if (currentValue > input.min) {
			input.value = currentValue - 1
		}
	}

	function increaseValue(event) {
		const input = event.target.previousElementSibling
		const currentValue = parseInt(input.value, 10)
		input.value = currentValue + 1
	}

	numberInputs.forEach(function(inputBlock) {
		const decreaseButton = inputBlock.querySelector('.decrease-numb')
		const increaseButton = inputBlock.querySelector('.increase-numb')

		decreaseButton.addEventListener('click', decreaseValue)
		increaseButton.addEventListener('click', increaseValue)
	})

	// Select:

	const SELECT  = '.text-select'
	const FIELD   = '.text-select__field'
	const OPTIONS = '.text-select__options'
	const OPTION  = '.option'

	const SHOW = 'show'

	const selectTriggers = document.querySelectorAll(FIELD)

	const getHeight = value => value + 'px'

	const toggleOptions = (show, initialHeight, item) => {

		const list = item.closest(SELECT).querySelector(OPTIONS)
		let newHeight

		const { classList } = list

		if (show) {
			classList.remove(SHOW)
			newHeight = 0
		} else {
			classList.add(SHOW)
			newHeight = initialHeight
		}

		list.style.maxHeight = getHeight(newHeight)
	}

	selectTriggers.forEach((field) => {

		const optionsList = field.closest(SELECT).querySelector(OPTIONS)
		const optionsHeight = optionsList.offsetHeight

		optionsList.style.maxHeight = getHeight(optionsHeight)

		let show = false
	
		field.addEventListener('click', function (event) {
			show = !show
			toggleOptions(show, optionsHeight, this)
			event.stopPropagation()
		})

		const options = field.closest(SELECT).querySelector(OPTIONS)

		options.addEventListener('click', function (event) {
			show = !show
			const option = event.target.closest(OPTION)
			if (option) {
				const value = option.dataset.value
				const input = this.closest(SELECT).querySelector(FIELD)
				input.value = value
				toggleOptions(show, optionsHeight, this)
			}
		})
	})

})