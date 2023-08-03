document.addEventListener('DOMContentLoaded', function () {

	// Pricer
	const form = document.getElementById("constructor")
	const singlePriceElement = document.getElementById("single-price")
	const totalPriceElement = document.getElementById("total-price")
	const countElement = document.getElementById("count")

	const validPrice = (value) => {
		if (isNaN(value) || !(value > 0) )
			return 'Уточнить у менеджера'
		else
			return value
	}

	// Функция для обновления цен
	function updatePrices() {
		let singlePrice = 0
		let totalPrice = 0

		// Проходимся по всем элементам формы, чтобы найти выбранные опции
		const selectedOptions = form.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked, #base-cost, .text-select__field')

		selectedOptions.forEach((option) => {
			// Считываем значение из атрибута "data-cost" и прибавляем его к ценам
			const cost = parseInt(option.dataset.cost)
			singlePrice += cost
			totalPrice += cost
		})

		// Умножаем общую цену на количество копий
		const count = parseInt(countElement.value)
		console.log('count', count)
		totalPrice = singlePrice * count


		// Обновляем значения в элементах
		singlePriceElement.textContent = validPrice(singlePrice)
		totalPriceElement.textContent = validPrice(totalPrice)
	}
	updatePrices()

	// Обработчики событий для обновления цен при изменении формы
	form.addEventListener("change", updatePrices)
	countElement.addEventListener("change", updatePrices)

	////////////////////////////////
	// Number:

	const numberInputs = document.querySelectorAll('.number__input')

	function decreasecost(event) {
		const input = event.target.nextElementSibling
		const currentcost = parseInt(input.value, 10)
		if (currentcost > input.min) {
			input.value = currentcost - 1
		}
		updatePrices()
	}

	function increasecost(event) {
		console.log(1)
		const input = event.target.previousElementSibling
		const currentcost = parseInt(input.value, 10)
		input.value = currentcost + 1
		updatePrices()
	}

	numberInputs.forEach(function(inputBlock) {
		const decreaseButton = inputBlock.querySelector('.decrease-numb')
		const increaseButton = inputBlock.querySelector('.increase-numb')

		decreaseButton.addEventListener('click', decreasecost)
		increaseButton.addEventListener('click', increasecost)
	})

	////////////////////////////////
	// Select:

	const SELECT  = '.text-select'
	const FIELD   = '.text-select__field'
	const OPTIONS = '.text-select__options'
	const OPTION  = '.option'

	const SHOW = 'show'

	const selectTriggers = document.querySelectorAll(FIELD)

	const getHeight = cost => cost + 'px'

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
				input.dataset.cost = option.dataset.cost
				toggleOptions(show, optionsHeight, this)
			}
			updatePrices()
		})
	})

	////////////////////////////////
	// File drop

	const fileDropBox = document.getElementById('file-drop__box');
	const fileMsg = fileDropBox.querySelector('.file-drop__msg');
	const fileInput = fileDropBox.querySelector('.file-drop__input');

	// Обработчик события "dragover" предотвращает стандартное поведение браузера для перетаскивания файлов
	fileDropBox.addEventListener('dragover', (event) => {
		event.preventDefault();
		fileDropBox.classList.add('file-drop__box--highlight');
		fileMsg.textContent = 'Отпустите файлы для загрузки…';
	});
 
	// Обработчик события "dragleave" снимает выделение блока при выходе курсора за его пределы
	fileDropBox.addEventListener('dragleave', () => {
		fileDropBox.classList.remove('file-drop__box--highlight');
		fileMsg.textContent = 'Перетащите файлы сюда, чтобы загрузить…';
	});
 
	// Обработчик события "drop" запускается при отпускании файлов внутри блока
	fileDropBox.addEventListener('drop', (event) => {
		event.preventDefault();
		fileDropBox.classList.remove('file-drop__box--highlight');
		const files = event.dataTransfer.files;
		fileMsg.textContent = `Выбрано файлов: ${files.length}`;
		fileInput.files = files;
	});

	// Обработчик события "change" запускается при выборе файлов через стандартный input[type="file"]
	fileInput.addEventListener('change', () => {
		const files = fileInput.files;
		fileMsg.textContent = `Выбрано файлов: ${files.length}`;
	});

})