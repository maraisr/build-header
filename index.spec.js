import test from 'ava';
import buildHeader from './index';

test('should not throw', t => {
	t.notThrows(buildHeader);
});

test('should match the snapshot', t => {
	t.snapshot(buildHeader());
});

test('should accept a env argument', t => {
	t.snapshot(buildHeader('production'));
});
