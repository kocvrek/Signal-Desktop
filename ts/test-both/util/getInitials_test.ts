// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { assert } from 'chai';

import { getInitials } from '../../util/getInitials';

describe('getInitials', () => {
  it('returns undefined when passed undefined', () => {
    assert.isUndefined(getInitials(undefined));
  });

  it('returns undefined when passed an empty string', () => {
    assert.isUndefined(getInitials(''));
  });

  it('returns undefined when passed a string with no letters', () => {
    assert.isUndefined(getInitials('123 !@#$%'));
  });

  it('returns the first letter of a name that is one ASCII word', () => {
    assert.strictEqual(getInitials('Foo'), 'F');
  });

  [
    'Foo Bar',
    'foo bar',
    'F Bar',
    'Foo B',
    'FB',
    'F.B.',
    '0Foo 1Bar',
    "Foo B'Ar",
    'Foo Q Bar',
    'Foo Q. Bar',
    'Foo Qux Bar',
    'Foo "Qux" Bar',
    'Foo-Qux Bar',
    'Foo Bar-Qux',
    "Foo b'Arr",
  ].forEach(name => {
    it(`returns 'FB' for '${name}'`, () => {
      assert.strictEqual(getInitials(name), 'FB');
    });
  });

  [
    ['山田 太郎', '山太'],
    ['王五', '王五'],
    ['Иван Иванов', 'ИИ'],
  ].forEach(([name, initials]) => {
    it('returns initials for languages with non-Latin alphabets', () => {
      assert.strictEqual(getInitials(name), initials);
    });
  });

  [
    ['فلانة الفلانية', 'فا'],
    ['ישראלה ישראלי', 'יי'],
  ].forEach(([name, initials]) => {
    it('returns initials for right-to-left languages', () => {
      assert.strictEqual(getInitials(name), initials);
    });
  });

  it('returns initials with diacritical marks', () => {
    assert.strictEqual(getInitials('Ḟoo Ḅar'), 'ḞḄ');
  });
});
