const sendEmail = () => {
  const form = document.querySelector<HTMLFormElement>("#contact-form");
  const loading = document.querySelector<HTMLElement>("#loading-contact");
  const message = document.querySelector<HTMLElement>("#message-contact");
  const h3 = document.querySelector<HTMLElement>("#message-contact h3");
  const p = document.querySelector<HTMLElement>("#message-contact p");
  const iconSuccess = document.querySelector<HTMLElement>(
    "#message-contact span.success"
  );
  const iconError = document.querySelector<HTMLElement>(
    "#message-contact span.error"
  );
  const button = document.querySelector<HTMLElement>("#message-contact button");
  let loader = false;

  grecaptcha.ready(() => {
    grecaptcha.render("g-recaptcha-response", {
      sitekey: "6Lec7KQeAAAAAPBly8bj-KRvrqQnLJFInn89uN4A",
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (loader) return;
      loader = true;

      loading.classList.add("active");
      grecaptcha
        .execute("6Lec7KQeAAAAAPBly8bj-KRvrqQnLJFInn89uN4A", {
          action: "submit",
        })
        .then(function (token: string) {
          let formData = new FormData(form);
          const data: any = {};

          formData.forEach((value, key) => {
            data[key] = value;
          });

          data["g-recaptcha-response"] = token;

          fetch("https://send-email-taquion009.herokuapp.com/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((response) => {
              loader = false;
              grecaptcha.reset();
              if (response.ok) {
                success();
              } else {
                error();
              }
            })
            .catch((error) => {
              grecaptcha.reset();
              error();
              loader = false;
            });
        });
    });
  });

  const success = () => {
    loading.classList.remove("active");
    message.classList.add("active");
    iconSuccess.classList.add("active");
    iconError.classList.remove("active");
    h3.innerHTML = "¡Gracias!";
    p.innerHTML = "Tu mensaje ha sido enviado.";
  };

  const error = () => {
    loading.classList.remove("active");
    message.classList.add("active");
    iconError.classList.add("active");
    iconSuccess.classList.remove("active");
    h3.innerHTML = "¡Ups!";
    p.innerHTML = "Algo salió mal, por favor intenta de nuevo más tarde.";
  };
  const closeMessage = () => {
    message.classList.remove("active");
    iconSuccess.classList.remove("active");
    iconError.classList.remove("active");
  };

  message.addEventListener("click", (e) => {
    if (e.target === message) {
      closeMessage();
    }
  });

  button.addEventListener("click", (e) => {
    e.preventDefault();
    closeMessage();
  });
};

export default sendEmail;
