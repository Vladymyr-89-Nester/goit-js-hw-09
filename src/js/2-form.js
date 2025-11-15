const feedbackForm = document.querySelector('.feedback-form')

let formData = {
    email: "",
    message: "",
}

const loadFeedbackForm = () => {
    const localStorageData = JSON.parse(localStorage.getItem("feedback-form-state"))

    if (localStorageData === null) return
    const localStorageKeys = Object.keys(localStorageData)

    formData = { ...formData, ...localStorageData }

    localStorageKeys.forEach(key => {
        feedbackForm.elements[key].value = localStorageData[key]
    })
}

loadFeedbackForm()

const onFeedbackForm = ({ target: formField }) => {
    const formFieldValue = formField.value
    const formFieldName = formField.name
    formData[formFieldName] = formFieldValue
    try {
        localStorage.setItem("feedback-form-state", JSON.stringify(formData))
    } catch (error) {
        console.log(error);
    }

}

const onFeedbackFormSubmit = (event) => {
    event.preventDefault()

    if (formData.email.trim() === '' || formData.message.trim() === '') {
        return alert('Fill please all fields')
    }

    event.currentTarget.reset()

    console.log(formData);

    formData = {
        email: "",
        message: "",
    };

    localStorage.removeItem("feedback-form-state")
}

feedbackForm.addEventListener('input', onFeedbackForm)
feedbackForm.addEventListener('submit', onFeedbackFormSubmit)