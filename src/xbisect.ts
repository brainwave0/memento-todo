function xbisect(value, more) {
  let x = 1;
  while (x < value) {
    x *= 2;
  }
  let delta = x;
  if (x == value) {
    if (more) {
      x += delta / 4;
    } else {
      x -= delta / 4;
    }
    return x;
  }
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
