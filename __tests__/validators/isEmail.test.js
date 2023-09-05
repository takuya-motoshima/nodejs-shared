const {validators: {isEmail}} = require('../../dist/build.common');

describe('Valid email addresses should be true', () => {
  test.each([
    ['foo@bar.com', {}, true],
    ['x@x.au', {}, true],
    ['foo@bar.com.au', {}, true],
    ['foo+bar@bar.com', {}, true],
    ['hans.m端ller@test.com', {}, true],
    ['hans@m端ller.com', {}, true],
    ['test|123@m端ller.com', {}, true],
    ['test123+ext@gmail.com', {}, true],
    ['some.name.midd.leNa.me.and.locality+extension@GoogleMail.com', {}, true],
    ['"foobar"@example.com', {}, true],
    ['"  foo  m端ller "@example.com', {}, true],
    ['"foo\\@bar"@example.com', {}, true],
    [`${'a'.repeat(64)}@${'a'.repeat(63)}.com`, {}, true],
    [`${'a'.repeat(64)}@${'a'.repeat(63)}.com`, {}, true],
    [`${'a'.repeat(31)}@gmail.com`, {}, true],
    ['test@gmail.com', {}, true],
    ['test.1@gmail.com', {}, true],
    ['test@1337.com', {}, true],
  ])('isEmail("%s", %s) = %s', (a, b, expected) => {
    expect(isEmail(a, b)).toBe(expected);
  });
});

describe('Invalid email addresses should be false', () => {
  test.each([
    ['invalidemail@', {}, false],
    ['invalid.com', {}, false],
    ['@invalid.com', {}, false],
    ['foo@bar.com.', {}, false],
    ['foo@_bar.com', {}, false],
    ['somename@ｇｍａｉｌ.com', {}, false],
    ['foo@bar.co.uk.', {}, false],
    ['z@co.c', {}, false],
    ['test1@invalid.co m', {}, false],
    ['test2@invalid.co m', {}, false],
    ['test3@invalid.co m', {}, false],
    ['test4@invalid.co m', {}, false],
    ['test5@invalid.co m', {}, false],
    ['test6@invalid.co m', {}, false],
    ['test7@invalid.co m', {}, false],
    ['test8@invalid.co m', {}, false],
    ['test9@invalid.co m', {}, false],
    ['test10@invalid.co m', {}, false],
    ['test11@invalid.co m', {}, false],
    ['test12@invalid.co　m', {}, false],
    ['test13@invalid.co　m', {}, false],
    ['multiple..dots@stillinvalid.com', {}, false],
    ['test123+invalid! sub_address@gmail.com', {}, false],
    ['gmail...ignores...dots...@gmail.com', {}, false],
    ['ends.with.dot.@gmail.com', {}, false],
    ['multiple..dots@gmail.com', {}, false],
    ['wrong()[]",:;<>@@gmail.com', {}, false],
    ['"wrong()[]",:;<>@@gmail.com', {}, false],
    ['username@domain.com�', {}, false],
    ['username@domain.com©', {}, false],
    ['nbsp test@test.com', {}, false],
    ['nbsp_test@te st.com', {}, false],
    ['nbsp_test@test.co m', {}, false],
  ])('isEmail("%s", %s) = %s', (a, b, expected) => {
    expect(isEmail(a, b)).toBe(expected);
  });
});

describe('Valid email addresses should be true (Use allowUtf8LocalPart option = false)', () => {
  test.each([
    ['foo@bar.com', {allowUtf8LocalPart: false}, true],
    ['x@x.au', {allowUtf8LocalPart: false}, true],
    ['foo@bar.com.au', {allowUtf8LocalPart: false}, true],
    ['foo+bar@bar.com', {allowUtf8LocalPart: false}, true],
    ['hans@m端ller.com', {allowUtf8LocalPart: false}, true],
    ['test|123@m端ller.com', {allowUtf8LocalPart: false}, true],
    ['test123+ext@gmail.com', {allowUtf8LocalPart: false}, true],
    ['some.name.midd.leNa.me+extension@GoogleMail.com', {allowUtf8LocalPart: false}, true],
    ['"foobar"@example.com', {allowUtf8LocalPart: false}, true],
    ['"foo\\@bar"@example.com', {allowUtf8LocalPart: false}, true],
    ['"  foo  bar  "@example.com', {allowUtf8LocalPart: false}, true],
  ])('isEmail("%s", %s) = %s', (a, b, expected) => {
    expect(isEmail(a, b)).toBe(expected);
  });
});

describe('Invalid email addresses should be false (Use allowUtf8LocalPart option = false)', () => {
  test.each([
    ['invalidemail@', {allowUtf8LocalPart: false}, false],
    ['invalid.com', {allowUtf8LocalPart: false}, false],
    ['@invalid.com', {allowUtf8LocalPart: false}, false],
    ['foo@bar.com.', {allowUtf8LocalPart: false}, false],
    ['foo@bar.co.uk.', {allowUtf8LocalPart: false}, false],
    ['somename@ｇｍａｉｌ.com', {allowUtf8LocalPart: false}, false],
    ['hans.m端ller@test.com', {allowUtf8LocalPart: false}, false],
    ['z@co.c', {allowUtf8LocalPart: false}, false],
    ['tüst@invalid.com', {allowUtf8LocalPart: false}, false],
    ['nbsp test@test.com', {allowUtf8LocalPart: false}, false],
  ])('isEmail("%s", %s) = %s', (a, b, expected) => {
    expect(isEmail(a, b)).toBe(expected);
  });
});

describe('Valid email addresses should be true (Use allowDisplayName option = true)', () => {
  test.each([
    ['foo@bar.com', {allowDisplayName: true}, true],
    ['x@x.au', {allowDisplayName: true}, true],
    ['foo@bar.com.au', {allowDisplayName: true}, true],
    ['foo+bar@bar.com', {allowDisplayName: true}, true],
    ['hans.m端ller@test.com', {allowDisplayName: true}, true],
    ['hans@m端ller.com', {allowDisplayName: true}, true],
    ['test|123@m端ller.com', {allowDisplayName: true}, true],
    ['test123+ext@gmail.com', {allowDisplayName: true}, true],
    ['some.name.midd.leNa.me+extension@GoogleMail.com', {allowDisplayName: true}, true],
    ['Some Name <foo@bar.com>', {allowDisplayName: true}, true],
    ['Some Name <x@x.au>', {allowDisplayName: true}, true],
    ['Some Name <foo@bar.com.au>', {allowDisplayName: true}, true],
    ['Some Name <foo+bar@bar.com>', {allowDisplayName: true}, true],
    ['Some Name <hans.m端ller@test.com>', {allowDisplayName: true}, true],
    ['Some Name <hans@m端ller.com>', {allowDisplayName: true}, true],
    ['Some Name <test|123@m端ller.com>', {allowDisplayName: true}, true],
    ['Some Name <test123+ext@gmail.com>', {allowDisplayName: true}, true],
    ['\'Foo Bar, Esq\'<foo@bar.com>', {allowDisplayName: true}, true],
    ['Some Name <some.name.midd.leNa.me+extension@GoogleMail.com>', {allowDisplayName: true}, true],
    ['Some Middle Name <some.name.midd.leNa.me+extension@GoogleMail.com>', {allowDisplayName: true}, true],
    ['Name <some.name.midd.leNa.me+extension@GoogleMail.com>', {allowDisplayName: true}, true],
    ['Name<some.name.midd.leNa.me+extension@GoogleMail.com>', {allowDisplayName: true}, true],
    ['Some Name <foo@gmail.com>', {allowDisplayName: true}, true],
    ['Name🍓With🍑Emoji🚴‍♀️🏆<test@aftership.com>', {allowDisplayName: true}, true],
    ['🍇🍗🍑<only_emoji@aftership.com>', {allowDisplayName: true}, true],
    ['"<displayNameInBrackets>"<jh@gmail.com>', {allowDisplayName: true}, true],
    ['"\\"quotes\\""<jh@gmail.com>', {allowDisplayName: true}, true],
    ['"name;"<jh@gmail.com>', {allowDisplayName: true}, true],
    ['"name;" <jh@gmail.com>', {allowDisplayName: true}, true],
  ])('isEmail("%s", %s) = %s', (a, b, expected) => {
    expect(isEmail(a, b)).toBe(expected);
  });
});

describe('Invalid email addresses should be false (Use allowDisplayName option = true)', () => {
  test.each([
    ['invalidemail@', {allowDisplayName: true}, false],
    ['invalid.com', {allowDisplayName: true}, false],
    ['@invalid.com', {allowDisplayName: true}, false],
    ['foo@bar.com.', {allowDisplayName: true}, false],
    ['foo@bar.co.uk.', {allowDisplayName: true}, false],
    ['Some Name <invalidemail@>', {allowDisplayName: true}, false],
    ['Some Name <invalid.com>', {allowDisplayName: true}, false],
    ['Some Name <@invalid.com>', {allowDisplayName: true}, false],
    ['Some Name <foo@bar.com.>', {allowDisplayName: true}, false],
    ['Some Name <foo@bar.co.uk.>', {allowDisplayName: true}, false],
    ['Some Name foo@bar.co.uk.>', {allowDisplayName: true}, false],
    ['Some Name <foo@bar.co.uk.', {allowDisplayName: true}, false],
    ['Some Name < foo@bar.co.uk >', {allowDisplayName: true}, false],
    ['Name foo@bar.co.uk', {allowDisplayName: true}, false],
    ['Some Name <some..name@gmail.com>', {allowDisplayName: true}, false],
    ['Some Name<emoji_in_address🍈@aftership.com>', {allowDisplayName: true}, false],
    ['invisibleCharacter\u001F<jh@gmail.com>', {allowDisplayName: true}, false],
    ['<displayNameInBrackets><jh@gmail.com>', {allowDisplayName: true}, false],
    ['\\"quotes\\"<jh@gmail.com>', {allowDisplayName: true}, false],
    ['""quotes""<jh@gmail.com>', {allowDisplayName: true}, false],
    ['name;<jh@gmail.com>', {allowDisplayName: true}, false],
    ['    <jh@gmail.com>', {allowDisplayName: true}, false],
    ['"    "<jh@gmail.com>', {allowDisplayName: true}, false],
  ])('isEmail("%s", %s) = %s', (a, b, expected) => {
    expect(isEmail(a, b)).toBe(expected);
  });
});

describe('Valid email addresses should be true (Use requireDisplayName option = true)', () => {
  test.each([
    ['Some Name <foo@bar.com>', {requireDisplayName: true}, true],
    ['Some Name <x@x.au>', {requireDisplayName: true}, true],
    ['Some Name <foo@bar.com.au>', {requireDisplayName: true}, true],
    ['Some Name <foo+bar@bar.com>', {requireDisplayName: true}, true],
    ['Some Name <hans.m端ller@test.com>', {requireDisplayName: true}, true],
    ['Some Name <hans@m端ller.com>', {requireDisplayName: true}, true],
    ['Some Name <test|123@m端ller.com>', {requireDisplayName: true}, true],
    ['Some Name <test123+ext@gmail.com>', {requireDisplayName: true}, true],
    ['Some Name <some.name.midd.leNa.me+extension@GoogleMail.com>', {requireDisplayName: true}, true],
    ['Some Middle Name <some.name.midd.leNa.me+extension@GoogleMail.com>', {requireDisplayName: true}, true],
    ['Name <some.name.midd.leNa.me+extension@GoogleMail.com>', {requireDisplayName: true}, true],
    ['Name<some.name.midd.leNa.me+extension@GoogleMail.com>', {requireDisplayName: true}, true],
  ])('isEmail("%s", %s) = %s', (a, b, expected) => {
    expect(isEmail(a, b)).toBe(expected);
  });
});

describe('Invalid email addresses should be false (Use requireDisplayName option = true)', () => {
  test.each([
    ['some.name.midd.leNa.me+extension@GoogleMail.com', {requireDisplayName: true}, false],
    ['foo@bar.com', {requireDisplayName: true}, false],
    ['x@x.au', {requireDisplayName: true}, false],
    ['foo@bar.com.au', {requireDisplayName: true}, false],
    ['foo+bar@bar.com', {requireDisplayName: true}, false],
    ['hans.m端ller@test.com', {requireDisplayName: true}, false],
    ['hans@m端ller.com', {requireDisplayName: true}, false],
    ['test|123@m端ller.com', {requireDisplayName: true}, false],
    ['test123+ext@gmail.com', {requireDisplayName: true}, false],
    ['invalidemail@', {requireDisplayName: true}, false],
    ['invalid.com', {requireDisplayName: true}, false],
    ['@invalid.com', {requireDisplayName: true}, false],
    ['foo@bar.com.', {requireDisplayName: true}, false],
    ['foo@bar.co.uk.', {requireDisplayName: true}, false],
    ['Some Name <invalidemail@>', {requireDisplayName: true}, false],
    ['Some Name <invalid.com>', {requireDisplayName: true}, false],
    ['Some Name <@invalid.com>', {requireDisplayName: true}, false],
    ['Some Name <foo@bar.com.>', {requireDisplayName: true}, false],
    ['Some Name <foo@bar.co.uk.>', {requireDisplayName: true}, false],
    ['Some Name foo@bar.co.uk.>', {requireDisplayName: true}, false],
    ['Some Name <foo@bar.co.uk.', {requireDisplayName: true}, false],
    ['Some Name < foo@bar.co.uk >', {requireDisplayName: true}, false],
    ['Name foo@bar.co.uk', {requireDisplayName: true}, false],
  ])('isEmail("%s", %s) = %s', (a, b, expected) => {
    expect(isEmail(a, b)).toBe(expected);
  });
});

describe('Valid email addresses should be true (Use hostBlacklist option)', () => {
  test.each([
    ['email@foo.gmail.com', {hostBlacklist: ['gmail.com', 'foo.bar.com']}, true],
  ])('isEmail("%s", %s) = %s', (a, b, expected) => {
    expect(isEmail(a, b)).toBe(expected);
  });
});

describe('Invalid email addresses should be false (Use hostBlacklist option)', () => {
  test.each([
    ['foo+bar@gmail.com', {hostBlacklist: ['gmail.com', 'foo.bar.com']}, false],
    ['email@foo.bar.com', {hostBlacklist: ['gmail.com', 'foo.bar.com']}, false],
  ])('isEmail("%s", %s) = %s', (a, b, expected) => {
    expect(isEmail(a, b)).toBe(expected);
  });
});

describe('Valid email addresses should be true (Use hostWhitelist option)', () => {
  test.each([
    ['email@gmail.com', {hostWhitelist: ['gmail.com', 'foo.bar.com']}, true],
    ['test@foo.bar.com', {hostWhitelist: ['gmail.com', 'foo.bar.com']}, true],
  ])('isEmail("%s", %s) = %s', (a, b, expected) => {
    expect(isEmail(a, b)).toBe(expected);
  });
});

describe('Invalid email addresses should be false (Use hostWhitelist option)', () => {
  test.each([
    ['foo+bar@test.com', {hostWhitelist: ['gmail.com', 'foo.bar.com']}, false],
    ['email@foo.com', {hostWhitelist: ['gmail.com', 'foo.bar.com']}, false],
    ['email@bar.com', {hostWhitelist: ['gmail.com', 'foo.bar.com']}, false],
  ])('isEmail("%s", %s) = %s', (a, b, expected) => {
    expect(isEmail(a, b)).toBe(expected);
  });
});