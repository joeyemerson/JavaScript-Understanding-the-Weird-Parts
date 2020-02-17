((global, $) => {
  const supportedLangs = ['en', 'es'];

  const greetings = {
    en: 'Hello',
    es: 'Hola'
  };

  const formalGreetings = {
    en: 'Greetings',
    es: 'Sauldos'
  };

  const logMessages = {
    en: 'Logged in',
    es: 'Inicio sesion'
  };

  class Greetr {
    constructor(firstName, lastName, language) {
      this.firstName = firstName || 'Default';
      this.lastName = lastName || 'Default';
      this.language = language || 'en';
    }

    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }

    validate() {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw 'Invalid language';
      }
    }

    greeting() {
      return `${greetings[this.language]} ${this.firstName}!`;
    }

    formalGreeting() {
      return `${formalGreetings[this.language]} ${this.fullName()}.`;
    }

    greet(formal) {
      let msg;

      // if undefined or null it will be coerced to false
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      // 'this' refers to the calling object at execution time
      // makes the method chainable
      return this;
    }

    log() {
      if (console) {
        console.log(`${logMessages[this.language]}: ${this.fullName()}`);
      }

      return this;
    }

    setLang(lang) {
      this.language = lang;
      this.validate();

      return this;
    }

    HTMLGreeting(selector, formal) {
      if (!$) {
        throw 'jQuery not loaded';
      }

      if (!selector) {
        throw 'Missing jQuery selector';
      }

      let msg;
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      $(selector).html(msg);

      return this;
    }
  }

  const _old = Greetr;
  Greetr = (...args) => {
    return new _old(...args);
  };

  global.Greetr = global.G$ = Greetr;
})(window, jQuery);
