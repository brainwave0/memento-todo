function xbisect(value, more) {
  if (Math.log2(value) % 1 === 0) {
    if (more) {
      return value * 2;
    } else {
      return value - value / 4;
    }
  }
  let x = 1;
  while (x < value) {
    x *= 2;
  }
  let delta = x;
  while (x != value) {
    delta /= 2;
    if (x < value) {
      x += delta;
    } else if (x > value) {
      x -= delta;
    }
  }
  if (more) {
    x += delta / 2;
  } else {
    x -= delta / 2;
  }
  return x;
}
