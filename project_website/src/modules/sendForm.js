const sendForm = ({ formId, someElem = [] }) => {
  const form = document.getElementById(formId);
  const statusBlock = document.createElement("div");
  const loadText = "    Загрузка...";
  const errorText = "Ошибка";
  const successText = "Спасибо! Наш менеджер свяжется с Вами!";

  const checkCyrillic = (input) => {
    return /^[\u0400-\u04FF\- ]*$/i.test(input);
  };

  const checkLatin = (input) => {
    return /^[a-zA-Z0-9@_.!~*' \-]*$/.test(input);
  };

  const checkPhone = (input) => {
    return /^[0-9()+\-]*$/.test(input);
  };

  const checkCyrillicSpacePunctuation = (input) => {
    return /^[\u0400-\u04FF\d\s.,!?'"()]*$/i.test(input);
  };

  const validateInput = (input) => {
    const value = input.value;
    if (input.type === "text" && !checkCyrillic(value)) {
      input.setCustomValidity(
        "Пожалуйста, используйте только кириллицу, дефис и пробел"
      );
    } else if (input.type === "email" && !checkLatin(value)) {
      input.setCustomValidity("Пожалуйста, введите корректный email адрес");
    } else if (input.type === "tel" && !checkPhone(value)) {
      input.setCustomValidity(
        "Пожалуйста, используйте только цифры, скобки и дефис"
      );
    } else if (
      input.name === "user_message" &&
      !checkCyrillicSpacePunctuation(value)
    ) {
      input.setCustomValidity(
        "Пожалуйста, используйте только кириллицу, пробелы, цифры и знаки препинания в сообщении"
      );
    } else {
      input.setCustomValidity("");
    }
  };

  form.addEventListener("input", (event) => {
    if (event.target.tagName === "INPUT") {
      validateInput(event.target);
    }
  });

  const validate = (list) => {
    let success = true;
    list.forEach((input) => {
      if (!input.checkValidity()) {
        success = false;
      }
    });
    return success;
  };

  const sendData = (data) => {
    return fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => res.json());
  };

  const submitForm = () => {
    const formElements = form.querySelectorAll("input");
    const formData = new FormData(form);
    const formBody = {};

    const spinnerBlock = document.createElement("div");
    spinnerBlock.style.width = "30px";
    spinnerBlock.style.height = "30px";
    spinnerBlock.style.border = "4px solid #ffffff";
    spinnerBlock.style.borderRadius = "50%";
    spinnerBlock.style.position = "relative";

    spinnerBlock.style.left = "50%";
    spinnerBlock.style.transform = "translateX(-50%)";

    statusBlock.innerHTML = "";
    statusBlock.appendChild(spinnerBlock);
    statusBlock.style.color = "lightblue";
    statusBlock.style.margin = "20px auto";

    formData.forEach((val, key) => {
      formBody[key] = val;
    });

    someElem.forEach((elem) => {
      const element = document.getElementById(elem.id);
      if (elem.type === "block") {
        formBody[elem.id] = element.textContent;
      } else if (elem.type === "input") {
        formBody[elem.id] = element.value;
      }
    });

    if (validate(formElements)) {
      sendData(formBody)
        .then((data) => {
          statusBlock.textContent = successText;
          formElements.forEach((input) => {
            input.value = "";
          });
          setTimeout(() => {
            statusBlock.innerHTML = "";
          }, 3000);
        })
        .catch((error) => {
          statusBlock.textContent = errorText;
          setTimeout(() => {
            statusBlock.innerHTML = "";
          }, 3000);
        });
    } else {
      alert("Данные не валидны");
      setTimeout(() => {
        statusBlock.innerHTML = "";
      }, 3000);
    }
  };

  try {
    if (!form) {
      throw new Error("Верните форму на место, пожалуйста");
    }
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      submitForm();
    });
  } catch (error) {
    console.log(error.message);
  }

  form.appendChild(statusBlock);
};

export default sendForm;