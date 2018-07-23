
'use strict'

/**
 * Form validations function
 * @param formId
 * @param validationConstraints
 */

function initValidations (formId, validationConstraints) {
  // Getting form element by ID
  var form = document.getElementById(formId)

  // Attaching a listener for submitting form
  form.addEventListener('submit', function (ev) {
    var errors = validate(form, validationConstraints)
    // then we update the form to reflect the results

    // If errors then prevent form for submission and show errors
    if (errors) {
      ev.preventDefault()
      showErrors(form, errors || {})
    }
  })

  // Hook up the inputs to validate on the fly
  var inputs = document.querySelectorAll('input')
  for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener('change', function (ev) {
      var errors = validate(form, validationConstraints) || {}
      showErrorsForInput(this, errors[this.name])
    })
  }

  // Updates the inputs with the validation errors
  function showErrors (form, errors) {
    // We loop through all the inputs and show the errors for that input
    form.querySelectorAll('input[name]').forEach(function (input) {
      // Since the errors can be null if no errors were found we need to handle
      // that
      showErrorsForInput(input, errors && errors[input.name])
    })
  }

  // Shows the errors for a specific input
  function showErrorsForInput (input, errors) {
    // This is the root of the input
    var formGroup = closestParent(input.parentNode, 'form-group')

    // Find where the error messages will be insert into

    var messages = formGroup.querySelector('.messages')
    // First we remove any old messages and resets the classes
    resetFormGroup(formGroup)
    // If we have errors
    if (errors) {
      // we first mark the group has having errors
      formGroup.classList.add('has-error')
      // then we append all the errors
      errors.forEach(function (error) {
        addError(messages, error)
      })
    } else {
      // otherwise we simply mark it as success
      formGroup.classList.add('has-success')
    }
  }

  // Recusively finds the closest parent that has the specified class
  function closestParent (child, className) {
    if (!child || child == document) {
      return null
    }
    if (child.classList.contains(className)) {
      return child
    } else {
      return closestParent(child.parentNode, className)
    }
  }

  function resetFormGroup (formGroup) {
    // Remove the success and error classes
    formGroup.classList.remove('has-error')
    formGroup.classList.remove('has-success')
    // and remove any old messages
    formGroup.querySelectorAll('.help-block.error').forEach(function (el) {
      el.parentNode.removeChild(el)
    })
  }

  // Adds the specified error with the following markup
  // <p class="help-block error">[message]</p>
  function addError (messages, error) {
    var block = document.createElement('p')
    block.classList.add('help-block')
    block.classList.add('error')
    block.innerText = error
    messages.appendChild(block)
  }
}
