import {it,expect} from 'vitest';
import {money} from './shared';
it('shows kopecks exactly when a discount produces a fractional ruble',()=>{
 expect(money(36750).replace(/[^0-9,]/g,'')).toBe('367,50');
 expect(money(390000).replace(/[^0-9,]/g,'')).toBe('3900');
});
