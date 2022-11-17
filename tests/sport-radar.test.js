const sportRadar = require ('../sport-radar.cjs');

test('start', async () => {
  const input = await sportRadar.start('Sweden', 'USA');
  expect(input).toBe('Sweden - USA game added to the summary')
})

test('summary', async () => {
  const listado = await sportRadar.summary();
  expect(listado).toBeGreaterThanOrEqual(1)
})