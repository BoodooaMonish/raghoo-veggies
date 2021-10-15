const patterns = {
    firstName: /^([A-Za-zÀ-ÿ\'\-] ?)+$/,
    lastName: /^([A-Za-zÀ-ÿ\'\-] ?)+$/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    telephone: /^[0-9]{8}$/,
    address: /^([A-Za-zÀ-ÿ0-9\'\-\/&#] ?)+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    subject: /^([A-Za-zÀ-ÿ0-9\'\-\/&#] ?)+$/,
    msgContent: /^([A-Za-zÀ-ÿ0-9\'\-\/&#] ?)+$/,
};
const min_length = {
    min_firstName: 3,
    min_lastName: 3,
    min_email: null,
    min_telephone: null,
    min_address: null,
    min_password: null,
    min_subject: null,
    min_msgContent: null,
};
const max_length = {
    max_firstName: 25,
    max_lastName: 25,
    max_email: 254,
    max_telephone: null,
    max_address: 50,
    max_password: 64,
    max_subject: 50,
    max_msgContent: 254,
};
const messages = {
    empty: "Error! This field should not be empty.",
    firstName: "Error! Only alphabetical letters and a space between names allowed.",
    max_firstName: `The first name should be limited to ${max_length["max_firstName"]}.`,
    min_firstName: `The first name should be larger than ${min_length["min_firstName"]}.`,
    lastName: "Error! Only alphabetical letters and a space between names allowed.",
    max_lastName: `The last name should be limited to ${max_length["max_lastName"]}.`,
    min_lastName: `The last name should be larger than ${min_length["min_lastName"]}.`,
    email: "Error! The email is invalid",
    max_email: `The email should be limited to ${max_length["max_email"]}`,
    telephone: "Error! Only 8 digits allowed.",
    // address: "Error! Only words, digits, #, ', -, &, / and space separation allowed.",
    // max_address: `The address should be limited to ${max_length["max_address"]}.`,
    password: "Error! Minimum 8 characters long and  at least 1 digit, 1 alphabet and 1 special character allowed.",
    confirmPassword: "The password confirmation does not match the entered password.",
    max_password: `The password should be limited to ${max_length["max_password"]}.`,
    subject: "Error! Only words, digits, #, ', -, &, / and space separation allowed.",
    max_subject: `The subject should be limited to ${max_length["max_subject"]}.`,
    msgContent: "Error! Only words, digits, #, ', -, &, / and space separation allowed.",
    max_msgContent: `The content of the message should be limited to ${max_length["max_msgContent"]}.`,
};

export { patterns, min_length, max_length, messages };

/*

Minimum eight characters, at least one letter and one number:

"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"



Minimum eight characters, at least one letter, one number and one special character:

"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"



Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:

"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"



Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:

"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"



Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:

"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"


 */
