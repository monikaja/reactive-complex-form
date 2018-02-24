# reactive-complex-form
Reactive complex forms with validations in an Ionic App with Angular 5 

This reactive form is an example with input form validations depending on other input form value.
The identity document values are Spanish document types and the format validation is from https://gist.github.com/afgomez/5691823
Thank you @afgomez for share.

## Form validations 

If the identity document type is a "NIF".
- Surname 2 is required.
- Document number should be valid.

If the identity document type is a "NIE".
- Document number should be valid.

If the identity document type is a "Passport".
- Show warning message.

Birth date should be valid if person is over 18 years old.


